// src/pages/LoginPage.jsx
import React from 'react';

const LoginPage = ({ onLogin, onGuest }) => (
  <div className="p-8 flex flex-col items-center justify-center h-screen bg-gray-50">
    <h1 className="text-3xl font-bold text-red-500 mb-8">欢迎回来</h1>
    <div className="w-full max-w-xs">
        <input type="text" placeholder="用户名" className="w-full px-4 py-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"/>
        <input type="password" placeholder="密码" className="w-full px-4 py-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"/>
        <button onClick={onLogin} className="w-full bg-red-500 text-white py-3 rounded-lg font-bold hover:bg-red-600 transition-colors">登录</button>
        <button onClick={onGuest} className="w-full mt-4 text-gray-500 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors">游客身份浏览</button>
    </div>
  </div>
);