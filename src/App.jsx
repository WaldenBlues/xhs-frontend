import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FollowPage from './pages/FollowPage';
import NearbyPage from './pages/NearbyPage';
import DetailPage from './pages/DetailPage';
import ProfilePage from './pages/ProfilePage';
import MessagesPage from './pages/MessagesPage';
import SearchPage from './pages/SearchPage';
import HotPage from './pages/HotPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BottomNav from './components/layout/BottomNav';
import ChatWidget from './components/post/ChatWidget';
// 创建一个包装组件来处理底部导航栏的显示逻辑
const Layout = ({ children }) => {
  const location = useLocation();
  const showBottomNav = !['/login', '/register'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      {children}
      {showBottomNav && <BottomNav />}
            <ChatWidget />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/follow" element={<FollowPage />} />
          <Route path="/discover" element={<HomePage />} />
          <Route path="/nearby" element={<NearbyPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/hot" element={<HotPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
