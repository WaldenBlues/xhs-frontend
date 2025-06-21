import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Heart,
  MessageCircle,
  Share,
  MoreHorizontal,
  Send,
  ChevronDown,
  ChevronUp,
  Trash2,
  X,
  UserPlus,
  UserCheck,
  Edit3, // 添加这个导入
} from "lucide-react";
import Header from "../components/layout/Header";
import api from "../api/apiClient.js";
import { Modal, message } from "antd";

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showActionMenu, setShowActionMenu] = useState(false);

  // 图片浏览相关状态
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageContainerRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isDragging = useRef(false);

  // 评论相关状态
  const [commentContent, setCommentContent] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreComments, setHasMoreComments] = useState(true);
  const [totalComments, setTotalComments] = useState(0);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [expandedComments, setExpandedComments] = useState({});
  const [userInfoCache, setUserInfoCache] = useState({});
  const [followLoading, setFollowLoading] = useState({}); // 关注操作加载状态
  const pageSize = 10;

  // 获取当前用户信息
  const fetchCurrentUser = async () => {
    try {
      const response = await api.get("/api/auth/user");
      if (response.data) {
        setCurrentUser(response.data);
      }
    } catch (error) {
      console.error("获取当前用户信息失败:", error);
    }
  };

  // 获取帖子详情
  const fetchPostDetail = async () => {
    if (!id) return;

    setLoading(true);
    try {
      const response = await api.get(`/api/content/${id}`);

      if (response.data && response.data.content) {
        setPost(response.data.content);
        setIsLiked(response.data.like);
        setError(null);
      } else {
        setError("帖子不存在");
      }
    } catch (error) {
      console.error("获取帖子详情失败:", error);
      setError(error.response?.data?.message || "获取帖子详情失败");
    } finally {
      setLoading(false);
    }
  };

  // 删除帖子
  const handleDeletePost = async () => {
    Modal.confirm({
      title: "删除确认",
      content: "确定要删除这篇帖子吗？删除后无法恢复。",
      okText: "删除",
      cancelText: "取消",
      okType: "danger",
      onOk: async () => {
        try {
          await api.delete(`/api/content/${id}`);
          message.success("帖子删除成功");
          navigate("/"); // 回到首页
        } catch (error) {
          console.error("删除帖子失败:", error);
          message.error("删除帖子失败");
        } finally {
          setShowActionMenu(false);
        }
      },
    });
  };

  // 在handleDeletePost函数后添加编辑帖子函数
  const handleEditPost = () => {
    navigate(`/edit?id=${id}`);
    setShowActionMenu(false);
  };

  // 显示操作菜单
  const handleMoreClick = () => {
    setShowActionMenu(true);
  };

  // 获取用户信息
  const fetchUserInfo = async (userId) => {
    if (userInfoCache[userId]) {
      return userInfoCache[userId];
    }

    try {
      const response = await api.get(`/api/auth/message/${userId}`);
      const userInfo = {
        username: response.data.username,
        avatar: response.data.avatar || "/default.png",
        follow: response.data.follow || false, // 新增关注状态
      };

      setUserInfoCache((prev) => ({
        ...prev,
        [userId]: userInfo,
      }));

      return userInfo;
    } catch (error) {
      console.error(`获取用户${userId}信息失败:`, error);
      return {
        username: `用户${userId}`,
        avatar: "/default.png",
        follow: false,
      };
    }
  };

  // 关注/取消关注用户
  const handleFollowUser = async (userId) => {
    if (followLoading[userId]) return;

    setFollowLoading((prev) => ({ ...prev, [userId]: true }));

    try {
      const userInfo = userInfoCache[userId];
      if (!userInfo) return;

      if (userInfo.follow) {
        // 取消关注
        await api.delete(`/api/follows/${userId}`);
        message.success("已取消关注");
      } else {
        // 关注
        await api.post(`/api/follows/${userId}`);
        message.success("关注成功");
      }

      // 更新缓存中的关注状态
      setUserInfoCache((prev) => ({
        ...prev,
        [userId]: {
          ...prev[userId],
          follow: !prev[userId].follow,
        },
      }));

      // 更新评论中的用户信息
      setComments((prevComments) => {
        return prevComments.map((comment) => {
          if (comment.userId === userId) {
            return {
              ...comment,
              userInfo: {
                ...comment.userInfo,
                follow: !comment.userInfo.follow,
              },
            };
          }
          if (comment.replies) {
            const updatedReplies = comment.replies.map((reply) => {
              if (reply.userId === userId) {
                return {
                  ...reply,
                  userInfo: {
                    ...reply.userInfo,
                    follow: !reply.userInfo.follow,
                  },
                };
              }
              return reply;
            });
            return { ...comment, replies: updatedReplies };
          }
          return comment;
        });
      });
    } catch (error) {
      console.error("关注操作失败:", error);
      message.error("操作失败，请稍后重试");
    } finally {
      setFollowLoading((prev) => ({ ...prev, [userId]: false }));
    }
  };

  // 点击头像跳转到用户页面
  const handleAvatarClick = (userId) => {
    if (currentUser && userId === currentUser.id) {
      // 如果是当前用户，跳转到个人资料页
      navigate("/profile");
    } else {
      // 跳转到其他用户信息页
      navigate(`/userinfo/${userId}`);
    }
  };

  // 处理评论数据，将回复归类到父评论下
  const processComments = async (rawComments) => {
    const commentMap = {};
    const topLevelComments = [];

    for (const comment of rawComments) {
      const userInfo = await fetchUserInfo(comment.userId);
      commentMap[comment.id] = {
        ...comment,
        userInfo,
        replies: [],
      };
    }

    rawComments.forEach((comment) => {
      if (comment.parentId === null) {
        topLevelComments.push(commentMap[comment.id]);
      } else {
        if (commentMap[comment.parentId]) {
          commentMap[comment.parentId].replies.push(commentMap[comment.id]);
        }
      }
    });

    return topLevelComments;
  };

  // 获取评论列表
  const fetchComments = async (page = 1, isLoadMore = false) => {
    if (!id) return;

    setCommentsLoading(true);
    try {
      const response = await api.get(`/api/content/${id}/comments`, {
        params: {
          page: page,
          size: pageSize,
        },
      });

      if (response.data) {
        const { records, total, pages } = response.data;
        const processedComments = await processComments(records);

        if (isLoadMore) {
          setComments((prev) => [...prev, ...processedComments]);
        } else {
          setComments(processedComments);
        }

        setTotalComments(total);
        setCurrentPage(page);
        setHasMoreComments(page < pages);
      }
    } catch (error) {
      console.error("获取评论失败:", error);
    } finally {
      setCommentsLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
    fetchPostDetail();
    fetchComments(1);
  }, [id]);

  // 解析图片URL数组
  const parseImageUrls = (imageUrlsStr) => {
    try {
      return JSON.parse(imageUrlsStr || "[]");
    } catch {
      return [];
    }
  };

  // 修复图片滑动处理 - 移除preventDefault
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = e.targetTouches[0].clientX;
    isDragging.current = false;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
    isDragging.current = true;
  };

  const handleTouchEnd = (e) => {
    if (!isDragging.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0 && currentImageIndex < allImages.length - 1) {
        // 向左滑动，显示下一张
        setCurrentImageIndex((prev) => prev + 1);
      } else if (distance < 0 && currentImageIndex > 0) {
        // 向右滑动，显示上一张
        setCurrentImageIndex((prev) => prev - 1);
      }
    }

    // 重置状态
    touchStartX.current = 0;
    touchEndX.current = 0;
    isDragging.current = false;
  };

  // 点击指示器切换图片
  const goToImage = (index) => {
    setCurrentImageIndex(index);
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

  // 点赞/取消点赞功能
  const handleLike = async () => {
    if (likeLoading) return;

    setLikeLoading(true);
    try {
      if (isLiked) {
        await api.delete(`/api/content/${id}/like`);
        setIsLiked(false);
        setPost((prev) => ({
          ...prev,
          likeCount: prev.likeCount - 1,
        }));
      } else {
        await api.post(`/api/content/${id}/like`);
        setIsLiked(true);
        setPost((prev) => ({
          ...prev,
          likeCount: prev.likeCount + 1,
        }));
      }
    } catch (error) {
      console.error("点赞操作失败:", error);
    } finally {
      setLikeLoading(false);
    }
  };

  // 评论点赞/取消点赞
  const handleCommentLike = async (commentId) => {
    try {
      let currentComment = null;
      let isCurrentlyLiked = false;

      for (const comment of comments) {
        if (comment.id === commentId) {
          currentComment = comment;
          isCurrentlyLiked = comment.isLiked;
          break;
        }
        if (comment.replies) {
          for (const reply of comment.replies) {
            if (reply.id === commentId) {
              currentComment = reply;
              isCurrentlyLiked = reply.isLiked;
              break;
            }
          }
        }
        if (currentComment) break;
      }

      if (!currentComment) return;

      if (isCurrentlyLiked) {
        await api.delete(`/api/content/${id}/comments/${commentId}/like`);
        setComments((prevComments) => {
          return prevComments.map((comment) => {
            if (comment.id === commentId) {
              return {
                ...comment,
                likeCount: comment.likeCount - 1,
                isLiked: false,
              };
            }
            if (comment.replies) {
              const updatedReplies = comment.replies.map((reply) => {
                if (reply.id === commentId) {
                  return {
                    ...reply,
                    likeCount: reply.likeCount - 1,
                    isLiked: false,
                  };
                }
                return reply;
              });
              return { ...comment, replies: updatedReplies };
            }
            return comment;
          });
        });
      } else {
        await api.post(`/api/content/${id}/comments/${commentId}/like`);
        setComments((prevComments) => {
          return prevComments.map((comment) => {
            if (comment.id === commentId) {
              return {
                ...comment,
                likeCount: comment.likeCount + 1,
                isLiked: true,
              };
            }
            if (comment.replies) {
              const updatedReplies = comment.replies.map((reply) => {
                if (reply.id === commentId) {
                  return {
                    ...reply,
                    likeCount: reply.likeCount + 1,
                    isLiked: true,
                  };
                }
                return reply;
              });
              return { ...comment, replies: updatedReplies };
            }
            return comment;
          });
        });
      }
    } catch (error) {
      console.error("评论点赞操作失败:", error);
    }
  };

  // 发布评论
  const handleComment = async () => {
    if (!commentContent.trim()) return;

    setCommentLoading(true);
    try {
      await api.post(`/api/content/${id}/comments`, {
        content: commentContent.trim(),
      });

      setCommentContent("");
      fetchComments(1);
      setPost((prev) => ({
        ...prev,
        commentCount: prev.commentCount + 1,
      }));
      message.success("评论发布成功");
    } catch (error) {
      console.error("发布评论失败:", error);
      message.error("发布评论失败");
    } finally {
      setCommentLoading(false);
    }
  };

  // 回复评论
  const handleReply = async (commentId) => {
    if (!replyContent.trim()) return;

    setCommentLoading(true);
    try {
      await api.post(`/api/content/${id}/comments/${commentId}/reply`, {
        content: replyContent.trim(),
      });

      setReplyContent("");
      setReplyingTo(null);
      fetchComments(1);
      setPost((prev) => ({
        ...prev,
        commentCount: prev.commentCount + 1,
      }));
      message.success("回复成功");
    } catch (error) {
      console.error("回复评论失败:", error);
      message.error("回复评论失败");
    } finally {
      setCommentLoading(false);
    }
  };

  // 加载更多评论
  const loadMoreComments = () => {
    if (!commentsLoading && hasMoreComments) {
      fetchComments(currentPage + 1, true);
    }
  };

  // 切换评论展开/收起
  const toggleCommentExpand = (commentId) => {
    setExpandedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  // 渲染评论项
  const renderComment = (comment, isReply = false) => {
    const isCurrentUserComment =
      currentUser && comment.userId === currentUser.id;

    return (
      <div
        key={comment.id}
        className={`${
          isReply
            ? "bg-gray-50 rounded-lg p-3"
            : "border-b border-gray-100 pb-4"
        }`}
      >
        <div className="flex items-start space-x-3">
          <img
            src={comment.userInfo?.avatar || "/default.png"}
            alt="用户头像"
            className={`${
              isReply ? "w-6 h-6" : "w-8 h-8"
            } rounded-full flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity`}
            onError={(e) => {
              e.target.src = "/default.png";
            }}
            onClick={() => handleAvatarClick(comment.userId)}
          />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center space-x-2">
                <div
                  className={`${
                    isReply ? "text-xs" : "text-sm"
                  } font-medium text-gray-900 cursor-pointer hover:text-primary transition-colors`}
                  onClick={() => handleAvatarClick(comment.userId)}
                >
                  {comment.userInfo?.username || `用户${comment.userId}`}
                </div>

                {/* 关注按钮 - 只对非当前用户显示 */}
                {!isCurrentUserComment && (
                  <button
                    onClick={() => handleFollowUser(comment.userId)}
                    disabled={followLoading[comment.userId]}
                    className={`flex items-center space-x-1 px-2 py-1 text-xs rounded-full transition-colors ${
                      comment.userInfo?.follow
                        ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        : "bg-primary text-white hover:bg-primary-dark"
                    } ${
                      followLoading[comment.userId]
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {followLoading[comment.userId] ? (
                      <span>...</span>
                    ) : comment.userInfo?.follow ? (
                      <>
                        <UserCheck className="w-3 h-3" />
                        <span>已关注</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-3 h-3" />
                        <span>关注</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              <div className="text-xs text-gray-400">
                {formatTime(comment.createTime)}
              </div>
            </div>

            <div
              className={`${
                isReply ? "text-xs" : "text-sm"
              } text-gray-700 mb-2`}
            >
              {comment.content}
            </div>

            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <button
                onClick={() => handleCommentLike(comment.id)}
                className={`flex items-center space-x-1 transition-colors ${
                  comment.isLiked
                    ? "text-red-500 hover:text-red-600"
                    : "text-gray-500 hover:text-red-500"
                }`}
              >
                <Heart
                  className={`w-3 h-3 ${comment.isLiked ? "fill-current" : ""}`}
                />
                <span>{comment.likeCount}</span>
              </button>

              {!isReply && (
                <button
                  onClick={() => setReplyingTo(comment.id)}
                  className="hover:text-primary transition-colors"
                >
                  回复
                </button>
              )}

              {!isReply && comment.replies && comment.replies.length > 0 && (
                <button
                  onClick={() => toggleCommentExpand(comment.id)}
                  className="flex items-center hover:text-primary transition-colors"
                >
                  {expandedComments[comment.id] ? (
                    <>
                      <ChevronUp className="w-3 h-3 mr-1" />
                      收起回复
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-3 h-3 mr-1" />
                      查看 {comment.replies.length} 条回复
                    </>
                  )}
                </button>
              )}
            </div>

            {!isReply &&
              comment.replies &&
              comment.replies.length > 0 &&
              expandedComments[comment.id] && (
                <div className="mt-3 space-y-2">
                  {comment.replies.map((reply) => renderComment(reply, true))}
                </div>
              )}

            {!isReply && replyingTo === comment.id && (
              <div className="mt-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="写下你的回复..."
                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleReply(comment.id);
                      }
                    }}
                  />
                  <button
                    onClick={() => handleReply(comment.id)}
                    disabled={commentLoading}
                    className="px-3 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
                  >
                    回复
                  </button>
                  <button
                    onClick={() => {
                      setReplyingTo(null);
                      setReplyContent("");
                    }}
                    className="px-3 py-2 text-gray-500 text-sm hover:text-gray-700 transition-colors"
                  >
                    取消
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* 固定顶部栏 */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <Header title="详情" showBack />
        </div>
        <div className="pt-14 flex items-center justify-center py-16">
          <div className="text-gray-500">加载中...</div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* 固定顶部栏 */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <Header title="详情" showBack />
        </div>
        <div className="pt-14 flex flex-col items-center justify-center py-16">
          <div className="text-gray-500 text-lg mb-2">
            {error || "帖子不存在"}
          </div>
          <div className="text-gray-400 text-sm">请检查链接是否正确</div>
        </div>
      </div>
    );
  }

  const imageUrls = parseImageUrls(post.imageUrls);
  // 合并所有图片：封面图 + 其他图片
  const allImages = [];
  if (post.coverUrl) {
    allImages.push(post.coverUrl);
  }
  allImages.push(...imageUrls);

  // 判断是否为帖子作者
  const isPostOwner = currentUser && post && currentUser.id === post.userId;

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* 固定顶部栏 */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header title="详情" showBack />
      </div>

      {/* 内容区域 - 添加顶部间距 */}
      <div className="pt-14">
        <div className="max-w-2xl mx-auto bg-white mb-[15%]">
          {/* 图片轮播区域 */}
          {allImages.length > 0 && (
            <div className="relative">
              <div
                ref={imageContainerRef}
                className="overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  className="flex transition-transform duration-300 ease-out"
                  style={{
                    transform: `translateX(-${currentImageIndex * 100}%)`,
                  }}
                >
                  {allImages.map((url, index) => (
                    <div key={index} className="w-full flex-shrink-0">
                      <img
                        src={url}
                        alt={`图片${index + 1}`}
                        className="w-full h-64 sm:h-80 object-cover select-none"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                        draggable={false}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* 图片指示器 */}
              {allImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="flex space-x-2">
                    {allImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${
                          index === currentImageIndex
                            ? "bg-white scale-125"
                            : "bg-white/50 hover:bg-white/75"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* 图片计数器 */}
              {allImages.length > 1 && (
                <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded">
                  {currentImageIndex + 1}/{allImages.length}
                </div>
              )}
            </div>
          )}

          {/* 内容区域 */}
          <div className="p-4">
            <h1 className="text-xl font-bold text-gray-900 mb-3">
              {post.title}
            </h1>

            {post.description && (
              <p className="text-gray-600 mb-4 leading-relaxed">
                {post.description}
              </p>
            )}

            <div className="text-gray-800 mb-6 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>

            <div className="text-sm text-gray-400 mb-4">
              发布于 {formatTime(post.createTime)}
            </div>

            {/* 互动按钮 */}
            <div className="flex items-center justify-between py-3 border-t border-gray-200">
              <div className="flex items-center space-x-6">
                <button
                  onClick={handleLike}
                  disabled={likeLoading}
                  className={`flex items-center space-x-1 transition-colors ${
                    isLiked
                      ? "text-red-500 hover:text-red-600"
                      : "text-gray-600 hover:text-red-500"
                  } ${likeLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <Heart
                    className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`}
                  />
                  <span className="text-sm">{post.likeCount}</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm">{post.commentCount}</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-600 hover:text-green-500 transition-colors">
                  <Share className="w-5 h-5" />
                  <span className="text-sm">分享</span>
                </button>
              </div>
              <button
                onClick={handleMoreClick}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 评论区域 */}
          <div className="border-t border-gray-200">
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-4">
                评论 ({totalComments})
              </h3>

              {comments.length === 0 && !commentsLoading ? (
                <div className="text-center py-8 text-gray-500">
                  暂无评论，快来发表第一条评论吧~
                </div>
              ) : (
                <div className="space-y-4">
                  {comments.map((comment) => renderComment(comment))}
                </div>
              )}

              {hasMoreComments && (
                <div className="flex justify-center mt-4">
                  <button
                    onClick={loadMoreComments}
                    disabled={commentsLoading}
                    className="px-4 py-2 text-sm text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors disabled:opacity-50"
                  >
                    {commentsLoading ? "加载中..." : "加载更多评论"}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 评论输入框 */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                placeholder="说点什么..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleComment();
                  }
                }}
              />
              <button
                onClick={handleComment}
                disabled={commentLoading || !commentContent.trim()}
                className="p-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 底部操作菜单 */}
      {showActionMenu && (
        <>
          {/* 背景遮罩 */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowActionMenu(false)}
          />

          {/* 菜单内容 */}
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-lg z-50 animate-slide-up">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="text-lg font-semibold">操作</div>
                <button
                  onClick={() => setShowActionMenu(false)}
                  className="p-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                {isPostOwner && (
                  <>
                    <button
                      onClick={handleEditPost}
                      className="w-full flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <Edit3 className="w-5 h-5 mr-3" />
                      修改帖子
                    </button>
                    <button
                      onClick={handleDeletePost}
                      className="w-full flex items-center px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5 mr-3" />
                      删除帖子
                    </button>
                  </>
                )}

                <button
                  onClick={() => setShowActionMenu(false)}
                  className="w-full flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  举报
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default DetailPage;
