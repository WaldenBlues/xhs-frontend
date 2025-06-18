// src/pages/DetailPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/layout/Header';
import MasonryLayout from '../components/post/MasonryLayout';
import { getInitialPosts, getCommentsForPost } from '../data/mockData';

const DetailPage = () => {
  const { id } = useParams();
  const post = getInitialPosts().find(p => p.id === Number(id));
  const comments = getCommentsForPost();

  if (!post) {
    return <div className="p-4">帖子不存在</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <Header title="详情" showBack />

      <div className="p-4">
        <img src={post.imageUrl} alt={post.title} className="w-full h-64 object-cover rounded-lg mb-4" />
        <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <img src={post.user.avatar} alt={post.user.name} className="w-6 h-6 rounded-full mr-2" />
          <span>{post.user.name}</span>
          <span className="ml-auto">{post.likes} 喜欢</span>
        </div>
        <div className="space-y-2">
          {comments.map(c => (
            <div key={c.id} className="flex items-start">
              <img src={c.user.avatar} alt={c.user.name} className="w-6 h-6 rounded-full mr-2 mt-1" />
              <div>
                <div className="text-sm font-medium">{c.user.name}</div>
                <div className="text-sm text-gray-700">{c.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 你可以在底部加入相关推荐 */}
    </div>
  );
};

export default DetailPage;