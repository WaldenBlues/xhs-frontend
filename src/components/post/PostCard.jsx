// src/components/post/PostCard.jsx
import React from 'react';
import { Heart } from 'lucide-react';

const PostCard = ({ post }) => (
  <div
    className="break-inside-avoid mb-4 bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 cursor-pointer"
  >
    <img
      src={post.imageUrl}
      alt={post.title}
      loading="lazy"
      className="w-full h-48 object-cover rounded-t-lg bg-gray-100"
    />
    <div className="p-3">
      <h3 className="font-bold text-gray-800 text-sm mb-2 truncate">{post.title}</h3>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center">
          <img
            src={post.user.avatar}
            alt={post.user.name}
            className="w-5 h-5 rounded-full mr-2"
          />
          <span className="truncate max-w-[4rem]">{post.user.name}</span>
        </div>
        <div className="flex items-center">
          <Heart className="w-4 h-4 mr-1 text-gray-400" />
          <span>{post.likes}</span>
        </div>
      </div>
    </div>
  </div>
);

export default PostCard;