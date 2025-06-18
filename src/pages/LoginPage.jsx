// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: 实现登录逻辑
    navigate('/');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen bg-white px-6 py-12">
      {/* 标题 */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-red-500 mb-2">小红书</h1>
        <p className="text-gray-500">标记我的生活</p>
      </div>

      {/* 登录表单 */}
      <form onSubmit={handleLogin} className="space-y-6">
        {/* 账号输入框 */}
        <div className="space-y-2">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            账号
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
            placeholder="请输入手机号/邮箱"
            required
          />
        </div>

        {/* 密码输入框 */}
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            密码
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
              placeholder="请输入密码"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* 登录按钮 */}
        <button
          type="submit"
          className="w-full py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors"
        >
          登录
        </button>

        {/* 注册按钮 */}
        <button
          type="button"
          onClick={handleRegister}
          className="w-full py-3 text-red-500 font-medium hover:text-red-600 transition-colors"
        >
          注册账号
        </button>
      </form>

      {/* 其他登录方式 */}
      <div className="mt-12">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">其他登录方式</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;