// src/pages/ProfilePage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/layout/Header';
import MasonryLayout from '../components/post/MasonryLayout';
import { getInitialPosts } from '../data/mockData';

const ProfilePage = () => {
  const { userId } = useParams();
  const allPosts = getInitialPosts();
  const userPosts = allPosts.filter(p => p.user.name === userId);

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <Header title={userId} showBack />

      <div className="p-4 flex items-center space-x-4">
        <img
          src={userPosts[0]?.user.avatar}
          alt={userId}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h2 className="text-lg font-semibold">{userId}</h2>
          <p className="text-sm text-gray-500">{userPosts.length} 篇笔记</p>
        </div>
      </div>

      <div className="p-2">
        <MasonryLayout posts={userPosts} />
      </div>
    </div>
  );
};

export default ProfilePage;