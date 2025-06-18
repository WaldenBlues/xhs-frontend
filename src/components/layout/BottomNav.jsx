import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Heart, MessageCircle, User } from 'lucide-react';
import CreateMenu from './CreateMenu';

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === path || location.pathname === '/follow' || location.pathname === '/discover' || location.pathname === '/nearby';
    }
    return location.pathname === path;
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex items-center justify-around px-4 z-50">
        <button
          onClick={() => navigate('/')}
          className={`flex-1 flex flex-col items-center ${isActive('/') ? 'text-red-500' : 'text-gray-500'}`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">首页</span>
          {isActive('/') && <div className="w-4 h-0.5 bg-red-500 rounded-full mt-1" />}
        </button>

        <button
          onClick={() => navigate('/hot')}
          className={`flex-1 flex flex-col items-center ${isActive('/hot') ? 'text-red-500' : 'text-gray-500'}`}
        >
          <Heart className="w-6 h-6" />
          <span className="text-xs mt-1">热门</span>
          {isActive('/hot') && <div className="w-4 h-0.5 bg-red-500 rounded-full mt-1" />}
        </button>

        <button
          onClick={() => setIsCreateMenuOpen(true)}
          className="flex-1 flex flex-col items-center"
        >
          <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center -mt-6 shadow-lg">
            <span className="text-white text-2xl">+</span>
          </div>
        </button>

        <button
          onClick={() => navigate('/messages')}
          className={`flex-1 flex flex-col items-center ${isActive('/messages') ? 'text-red-500' : 'text-gray-500'}`}
        >
          <MessageCircle className="w-6 h-6" />
          <span className="text-xs mt-1">消息</span>
          {isActive('/messages') && <div className="w-4 h-0.5 bg-red-500 rounded-full mt-1" />}
        </button>

        <button
          onClick={() => navigate('/profile')}
          className={`flex-1 flex flex-col items-center ${isActive('/profile') ? 'text-red-500' : 'text-gray-500'}`}
        >
          <User className="w-6 h-6" />
          <span className="text-xs mt-1">我</span>
          {isActive('/profile') && <div className="w-4 h-0.5 bg-red-500 rounded-full mt-1" />}
        </button>
      </div>

      <CreateMenu 
        isOpen={isCreateMenuOpen}
        onClose={() => setIsCreateMenuOpen(false)}
      />
    </>
  );
};

export default BottomNav;