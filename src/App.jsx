import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import ProfilePage from './pages/ProfilePage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:id" element={<DetailPage />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}