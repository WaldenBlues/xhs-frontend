import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import ProfilePage from './pages/ProfilePage';
import Header from './components/layout/Header';
import BottomNav from './components/layout/BottomNav';

export default function App() {
  return (
    <Router>
      {/* 顶部通用 Header，可根据路由传入 title 与 showBack */}
      <Header title="小红书" showBack={false} />

      <div className="pb-12"> {/* 给底部导航预留空间 */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:id" element={<DetailPage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
        </Routes>
      </div>

      {/* 底部固定导航 */}
      <BottomNav />
    </Router>
  );
}
