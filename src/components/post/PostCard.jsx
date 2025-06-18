// src/components/post/PostCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';

const PostCard = ({ post }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/detail/${post.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-card overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 ease-in-out hover:-translate-y-1 cursor-pointer"
    >
      <div className="relative aspect-[3/4] bg-gray-100">
        <img
          src={post.imageUrl}
          alt={post.title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3">
        <h3 className="font-medium text-gray-900 text-sm lg:text-base mb-2 line-clamp-2">
          {post.title}
        </h3>
        <div className="flex items-center justify-between text-xs lg:text-sm text-gray-500">
          <div className="flex items-center">
            <img
              src={post.user.avatar}
              alt={post.user.name}
              className="w-5 h-5 lg:w-6 lg:h-6 rounded-full mr-2 border border-gray-200"
            />
            <span className="truncate max-w-[4rem] lg:max-w-[8rem] text-gray-600">
              {post.user.name}
            </span>
          </div>
          <div className="flex items-center">
            <Heart className="w-4 h-4 lg:w-5 lg:h-5 mr-1 text-gray-400" />
            <span className="text-gray-600">{post.likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
