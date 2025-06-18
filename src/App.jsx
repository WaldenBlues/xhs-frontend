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
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'login', 'post', 'profile', 'detail'
  const [user, setUser] = useState(null); // null 表示未登录/游客
  const [selectedPost, setSelectedPost] = useState(null);

  // --- 页面切换逻辑 ---
  const handleLogin = () => {
    setUser({ name: '认证用户', avatar: 'https://i.pravatar.cc/150?u=authenticated' });
    setCurrentPage('home'); // 登录成功后跳转到首页
  };

  const handleGuest = () => {
    setUser({ name: '游客', avatar: 'https://i.pravatar.cc/150?u=guest' });
    setCurrentPage('home'); // 游客身份进入首页
  };

  const handleSelectPost = (post) => {
    setSelectedPost(post);
    setCurrentPage('detail');
  }

  const handleBackToHome = () => {
      setSelectedPost(null);
      setCurrentPage('home');
  }

  // 导航函数，处理未登录用户尝试访问受保护页面的情况
  const navigate = (page) => {
      // 如果用户未登录，并且尝试访问发布页或个人中心页，则跳转到登录页
      if (!user && (page === 'post' || page === 'profile')) {
          setCurrentPage('login');
      } else {
          setCurrentPage(page);
      }
  }

  // --- 渲染逻辑 ---
  const renderPage = () => {
    // 如果用户未登录，只渲染登录页
    if (!user) {
        return <LoginPage onLogin={handleLogin} onGuest={handleGuest} />;
    }

    // 已登录用户根据当前页面状态渲染
    switch (currentPage) {
      case 'home':
        return <HomePage onSelectPost={handleSelectPost} />;
      case 'detail':
        // 确保 selectedPost 在渲染 DetailPage 时有值
        return selectedPost ? <DetailPage post={selectedPost} onBack={handleBackToHome} /> : <HomePage onSelectPost={handleSelectPost} />;
      case 'post':
        return <PostPage />;
      case 'profile':
        return <ProfilePage user={user} onSelectPost={handleSelectPost}/>;
      case 'login': // 理论上已登录不会直接导航到登录页，但为了完整性保留
        return <LoginPage onLogin={handleLogin} onGuest={handleGuest} />;
      default:
        // 默认情况，如果currentPage是一个未知值，回到首页
        return <HomePage onSelectPost={handleSelectPost} />;
    }
  };

  return (
    // 使用一个固定的外壳来模拟手机屏幕
    <div className="w-full max-w-sm mx-auto bg-gray-100 font-sans shadow-2xl rounded-lg overflow-hidden">
        <main className="pb-16 min-h-screen"> {/* 为底部导航留出空间 */}
            {renderPage()}
        </main>
        {/* 只有在用户登录且不在详情页时才显示底部导航 */}
        {user && currentPage !== 'detail' && (
             <BottomNav activePage={currentPage} setActivePage={navigate} />
        )}
    </div>
  );
}