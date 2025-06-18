// src/components/post/MasonryLayout.jsx
import React from 'react';
import PostCard from './PostCard';

const MasonryLayout = ({ posts }) => (
  <div className="px-2 sm:px-4">
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
      {posts.map(post => (
        <div key={post.id} className="break-inside-avoid mb-4">
          <PostCard post={post} />
        </div>
      ))}
    </div>
  </div>
);

export default MasonryLayout;
