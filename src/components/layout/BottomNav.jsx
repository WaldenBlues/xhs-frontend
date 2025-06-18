import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, PlusCircle, MessageSquare, User } from 'lucide-react';

const navItems = [
  { to: '/', icon: Home, label: '首页' },
  { to: '/search', icon: Search, label: '搜索' },
  { to: '/create', icon: PlusCircle, label: '发布' },
  { to: '/messages', icon: MessageSquare, label: '消息' },
  { to: '/profile', icon: User, label: '我的' },
];

const BottomNav = () => (
  <nav className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around h-12">
    {navItems.map(item => (
      <NavLink
        key={item.to}
        to={item.to}
        className={({ isActive }) =>
          `flex flex-col items-center justify-center text-xs ${isActive ? 'text-primary' : 'text-gray-500'}`
        }
      >
        <item.icon className="w-6 h-6" />
        <span>{item.label}</span>
      </NavLink>
    ))}
  </nav>
);

export default BottomNav;