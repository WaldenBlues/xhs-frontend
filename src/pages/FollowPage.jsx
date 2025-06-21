import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Search } from "lucide-react";
import MasonryLayout from "../components/post/MasonryLayout";
import PostCard from "../components/post/PostCard";
import SideMenu from "../components/layout/SideMenu";
import api from "../api/apiClient.js";

const FollowPage = () => {
  const [posts, setPosts] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("follow");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loadError, setLoadError] = useState(false); // 新增：加载错误状态
  const navigate = useNavigate();

  // 获取关注的人的帖子
  const fetchFollowPosts = useCallback(
    async (pageNum = 1, isLoadMore = false) => {
      // 如果正在加载、没有更多数据、或者之前加载失败，则不继续加载
      if (loading || (!isLoadMore && loadError)) return;

      // 如果是加载更多但没有更多数据，直接返回
      if (isLoadMore && !hasMore) return;

      setLoading(true);
      setLoadError(false); // 重置错误状态

      try {
        const response = await api.get("/api/recommend/follow", {
          params: {
            page: pageNum,
            size: 20,
          },
        });

        console.log("获取关注内容成功:", response.data);

        if (response.data && response.data.contents) {
          const contents = response.data.contents;
          const newPosts = contents.map((content) => ({
            id: content.id,
            imageUrl: content.coverUrl,
            title: content.title,
            description: content.description,
            content: content.content,
            type: content.type,
            coverUrl: content.coverUrl,
            imageUrls: content.imageUrls,
            videoUrl: content.videoUrl,
            likes: content.likeCount,
            likeCount: content.likeCount,
            commentCount: content.commentCount,
            status: content.status,
            createTime: content.createTime,
            updateTime: content.updateTime,
            user: {
              id: content.userId,
              avatar: "",
              name: `用户${content.userId}`,
            },
          }));

          if (isLoadMore) {
            setPosts((prev) => [...prev, ...newPosts]);
          } else {
            setPosts(newPosts);
          }

          // 检查是否还有更多数据
          setHasMore(contents.length === 20);
          setPage(pageNum);
        } else {
          // 如果响应数据格式不正确，设置为没有更多数据
          setHasMore(false);
          if (!isLoadMore) {
            setPosts([]);
          }
        }
      } catch (error) {
        console.error("获取关注内容失败:", error);
        setLoadError(true); // 设置错误状态
        setHasMore(false); // 加载失败时停止后续加载

        if (!isLoadMore) {
          setPosts([]); // 首页加载失败时清空列表
        }
      } finally {
        setLoading(false);
      }
    },
    [loading, hasMore, loadError] // 依赖项中移除loading，避免无限循环
  );

  // 滚动到底部加载更多
  const handleScroll = useCallback(() => {
    // 严格的加载条件检查
    if (loading || !hasMore || loadError || posts.length === 0) return;

    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight =
      document.documentElement.clientHeight || window.innerHeight;

    // 当滚动到距离底部100px时开始加载
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      fetchFollowPosts(page + 1, true);
    }
  }, [loading, hasMore, page, loadError, posts.length, fetchFollowPosts]);

  useEffect(() => {
    // 检查登录状态
    if (!window.localStorage.getItem("Authorization")) {
      navigate("/login");
      return;
    }

    // 初始加载
    fetchFollowPosts(1);
  }, [navigate]); // 移除fetchFollowPosts依赖，避免无限循环

  useEffect(() => {
    // 添加滚动监听
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

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

  // 重试加载函数
  const handleRetry = () => {
    setLoadError(false);
    setHasMore(true);
    fetchFollowPosts(1);
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
        {/* 首次加载失败的错误状态 */}
        {loadError && posts.length === 0 && !loading ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-500">
            <div className="text-lg mb-2">加载失败</div>
            <div className="text-sm text-gray-400 mb-4">网络连接出现问题</div>
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              重试
            </button>
          </div>
        ) : posts.length === 0 && !loading ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-500">
            <div className="text-lg mb-2">暂无关注的内容</div>
            <div className="text-sm text-gray-400">快去关注一些有趣的人吧~</div>
          </div>
        ) : (
          <MasonryLayout>
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onClick={() => navigate(`/detail/${post.id}`)}
              />
            ))}
          </MasonryLayout>
        )}

        {/* 加载状态 */}
        {loading && (
          <div className="flex justify-center py-8">
            <div className="text-gray-500">加载中...</div>
          </div>
        )}

        {/* 分页加载失败提示 */}
        {loadError && posts.length > 0 && !loading && (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="text-gray-500 text-sm mb-2">加载失败</div>
            <button
              onClick={() => {
                setLoadError(false);
                setHasMore(true);
                fetchFollowPosts(page + 1, true);
              }}
              className="px-3 py-1 text-sm bg-primary text-white rounded hover:bg-primary-dark transition-colors"
            >
              重试
            </button>
          </div>
        )}

        {/* 没有更多数据提示 */}
        {!hasMore && !loadError && posts.length > 0 && (
          <div className="flex justify-center py-8">
            <div className="text-gray-400 text-sm">没有更多内容了</div>
          </div>
        )}
      </div>

      {/* 侧边菜单 */}
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
};

export default FollowPage;
