import React, { useState, useEffect } from 'react';
import { Menu, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import VideoCard from '../components/video/VideoCard';
import SideMenu from '../components/layout/SideMenu';

const HotPage = () => {
  const [videos, setVideos] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 模拟获取视频数据
    setVideos([
      {
        id: 1,
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        description: '超治愈的春日野餐vlog #春日野餐 #vlog',
        likes: '12.5w',
        comments: '2345',
        user: {
          name: '春日野餐达人',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
        },
        music: '春日野餐 - 原创音乐'
      },
      {
        id: 2,
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        description: '超实用的收纳技巧分享 #收纳 #生活技巧',
        likes: '8.9w',
        comments: '1234',
        user: {
          name: '收纳达人',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
        },
        music: '收纳之歌 - 原创音乐'
      },
      {
        id: 3,
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        description: '超好吃的甜品制作教程 #甜品 #美食',
        likes: '15.2w',
        comments: '3456',
        user: {
          name: '甜品师',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
        },
        music: '甜蜜时光 - 原创音乐'
      }
    ]);
  }, []);

  return (
    <div className="h-screen bg-black">
      {/* 顶部导航栏 */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-black/30 backdrop-blur-md">
        <div className="flex items-center justify-between px-4 h-14">
          <button 
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="w-6 h-6 text-white" />
          </button>
          <button 
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            onClick={() => navigate('/search')}
          >
            <Search className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      {/* 视频流 */}
      <div className="h-full overflow-y-scroll snap-y snap-mandatory">
        {videos.map((video) => (
          <div key={video.id} className="snap-start">
            <VideoCard video={video} />
          </div>
        ))}
      </div>

      {/* 侧边菜单 */}
      <SideMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
      />
    </div>
  );
};

export default HotPage; 