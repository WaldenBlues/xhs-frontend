// src/components/post/MasonryLayout.jsx
import React, { useEffect, useRef } from 'react';

const MasonryLayout = ({ children }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = window.innerWidth;
        // 手机端：2列
        // 桌面端：4列
        const columns = width < 1024 ? 2 : 4;
        containerRef.current.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      ref={containerRef}
      style={{
        display: 'grid',
        gap: '1rem',
        width: '100%'
      }}
    >
      {React.Children.map(children, child => (
        <div>
          {child}
        </div>
      ))}
    </div>
  );
};

export default MasonryLayout;
