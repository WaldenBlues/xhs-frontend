// src/pages/HomePage.jsx
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import MasonryLayout from '../components/post/MasonryLayout'; // 更新路径
import { getInitialPosts } from '../data/mockData'; // 导入模拟数据
const HomePage = ({ onSelectPost }) => {
  const [posts, setPosts] = useState(getInitialPosts());
  
  return (
    <div>
      <header className="sticky top-0 bg-white bg-opacity-90 backdrop-blur-sm z-10 flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-6">
          <h1 className="text-lg font-bold text-red-500">发现</h1>
          <h1 className="text-lg font-bold text-gray-500">附近</h1>
        </div>
        <Search className="w-6 h-6 text-gray-600" />
      </header>
      <MasonryLayout posts={posts} onSelectPost={onSelectPost} />
    </div>
  );
};