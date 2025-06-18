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
  const [currentPage, setCurrentPage] = useState('home'); 
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
      // 从详情页总是返回到首页
      setCurrentPage('home');
  }

  const navigate = (page) => {
      setCurrentPage(page);
  }

  // --- 渲染逻辑 ---
  const renderPage = () => {
    const protectedPages = ['post', 'profile'];

    // 如果未登录用户尝试访问受保护页面，则渲染登录页
    if (!user && protectedPages.includes(currentPage)) {
      return <LoginPage onLogin={handleLogin} onGuest={handleGuest} />;
    }
  
    switch (currentPage) {
      case 'home':
        return <HomePage onSelectPost={handleSelectPost} />;
      case 'detail':
        return selectedPost ? <DetailPage post={selectedPost} onBack={handleBack} /> : <HomePage onSelectPost={handleSelectPost} />;
      case 'post':
        return <PostPage />;
      case 'profile':
        return <ProfilePage user={user} onSelectPost={handleSelectPost}/>;
      // 默认情况，如果 currentPage 是 'login' 或其他未知值，都显示首页或登录页
      default:
        return <LoginPage onLogin={handleLogin} onGuest={handleGuest} />;
    }
  };

  // 根据当前状态判断是否显示底部导航栏
  const showBottomNav = user && currentPage !== 'detail' && currentPage !== 'login';

  // 初始状态，如果用户未定，则显示登录页
  if (!user && currentPage !=='login') {
     return( 
       <div className="w-full max-w-sm mx-auto bg-gray-100 font-sans shadow-2xl rounded-lg overflow-hidden">
        <LoginPage onLogin={handleLogin} onGuest={handleGuest} />
       </div>
      )
  }

  return (
    <div className="w-full max-w-sm mx-auto bg-gray-100 font-sans shadow-2xl rounded-lg overflow-hidden">
        <main className="pb-16 min-h-screen">
            {renderPage()}
        </main>
        {showBottomNav && (
             <BottomNav activePage={currentPage} setActivePage={navigate} />
        )}
    </div>
  );
}