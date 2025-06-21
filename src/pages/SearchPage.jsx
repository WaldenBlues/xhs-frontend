import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search as SearchIcon,
  Clock,
  TrendingUp,
} from "lucide-react";
import api from "../api/apiClient.js"; // 确保你有这个API客户端

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState(
    JSON.parse(window.localStorage.getItem("searchHistory")) || []
  );

  // 添加搜索历史
  const addToSearchHistory = (query) => {
    if (!query || !query.trim()) return;

    const trimmedQuery = query.trim();
    let newHistory = [...searchHistory];

    // 如果已存在，先移除
    newHistory = newHistory.filter((item) => item !== trimmedQuery);

    // 添加到开头
    newHistory.unshift(trimmedQuery);

    // 限制历史记录数量（最多保存10条）
    if (newHistory.length > 10) {
      newHistory = newHistory.slice(0, 10);
    }

    // 更新状态和本地存储
    setSearchHistory(newHistory);
    window.localStorage.setItem("searchHistory", JSON.stringify(newHistory));
  };

  // 清除搜索历史
  const clearSearchHistory = () => {
    setSearchHistory([]);
    window.localStorage.removeItem("searchHistory");
  };

  // 处理搜索
  const handleSearch = () => {
    if (searchQuery.trim()) {
      addToSearchHistory(searchQuery);
      console.log("搜索:", searchQuery);
      // 跳转到搜索结果页面
      navigate(`/search-results?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // 处理历史记录点击
  const handleHistoryClick = (query) => {
    setSearchQuery(query);
    addToSearchHistory(query);
    // 跳转到搜索结果页面
    navigate(`/search-results?q=${encodeURIComponent(query)}`);
  };

  // 处理回车键搜索
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 顶部搜索栏 */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="flex items-center px-4 h-14">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>

          <div className="flex-1 mx-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="搜索你感兴趣的内容"
                className="w-full h-10 pl-10 pr-4 text-sm bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
              />
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <button
            onClick={handleSearch}
            className="text-primary font-medium text-sm px-2"
          >
            搜索
          </button>
        </div>
      </div>

      {/* 搜索历史和热点榜单 */}
      <div className="px-4 py-6">
        {/* 搜索历史 */}
        {searchHistory.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center text-gray-600">
                <Clock className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">搜索历史</span>
              </div>
              <button
                className="text-gray-400 text-sm hover:text-gray-600 transition-colors"
                onClick={clearSearchHistory}
              >
                清除
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {searchHistory.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleHistoryClick(item)}
                  className="px-3 py-1.5 text-sm bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 热点榜单 */}
        {/* <div>
          <div className="flex items-center mb-4">
            <TrendingUp className="w-5 h-5 mr-2 text-red-500" />
            <span className="text-sm font-medium text-gray-600">
              小红书热点
            </span>
          </div>
          <div className="space-y-4">
            {hotTopics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => handleHistoryClick(topic.title)}
                className="w-full flex items-center hover:bg-gray-50 p-2 rounded-lg transition-colors"
              >
                <span
                  className={`w-6 text-center text-sm font-medium ${
                    topic.id <= 3 ? "text-red-500" : "text-gray-400"
                  }`}
                >
                  {topic.id}
                </span>
                <span className="flex-1 ml-2 text-sm text-gray-600 text-left">
                  {topic.title}
                </span>
                <span className="text-xs text-gray-400">{topic.hot}</span>
              </button>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default SearchPage;
