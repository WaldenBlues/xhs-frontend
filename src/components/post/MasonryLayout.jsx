// src/components/post/MasonryLayout.jsx
import React from 'react';
import PostCard from './PostCard';

const MasonryLayout = ({ posts, onSelectPost }) => (
  <div className="p-2 sm:p-4" style={{ columnCount: 2, columnGap: '0.75rem' }}>
    {posts.map(post => (
      <PostCard key={post.id} post={post} onSelectPost={onSelectPost} />
    ))}
  </div>
);
export default MasonryLayout;
