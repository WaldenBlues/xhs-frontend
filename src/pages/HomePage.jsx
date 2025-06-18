// src/pages/HomePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Search } from 'lucide-react';
import MasonryLayout from '../components/post/MasonryLayout';
import PostCard from '../components/post/PostCard';
import SideMenu from '../components/layout/SideMenu';
import { getInitialPosts } from '../data/mockData';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('discover');
  const navigate = useNavigate();
  const posts = getInitialPosts();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    switch (tab) {
      case 'follow':
        navigate('/follow');
        break;
      case 'discover':
        navigate('/');
        break;
      case 'nearby':
        navigate('/nearby');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 h-14">
          <button 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>

          {/* 中间导航选项 - 使用绝对定位实现居中 */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-6">
            <button
              onClick={() => handleTabClick('follow')}
              className={`relative px-2 py-1 text-sm font-medium transition-colors ${
                activeTab === 'follow' ? 'text-primary' : 'text-gray-600 hover:text-primary'
              }`}
            >
              关注
              {activeTab === 'follow' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
              )}
            </button>
            <button
              onClick={() => handleTabClick('discover')}
              className={`relative px-2 py-1 text-sm font-medium transition-colors ${
                activeTab === 'discover' ? 'text-primary' : 'text-gray-600 hover:text-primary'
              }`}
            >
              发现
              {activeTab === 'discover' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
              )}
            </button>
            <button
              onClick={() => handleTabClick('nearby')}
              className={`relative px-2 py-1 text-sm font-medium transition-colors ${
                activeTab === 'nearby' ? 'text-primary' : 'text-gray-600 hover:text-primary'
              }`}
            >
              附近
              {activeTab === 'nearby' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
              )}
            </button>
          </div>

          <button 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => navigate('/search')}
          >
            <Search className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>

{/* 内容区域 */}
<div className="w-full px-4 py-6">
  <MasonryLayout>
    {posts.map((post) => (
      <PostCard 
        key={post.id} 
        post={post} 
        onClick={() => navigate(`/detail/${post.id}`)} 
      />
    ))}
  </MasonryLayout>
</div>


      {/* 侧边菜单 */}
      <SideMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
      />
    </div>
  );
};

export default HomePage;