// src/pages/HomePage.jsx
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import MasonryLayout from '../components/post/MasonryLayout';
import { getInitialPosts } from '../data/mockData';

const HomePage = () => {
  const [posts] = useState(getInitialPosts());

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部搜索栏 */}
      <div className="sticky top-0 bg-white flex items-center justify-between p-4 border-b z-10">
        <h1 className="text-xl font-bold text-primary">发现</h1>
        <div className="flex-1 mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="搜索笔记"
              className="w-full pl-10 pr-4 py-2 border rounded-full text-sm bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <button className="text-primary font-medium">发布</button>
      </div>

      {/* 瀑布流内容区域 */}
      <div className="p-2">
        <MasonryLayout posts={posts} />
      </div>
    </div>
  );
};

export default HomePage;