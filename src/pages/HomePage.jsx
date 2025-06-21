import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Search, FileText, RefreshCw } from "lucide-react";
import MasonryLayout from "../components/post/MasonryLayout";
import PostCard from "../components/post/PostCard";
import SideMenu from "../components/layout/SideMenu";
import { getInitialPosts } from "../data/mockData";
import api from "../api/apiClient.js";
import { message } from "antd";

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("discover");
  const [posts, setPosts] = useState(getInitialPosts());
  const [loading, setLoading] = useState(true); // 添加加载状态
  const navigate = useNavigate();

  if (!window.localStorage.getItem("Authorization")) {
    navigate("/login");
  }

  // 获取推荐内容
  const fetchRecommendedPosts = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/recommend/contents");
      console.log("获取推荐内容成功:", response.data);

      if (response.data && response.data.contents) {
        const contents = response.data.contents;
        const newPosts = contents.map((content) => ({
          id: content.id,
          imageUrl: content.coverUrl,
          title: content.title,
          user: {
            id: content.userId,
            avatar: "",
          },
          likes: content.likeCount,
        }));
        setPosts(newPosts);
      } else {
        setPosts([]);
      }
    } catch (error) {
      console.error("获取推荐内容失败:", error);
      message.error("获取推荐内容失败");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!window.localStorage.getItem("Authorization")) {
      navigate("/login");
      return;
    }

    fetchRecommendedPosts();
  }, [navigate]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    switch (tab) {
      case "follow":
        navigate("/follow");
        break;
      case "discover":
        navigate("/");
        break;
      case "nearby":
        navigate("/nearby");
        break;
      default:
        break;
    }
  };

  const toPost = (id) => {
    api
      .post(`/api/recommend/view/${id}`)
      .then((response) => {
        console.log("更新浏览量成功:", response.data);
        navigate(`/detail/${id}`);
      })
      .catch((error) => {
        console.error("更新浏览量失败:", error);
        message.error("更新浏览量失败，请稍后再试");
      });
  };

  // 刷新推荐内容
  const handleRefresh = () => {
    fetchRecommendedPosts();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 h-14">
          <button
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>

          {/* 中间导航选项 - 使用绝对定位实现居中 */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-6">
            <button
              onClick={() => handleTabClick("follow")}
              className={`relative px-2 py-1 text-sm font-medium transition-colors ${
                activeTab === "follow"
                  ? "text-primary"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              关注
              {activeTab === "follow" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
              )}
            </button>
            <button
              onClick={() => handleTabClick("discover")}
              className={`relative px-2 py-1 text-sm font-medium transition-colors ${
                activeTab === "discover"
                  ? "text-primary"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              发现
              {activeTab === "discover" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
              )}
            </button>
          </div>

          <button
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => navigate("/search")}
          >
            <Search className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="w-full px-4 py-6">
        {loading ? (
          // 加载状态
          <div className="flex items-center justify-center py-16">
            <div className="text-gray-500">加载中...</div>
          </div>
        ) : posts.length === 0 ? (
          // 空状态页面
          <div className="flex flex-col items-center justify-center py-16 text-gray-500">
            <FileText className="w-20 h-20 text-gray-300 mb-6" />
            <div className="text-xl font-medium mb-2">暂无推荐内容</div>
            <div className="text-sm text-gray-400 mb-6 text-center">
              当前没有可推荐的内容
              <br />
              可能你已经把所有内容都看了一遍？
              <br />
              刷新试试看或稍后再来
            </div>
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              />
              <span>刷新内容</span>
            </button>
          </div>
        ) : (
          // 正常内容展示
          <MasonryLayout>
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onClick={() => toPost(post.id)}
              />
            ))}
          </MasonryLayout>
        )}
      </div>

      {/* 侧边菜单 */}
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
};

export default HomePage;
