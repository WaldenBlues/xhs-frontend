// src/components/layout/BottomNav.jsx
import React from 'react';
import { PlusSquare, User, Home } from 'lucide-react'; // 只导入需要的图标

const BottomNav = ({ activePage, setActivePage }) => {
  const navItems = [
    { id: 'home', icon: Home, label: '首页' },
    { id: 'post', icon: PlusSquare, label: '发布' },
    { id: 'profile', icon: User, label: '我' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t flex justify-around items-center z-20">
      {navItems.map(item => (
        <button
          key={item.id}
          onClick={() => setActivePage(item.id)}
          className={`flex flex-col items-center justify-center w-full transition-colors duration-200 ${activePage === item.id ? 'text-red-500' : 'text-gray-600'}`}
        >
          <item.icon className={`w-6 h-6 mb-1 ${item.id === 'post' ? 'w-8 h-8' : ''}`} />
          <span className={`text-xs ${item.id === 'post' ? 'hidden' : ''}`}>{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;