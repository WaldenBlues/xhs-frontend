// src/components/post/PostCard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import api from "../../api/apiClient.js";

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    avatar: post.user?.avatar || "/default.png",
    name: post.user?.name || "匿名用户",
  });

  const handleClick = () => {
    api
      .post(`/api/recommend/view/${post.id}`)
      .then((response) => {
        console.log("更新浏览量成功:", response.data);
        navigate(`/detail/${post.id}`);
      })
      .catch((error) => {
        console.error("更新浏览量失败:", error);
        message.error("更新浏览量失败，请稍后再试");
      });
    // navigate(`/detail/${post.id}`);
  };

  useEffect(() => {
    // 只有当post.user.id存在时才发送请求
    if (post.user?.id) {
      api
        .get(`/api/auth/message/${post.user.id}`)
        .then((response) => {
          console.log("当前用户信息:", response.data);
          setUserInfo({
            avatar: response.data.avatar || "/default.png",
            name: response.data.username || "匿名用户",
          });
        })
        .catch((error) => {
          console.error("获取当前用户信息失败:", error);
          // 保持默认值
        });
    }
  }, [post.user?.id]);

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-card overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 ease-in-out hover:-translate-y-1 cursor-pointer"
    >
      <div className="relative aspect-[3/4] bg-gray-100">
        <img
          src={post.imageUrl}
          alt={post.title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3">
        <h3 className="font-medium text-gray-900 text-sm lg:text-base mb-2 line-clamp-2">
          {post.title}
        </h3>
        <div className="flex items-center justify-between text-xs lg:text-sm text-gray-500">
          <div className="flex items-center">
            <img
              src={userInfo.avatar}
              alt={userInfo.name}
              className="w-5 h-5 lg:w-6 lg:h-6 rounded-full mr-2 border border-gray-200"
            />
            <span className="truncate max-w-[4rem] lg:max-w-[8rem] text-gray-600">
              {userInfo.name}
            </span>
          </div>
          <div className="flex items-center">
            <Heart className="w-4 h-4 lg:w-5 lg:h-5 mr-1 text-gray-400" />
            <span className="text-gray-600">{post.likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
