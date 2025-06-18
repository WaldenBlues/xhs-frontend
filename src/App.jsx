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
  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleLogin = () => { setUser({ name: '认证用户', avatar: 'https://i.pravatar.cc/150?u=authenticated' }); setCurrentPage('home'); };
  const handleGuest = () => { setUser({ name: '游客', avatar: 'https://i.pravatar.cc/150?u=guest' }); setCurrentPage('home'); };
  const handleSelectPost = (post) => { setSelectedPost(post); setCurrentPage('detail'); };
  const handleBack = () => { setSelectedPost(null); setCurrentPage('home'); };
  const navigate = (page) => {
      if ((page === 'post' || page === 'profile') && user?.name === '游客') {
          alert('游客无法访问此页面，请先登录！');
          setUser(null);
          setCurrentPage('login');
          return;
      }
      setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage onSelectPost={handleSelectPost} />;
      case 'detail': return <DetailPage post={selectedPost} onBack={handleBack} />;
      case 'post': return <PostPage />;
      case 'profile': return <ProfilePage user={user} onSelectPost={handleSelectPost}/>;
      default: return <LoginPage onLogin={handleLogin} onGuest={handleGuest} />;
    }
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} onGuest={handleGuest} />;
  }

  return (
    <div className="w-full max-w-sm mx-auto bg-gray-100 font-sans shadow-2xl rounded-lg overflow-hidden relative min-h-screen">
        <main className="pb-16">
            {renderPage()}
        </main>
        {currentPage !== 'detail' && (
             <BottomNav activePage={currentPage} setActivePage={navigate} />
        )}
    </div>
  );
}