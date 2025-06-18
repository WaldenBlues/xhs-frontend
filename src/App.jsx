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
     
      <Header title="小红书" showBack={false} />

      <div className="pb-12"> 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:id" element={<DetailPage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
        </Routes>
      </div>
      <BottomNav />
    </Router>
  );
}
