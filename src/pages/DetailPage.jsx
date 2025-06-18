// src/pages/DetailPage.jsx
import React from 'react'; 
import { useParams } from 'react-router-dom';
import Header from '../components/layout/Header';
import { getInitialPosts, getCommentsForPost } from '../data/mockData';

const DetailPage = () => {
  const { id } = useParams();
  const post = getInitialPosts().find(p => p.id === Number(id));
  const comments = getCommentsForPost();

  if (!post) {
    return <div className="p-4">帖子不存在</div>;
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 整体背景图 */}
      <img
        src={post.imageUrl}
        alt={post.title}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* 半透明遮罩层，可选，增加层次 */}
      <div className="absolute inset-0 bg-black/10 z-10" />

      <div className="relative z-20 flex flex-col min-h-screen">
        <Header title="详情" showBack />

        {/* 文章内容 */}
        <div className="flex-1 p-4 max-w-3xl mx-auto w-full">
          <div className="bg-white/60 backdrop-blur-md rounded-xl shadow-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <div className="flex items-center text-sm text-gray-700">
              <img
                src={post.user.avatar}
                alt={post.user.name}
                className="w-6 h-6 rounded-full mr-2"
              />
              <span>{post.user.name}</span>
              <span className="ml-auto">{post.likes} 喜欢</span>
            </div>
          </div>

          {/* 评论容器，放在文章内容下方 */}
          <div className="mt-6 bg-white/60 backdrop-blur-md rounded-xl shadow-lg p-6 max-h-[50vh] overflow-y-auto space-y-4">
            <h3 className="text-lg font-semibold">评论</h3>
            <div className="space-y-2">
              {comments.map(c => (
                <div key={c.id} className="flex items-start">
                  <img
                    src={c.user.avatar}
                    alt={c.user.name}
                    className="w-6 h-6 rounded-full mr-2 mt-1"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-900">{c.user.name}</div>
                    <div className="text-sm text-gray-800">{c.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 如果需要底部推荐区可放这里 */}
      </div>
    </div>
  );
};

export default DetailPage;
