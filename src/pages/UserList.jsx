import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Users, UserCheck } from "lucide-react";
import api from "../api/apiClient.js";
import { message } from "antd";

const FollowListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
    currentPage: 1,
    pageSize: 10,
  });

  // 判断当前页面类型
  const isFansPage = location.pathname === "/myfans";
  const pageTitle = isFansPage ? "我的粉丝" : "我的关注";

  // 获取当前用户信息
  const fetchCurrentUser = async () => {
    try {
      const response = await api.get("/api/auth/user");
      if (response.data) {
        setCurrentUser(response.data);
        return response.data;
      }
    } catch (error) {
      console.error("获取当前用户信息失败:", error);
      message.error("获取用户信息失败");
      return null;
    }
  };

  // 获取粉丝列表
  const fetchFansList = async (userId, page = 1) => {
    setLoading(true);
    try {
      const response = await api.get(`/api/follows/user/${userId}/followers`, {
        params: {
          page: page,
          size: pagination.pageSize,
        },
      });

      console.log("获取粉丝列表成功:", response.data);

      if (response.data) {
        const { total, totalPages, currentPage, pageSize, list } =
          response.data;
        setUsers(list || []);
        setPagination({
          total,
          totalPages,
          currentPage,
          pageSize,
        });
      }
    } catch (error) {
      console.error("获取粉丝列表失败:", error);
      message.error("获取粉丝列表失败");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // 获取关注列表（暂时留空）
  const fetchFollowingList = async (userId, page = 1) => {
    setLoading(true);
    try {
      // TODO: 实现获取关注列表的API调用
      // const response = await api.get(`/api/follows/user/${userId}/following`, {
      //   params: {
      //     page: page,
      //     size: pagination.pageSize,
      //   },
      // });

      // 暂时设置空数据
      setUsers([]);
      setPagination({
        total: 0,
        totalPages: 0,
        currentPage: 1,
        pageSize: 10,
      });

      //   message.info("关注列表功能暂未实现");
    } catch (error) {
      console.error("获取关注列表失败:", error);
      message.error("获取关注列表失败");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // 加载数据
  const loadData = async (page = 1) => {
    const user = await fetchCurrentUser();
    if (!user) return;

    if (isFansPage) {
      await fetchFansList(user.id, page);
    } else {
      await fetchFollowingList(user.id, page);
    }
  };

  // 处理页码变化
  const handlePageChange = (page) => {
    loadData(page);
  };

  // 跳转到用户详情页
  const handleUserClick = (userId) => {
    navigate(`/userinfo/${userId}`);
  };

  // 返回上一页
  const handleGoBack = () => {
    window.history.back();
  };

  useEffect(() => {
    loadData(1);
  }, [location.pathname]); // 当路径变化时重新加载数据

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 h-14">
          <button onClick={handleGoBack} className="p-2">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="font-medium">{pageTitle}</div>
          <div className="w-10"></div> {/* 占位符保持居中 */}
        </div>
      </div>

      {/* 内容区域 */}
      <div className="max-w-2xl mx-auto bg-white">
        {/* 统计信息 */}
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex items-center text-gray-600">
            {isFansPage ? (
              <Users className="w-5 h-5 mr-2" />
            ) : (
              <UserCheck className="w-5 h-5 mr-2" />
            )}
            <span className="text-sm">
              共 {pagination.total} 个{isFansPage ? "粉丝" : "关注"}
            </span>
          </div>
        </div>

        {/* 用户列表 */}
        <div className="divide-y divide-gray-100">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="text-gray-500">加载中...</div>
            </div>
          ) : users.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-500">
              {isFansPage ? (
                <Users className="w-16 h-16 text-gray-300 mb-4" />
              ) : (
                <UserCheck className="w-16 h-16 text-gray-300 mb-4" />
              )}
              <div className="text-lg mb-2">
                {isFansPage ? "还没有粉丝" : "还没有关注任何人"}
              </div>
              <div className="text-sm text-gray-400">
                {isFansPage
                  ? "多发布优质内容吸引粉丝吧~"
                  : "快去关注一些有趣的人吧~"}
              </div>
            </div>
          ) : (
            users.map((user) => (
              <div
                key={user.id}
                className="px-4 py-4 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => handleUserClick(user.id)}
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={user.avatar || "/default.png"}
                    alt={user.username}
                    className="w-12 h-12 rounded-full object-cover border border-gray-200"
                    onError={(e) => {
                      e.target.src = "/default.png";
                    }}
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">
                      {user.username}
                    </div>
                    <div className="text-sm text-gray-500">
                      用户ID: {user.id}
                    </div>
                  </div>
                  <div className="text-gray-400">
                    <ArrowLeft className="w-5 h-5 rotate-180" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 分页组件 */}
        {!loading && users.length > 0 && pagination.totalPages > 1 && (
          <div className="px-4 py-6 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                第 {pagination.currentPage} 页，共 {pagination.totalPages} 页
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage <= 1}
                  className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  上一页
                </button>

                {/* 页码按钮 */}
                <div className="flex items-center space-x-1">
                  {Array.from(
                    { length: Math.min(5, pagination.totalPages) },
                    (_, i) => {
                      let pageNum;
                      if (pagination.totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (pagination.currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (
                        pagination.currentPage >=
                        pagination.totalPages - 2
                      ) {
                        pageNum = pagination.totalPages - 4 + i;
                      } else {
                        pageNum = pagination.currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`px-3 py-1 text-sm border rounded transition-colors ${
                            pageNum === pagination.currentPage
                              ? "bg-primary text-white border-primary"
                              : "border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    }
                  )}
                </div>

                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage >= pagination.totalPages}
                  className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  下一页
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowListPage;
