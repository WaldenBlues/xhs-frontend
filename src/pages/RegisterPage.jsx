import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import api from "../api/apiClient.js";
import { message } from "antd";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("注册数据:", formData);
    const { username, email, password } = formData;
    if (!username || !email || !password) {
      alert("请输入所有必填字段");
      return;
    }
    api
      .post("/api/auth/register", {
        username,
        email,
        password,
      })
      .then((response) => {
        console.log("注册请求成功:", response);
        message.success("注册成功，请登录");
        navigate("/login");
      })
      .catch((error) => {
        console.error("注册请求失败:", error);
        message.error("注册请求失败，请稍后再试");
      });
  };

  return (
    <div className="min-h-screen bg-white px-6 py-12">
      {/* 标题 */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-red-500 mb-2">小红书</h1>
        <p className="text-gray-500">标记我的生活</p>
      </div>

      {/* 注册表单 */}
      <form onSubmit={handleRegister} className="space-y-6">
        {/* 用户名输入框 */}
        <div className="space-y-2">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            用户名
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
            placeholder="请输入您的用户名"
            required
          />
        </div>

        {/* 邮箱输入框 */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            邮箱
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
            placeholder="请输入邮箱"
            required
          />
        </div>

        {/* 密码输入框 */}
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            密码
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
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
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* 注册按钮 */}
        <button
          type="submit"
          className="w-full py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors"
        >
          注册
        </button>

        {/* 返回登录 */}
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="w-full py-3 text-red-500 font-medium hover:text-red-600 transition-colors"
        >
          返回登录
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
