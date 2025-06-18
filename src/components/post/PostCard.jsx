// src/components/post/PostCard.jsx
import React from 'react';
import { Heart } from 'lucide-react';

const PostCard = ({ post, onSelectPost }) => (
  // 卡片容器：防止在分栏时被截断，底部外边距，白色背景，圆角，阴影，悬停动画
  <div className="break-inside-avoid mb-4 bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1" onClick={() => onSelectPost(post)}>
    {/* 帖子图片 */}
    <img src={post.imageUrl} alt={post.title} className="w-full h-auto object-cover" />
    {/* 帖子信息区：内边距 */}
    <div className="p-3">
      {/* 帖子标题 */}
      <h3 className="font-bold text-gray-800 text-sm mb-2">{post.title}</h3>
      {/* 用户信息和点赞数：水平对齐，文字小，颜色灰色 */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        {/* 用户头像和名称 */}
        <div className="flex items-center">
          <img src={post.user.avatar} alt={post.user.name} className="w-5 h-5 rounded-full mr-2" />
          <span>{post.user.name}</span>
        </div>
        {/* 点赞图标和数量 */}
        <div className="flex items-center">
          <Heart className="w-4 h-4 mr-1 text-gray-400" />
          <span>{post.likes}</span>
        </div>
      </div>
    </div>
  </div>
);
export default PostCard;
