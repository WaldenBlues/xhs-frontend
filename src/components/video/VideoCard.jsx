import React, { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Music, Play } from 'lucide-react';

const VideoCard = ({ video }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play().catch(err => {
              console.error('Error playing video:', err);
              setError(err.message);
            });
            setIsPlaying(true);
          } else {
            videoRef.current?.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(err => {
          console.error('Error playing video:', err);
          setError(err.message);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoLoad = () => {
    console.log('Video loaded successfully');
    setIsLoading(false);
    setError(null);
  };

  const handleVideoError = (e) => {
    console.error('Video error:', e);
    setIsLoading(false);
    setError('视频加载失败，请重试');
  };

  const handleRetry = () => {
    setIsLoading(true);
    setError(null);
    if (videoRef.current) {
      videoRef.current.load();
    }
  };

  return (
    <div className="relative h-screen w-full bg-black">
      {/* 视频播放器 */}
      <div className="relative h-full w-full">
        <video
          ref={videoRef}
          src={video.videoUrl}
          className="h-full w-full object-cover"
          loop
          playsInline
          muted
          onClick={handleVideoClick}
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
        />
        
        {/* 加载状态 */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* 错误状态 */}
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white">
            <p className="mb-4">{error}</p>
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors"
            >
              重试
            </button>
          </div>
        )}

        {/* 播放按钮 */}
        {!isPlaying && !isLoading && !error && (
          <button
            onClick={handleVideoClick}
            className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
          >
            <Play className="w-16 h-16 text-white" />
          </button>
        )}
      </div>

      {/* 右侧交互按钮 */}
      <div className="absolute right-4 bottom-40 flex flex-col items-center space-y-6">
        <button 
          className="flex flex-col items-center text-white"
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart className={`w-8 h-8 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
          <span className="text-sm mt-1">{video.likes}</span>
        </button>
        <button className="flex flex-col items-center text-white">
          <MessageCircle className="w-8 h-8" />
          <span className="text-sm mt-1">{video.comments}</span>
        </button>
        <button className="flex flex-col items-center text-white">
          <Share2 className="w-8 h-8" />
          <span className="text-sm mt-1">分享</span>
        </button>
      </div>

      {/* 底部信息 */}
      <div className="absolute left-4 bottom-20 right-20 text-white">
        <div className="flex items-center mb-2">
          <img 
            src={video.user.avatar} 
            alt={video.user.name}
            className="w-10 h-10 rounded-full border-2 border-white mr-2"
          />
          <span className="font-medium">{video.user.name}</span>
        </div>
        <p className="text-sm mb-2">{video.description}</p>
        <div className="flex items-center text-sm">
          <Music className="w-4 h-4 mr-1" />
          <span>{video.music}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard; 