// src/components/post/MasonryLayout.jsx
import React from 'react';
import PostCard from './PostCard'; // 导入 PostCard 组件，路径是相对于当前文件的

const MasonryLayout = ({ posts, onSelectPost }) => (
  <div className="p-2 sm:p-4" style={{ columnCount: 2, columnGap: '0.5rem' }}>
    {posts.map(post => (
      <PostCard key={post.id} post={post} onSelectPost={onSelectPost} />
    ))}
  </div>
);

export default MasonryLayout;