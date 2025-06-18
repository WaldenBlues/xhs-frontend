// src/pages/ProfilePage.jsx
import React from 'react';
import { Menu, Share2 } from 'lucide-react';
import MasonryLayout from '../components/post/MasonryLayout';
import PostCard from '../components/post/PostCard';
import { getInitialPosts } from '../data/mockData';

const ProfilePage = () => {
  // 模拟用户数据
  const user = {
    name: '旅行摄影师',
    xhsId: 'xhs123456',
    avatar: 'https://i.pravatar.cc/300',
    bio: '热爱生活，热爱摄影 | 分享美好瞬间 | 记录生活点滴',
    stats: {
      following: 256,
      followers: 1024,
      likes: 8765
    }
  };

  // 获取用户发布的帖子
  const posts = getInitialPosts().slice(0, 8); // 模拟获取用户发布的帖子

  return (
    <div className="min-h-screen bg-white">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 h-14">
          <button className="p-2">
            <Menu className="w-6 h-6" />
          </button>
          <button className="p-2">
            <Share2 className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* 个人信息区域 */}
      <div className="px-4 py-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
            />
          </div>
          <div>
            <h1 className="text-xl font-semibold">{user.name}</h1>
            <p className="text-gray-500 text-sm">小红书号：{user.xhsId}</p>
          </div>
        </div>

        {/* 个人简介 */}
        <p className="mt-4 text-gray-700 text-sm">{user.bio}</p>

        {/* 统计数据 */}
        <div className="flex justify-around mt-6 py-4 border-t border-b border-gray-100">
          <div className="text-center">
            <div className="text-lg font-semibold">{user.stats.following}</div>
            <div className="text-gray-500 text-sm">关注</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">{user.stats.followers}</div>
            <div className="text-gray-500 text-sm">粉丝</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">{user.stats.likes}</div>
            <div className="text-gray-500 text-sm">获赞</div>
          </div>
        </div>
      </div>

      {/* 发布的帖子 */}
      <div className="px-4 py-6">
        <h2 className="text-lg font-semibold mb-4">发布的笔记</h2>
        <MasonryLayout>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </MasonryLayout>
      </div>
    </div>
  );
};

export default ProfilePage;