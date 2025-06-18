// src/components/post/MasonryLayout.jsx
import React from 'react';
import PostCard from './PostCard';

const MasonryLayout = ({ posts, onSelectPost }) => (
  <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 px-2 sm:px-4">
    {posts.map(post => (
      <div key={post.id} className="break-inside-avoid">
        <PostCard post={post} onSelectPost={onSelectPost} />
      </div>
    ))}
  </div>
);

export default MasonryLayout;
