// src/App.jsx
import React, { useState } from 'react';

// 导入页面组件
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import LoginPage from './pages/LoginPage';
import PostPage from './pages/PostPage';
import ProfilePage from './pages/ProfilePage';

// 导入布局组件
import BottomNav from './components/layout/BottomNav';

export default function App() {
  const [currentPage, setCurrentPage] = useState('login'); // [修复] 初始页面应为 'login'
  const [user, setUser] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  // --- 事件处理函数 ---
  const handleLogin = () => {
    setUser({ name: '认证用户', avatar: 'https://i.pravatar.cc/150?u=authenticated' });
    setCurrentPage('home');
  };

  const handleGuest = () => {
    setUser({ name: '游客', avatar: 'https://i.pravatar.cc/150?u=guest' });
    setCurrentPage('home');
  };

  const handleSelectPost = (post) => {
    setSelectedPost(post);
    setCurrentPage('detail');
  }

  const handleBack = () => {
      setSelectedPost(null);
      setCurrentPage('home');
  }

  // [修复] 简化导航逻辑
  const navigate = (page) => {
      // 访问 'post' 或 'profile' 页面需要正式用户
      if ((page === 'post' || page === 'profile') && user?.name === '游客') {
          alert('游客无法访问此页面，请先登录！'); // 在实际应用中，这里应该是一个更友好的提示框
          setCurrentPage('login');
          setUser(null);
          return;
      }
      setCurrentPage(page);
  }

  // --- 渲染逻辑 ---
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onSelectPost={handleSelectPost} />;
      case 'detail':
        return <DetailPage post={selectedPost} onBack={handleBack} />;
      case 'post':
        return <PostPage />;
      case 'profile':
        return <ProfilePage user={user} onSelectPost={handleSelectPost}/>;
      case 'login':
        return <LoginPage onLogin={handleLogin} onGuest={handleGuest} />;
      default:
        // 默认返回登录页
        return <LoginPage onLogin={handleLogin} onGuest={handleGuest} />;
    }
  };
  
  // [修复] 简化后的渲染逻辑
  // 1. 如果用户未登录(user为null), 并且当前页不是登录页, 强制渲染登录页
  if (!user && currentPage !== 'login') {
    return (
        <div className="w-full max-w-sm mx-auto bg-white font-sans shadow-2xl rounded-lg overflow-hidden relative">
            <LoginPage onLogin={handleLogin} onGuest={handleGuest} />
        </div>
    )
  }

  // 2. 如果用户已登录，或在登录页, 正常渲染
  return (
    // [修复] 为外壳添加 relative 定位，以便 BottomNav 能正确地相对于它定位
    <div className="w-full max-w-sm mx-auto bg-gray-100 font-sans shadow-2xl rounded-lg overflow-hidden relative">
        <main className="pb-16 min-h-screen">
            {renderPage()}
        </main>
        {/* [修复] 只有用户登录后才显示导航栏, 并且详情页不显示 */}
        {user && currentPage !== 'detail' && (
             <BottomNav activePage={currentPage} setActivePage={navigate} />
        )}
    </div>
  );
}