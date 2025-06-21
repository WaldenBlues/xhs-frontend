import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  Search as SearchIcon,
  Heart,
  MessageCircle,
  MoreHorizontal,
} from "lucide-react";
import api from "../api/apiClient.js";

const SearchResult = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(keyword);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 10;

  // 搜索内容
  const searchContent = async (page = 1, isLoadMore = false) => {
    if (!keyword.trim()) return;

    setLoading(true);
    try {
      const response = await api.get("/api/content/search", {
        params: {
          keyword: keyword,
          type: 1,
          status: 1,
          page: page,
          size: pageSize,
        },
      });

      const { records, total: totalCount, pages } = response.data;

      if (isLoadMore) {
        setSearchResults((prev) => [...prev, ...records]);
      } else {
        setSearchResults(records);
      }

      setTotal(totalCount);
      setCurrentPage(page);
      setHasMore(page < pages);
    } catch (error) {
      console.error("搜索失败:", error);
      // 可以显示错误提示
    } finally {
      setLoading(false);
    }
  };

  // 初始搜索
  useEffect(() => {
    if (keyword) {
      searchContent(1);
    }
  }, [keyword]);

  // 加载更多
  const loadMore = () => {
    if (!loading && hasMore) {
      searchContent(currentPage + 1, true);
    }
  };

  // 处理新搜索
  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search-results?q=${encodeURIComponent(searchQuery)}`);
      // 由于URL变化会触发useEffect重新搜索，所以这里不需要手动调用searchContent
    }
  };

  // 处理回车键搜索
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // 格式化时间
  const formatTime = (timeString) => {
    const date = new Date(timeString);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      const hours = Math.floor(diff / (1000 * 60 * 60));
      if (hours === 0) {
        const minutes = Math.floor(diff / (1000 * 60));
        return minutes <= 0 ? "刚刚" : `${minutes}分钟前`;
      }
      return `${hours}小时前`;
    } else if (days < 7) {
      return `${days}天前`;
    } else {
      return date.toLocaleDateString();
    }
  };

  // 解析图片URL数组
  const parseImageUrls = (imageUrlsStr) => {
    try {
      return JSON.parse(imageUrlsStr || "[]");
    } catch {
      return [];
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

      {/* 搜索结果统计 */}
      {!loading && searchResults.length > 0 && (
        <div className="px-4 py-3 bg-gray-50 text-sm text-gray-600">
          找到 {total} 个相关结果
        </div>
      )}

      {/* 搜索结果列表 */}
      <div className="px-4 py-4">
        {loading && currentPage === 1 ? (
          <div className="flex justify-center py-8">
            <div className="text-gray-500">搜索中...</div>
          </div>
        ) : searchResults.length === 0 && !loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-gray-400 text-lg mb-2">未找到相关内容</div>
            <div className="text-gray-400 text-sm">试试其他关键词吧</div>
          </div>
        ) : (
          <div className="space-y-4">
            {searchResults.map((item, index) => {
              const imageUrls = parseImageUrls(item.imageUrls);
              console.log(item);
              return (
                <div
                  key={`${item.id}-${index}`}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                  onClick={() => navigate(`/detail/${item.id}`)}
                >
                  {/* 内容区域 */}
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                      {item.description}
                    </p>

                    {/* 图片展示 */}
                    {imageUrls.length > 0 && (
                      <div className="mb-3">
                        {imageUrls.length === 1 ? (
                          <img
                            src={imageUrls[0]}
                            alt=""
                            className="w-full h-48 object-cover rounded-lg"
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        ) : (
                          <div className="grid grid-cols-3 gap-2">
                            {imageUrls.slice(0, 3).map((url, imgIndex) => (
                              <img
                                key={imgIndex}
                                src={url}
                                alt=""
                                className="w-full h-24 object-cover rounded-lg"
                                onError={(e) => {
                                  e.target.style.display = "none";
                                }}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* 底部信息 */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{item.likeCount}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{item.commentCount}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>{formatTime(item.createTime)}</span>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* 加载更多 */}
            {hasMore && !loading && (
              <div className="flex justify-center py-4">
                <button
                  onClick={loadMore}
                  className="px-6 py-2 text-primary border border-primary rounded-full hover:bg-primary hover:text-white transition-colors"
                >
                  加载更多
                </button>
              </div>
            )}

            {/* 加载中 */}
            {loading && currentPage > 1 && (
              <div className="flex justify-center py-4">
                <div className="text-gray-500">加载中...</div>
              </div>
            )}

            {/* 没有更多 */}
            {!hasMore && searchResults.length > 0 && (
              <div className="flex justify-center py-4">
                <div className="text-gray-400 text-sm">没有更多内容了</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
