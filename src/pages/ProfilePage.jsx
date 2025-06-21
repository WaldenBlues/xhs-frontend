import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Menu, Share2, FileText, ArrowLeft, Camera } from "lucide-react";
import MasonryLayout from "../components/post/MasonryLayout";
import PostCard from "../components/post/PostCard";
import api from "../api/apiClient.js";
import { message } from "antd";

const ProfilePage = () => {
  const { id } = useParams(); // 从路由参数获取用户ID
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    followingCount: 0,
    followersCount: 0,
  });
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [postsLoading, setPostsLoading] = useState(false);
  const [avatarUploading, setAvatarUploading] = useState(false); // 头像上传状态
  const fileInputRef = useRef(null); // 文件输入引用

  // 判断是否为当前用户的个人资料页
  const isCurrentUserProfile = !id; // 如果没有id参数，则为当前用户页面

  // 获取当前用户信息
  const fetchCurrentUserInfo = async () => {
    try {
      const response = await api.get("/api/auth/user");
      if (response.data) {
        setUser(response.data);
        // 获取用户统计数据
        fetchUserStats(response.data.id);
      }
    } catch (error) {
      console.error("获取当前用户信息失败:", error);
      setError("获取用户信息失败");
    }
  };

  // 获取指定用户信息
  const fetchUserInfo = async (userId) => {
    try {
      const response = await api.get(`/api/auth/message/${userId}`);
      if (response.data) {
        setUser(response.data);
        // 不获取其他用户的统计数据
      }
    } catch (error) {
      console.error("获取用户信息失败:", error);
      setError("获取用户信息失败");
    }
  };

  // 获取用户关注和粉丝统计
  const fetchUserStats = async (userId) => {
    try {
      const response = await api.get(`/api/follows/stats/${userId}`);
      if (response.data) {
        setStats(response.data);
      }
    } catch (error) {
      console.error("获取统计数据失败:", error);
    }
  };

  // 获取当前用户发布的笔记
  const fetchCurrentUserPosts = async () => {
    setPostsLoading(true);
    try {
      const response = await api.get("/api/content/my");
      if (response.data && response.data.records) {
        // 将API返回的数据格式转换为PostCard需要的格式
        const formattedPosts = response.data.records.map((content) => ({
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
            avatar: user?.avatar || "",
            name: user?.username || `用户${content.userId}`,
          },
        }));
        setPosts(formattedPosts);
      } else {
        setPosts([]);
      }
    } catch (error) {
      console.error("获取用户笔记失败:", error);
      setPosts([]);
    } finally {
      setPostsLoading(false);
    }
  };

  // 获取指定用户发布的笔记
  const fetchUserPosts = async (userId) => {
    setPostsLoading(true);
    try {
      const response = await api.get("/api/content/seeHome", {
        params: {
          homeUserId: userId,
        },
      });

      console.log("获取指定用户笔记成功:", response.data);

      if (response.data && response.data.records) {
        // 将API返回的数据格式转换为PostCard需要的格式
        const formattedPosts = response.data.records.map((content) => ({
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
            avatar: user?.avatar || "",
            name: user?.username || `用户${content.userId}`,
          },
        }));
        setPosts(formattedPosts);
      } else if (response.data && Array.isArray(response.data)) {
        // 如果直接返回数组格式
        const formattedPosts = response.data.map((content) => ({
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
            avatar: user?.avatar || "",
            name: user?.username || `用户${content.userId}`,
          },
        }));
        setPosts(formattedPosts);
      } else {
        setPosts([]);
      }
    } catch (error) {
      console.error("获取用户笔记失败:", error);
      setPosts([]);
    } finally {
      setPostsLoading(false);
    }
  };

  // 上传图片到服务器
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "AVATAR"); // 头像类型

    try {
      const response = await api.post("/api/files/upload/images", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data && response.data.fileUrl) {
        return response.data.fileUrl;
      } else {
        throw new Error("上传响应格式错误");
      }
    } catch (error) {
      console.error("图片上传失败:", error);
      message.error(
        "图片上传失败: " + (error.response?.data?.message || error.message)
      );
      throw error;
    }
  };

  // 更新用户头像
  const updateUserAvatar = async (avatarUrl) => {
    try {
      // 构建完整的头像URL
      const fullAvatarUrl = api.defaults.baseURL + avatarUrl;

      await api.put("/api/auth/user/avatar", {
        avatarUrl: fullAvatarUrl,
      });

      // 更新本地用户信息 - 使用完整的URL
      setUser((prev) => ({
        ...prev,
        avatar: fullAvatarUrl, // 使用完整URL确保图片能正确显示
      }));

      message.success("头像更新成功");
    } catch (error) {
      console.error("头像更新失败:", error);
      message.error(
        "头像更新失败: " + (error.response?.data?.message || error.message)
      );
      throw error;
    }
  };

  // 处理头像点击
  const handleAvatarClick = () => {
    if (isCurrentUserProfile && !avatarUploading) {
      fileInputRef.current?.click();
    }
  };

  // 处理文件选择
  const handleFileSelect = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 验证文件类型
    if (!file.type.startsWith("image/")) {
      message.error("请选择图片文件");
      return;
    }

    // 验证文件大小 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      message.error("图片大小不能超过5MB");
      return;
    }

    setAvatarUploading(true);

    try {
      // 1. 先上传图片
      const imageUrl = await uploadImage(file);

      // 2. 更新用户头像
      await updateUserAvatar(imageUrl);
    } catch (error) {
      // 错误已在相应函数中处理
    } finally {
      setAvatarUploading(false);
      // 清空文件输入
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        if (isCurrentUserProfile) {
          // 当前用户个人资料页
          await fetchCurrentUserInfo();
          await fetchCurrentUserPosts();
        } else {
          // 其他用户信息页
          await fetchUserInfo(id);
          await fetchUserPosts(id);
        }
      } catch (error) {
        console.error("加载数据失败:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, isCurrentUserProfile]);

  // 当用户信息加载完成后，重新获取帖子以更新用户信息
  useEffect(() => {
    if (user && posts.length > 0 && isCurrentUserProfile) {
      // 只有当前用户页面才更新帖子中的用户信息
      const updatedPosts = posts.map((post) => ({
        ...post,
        user: {
          ...post.user,
          avatar: user.avatar || "",
          name: user.username || `用户${post.user.id}`,
        },
      }));
      setPosts(updatedPosts);
    }
  }, [user, isCurrentUserProfile]);

  const handleGoBack = () => {
    window.history.back();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex items-center justify-center py-16">
          <div className="text-gray-500">加载中...</div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex flex-col items-center justify-center py-16">
          <div className="text-gray-500 text-lg mb-2">
            {error || "用户信息加载失败"}
          </div>
          <button
            onClick={() => window.location.reload()}
            className="text-primary hover:text-primary-dark"
          >
            重新加载
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 h-14">
          {isCurrentUserProfile ? (
            <button className="p-2">
              <Menu className="w-6 h-6" />
            </button>
          ) : (
            <button onClick={handleGoBack} className="p-2">
              <ArrowLeft className="w-6 h-6" />
            </button>
          )}
          <div className="font-medium">
            {isCurrentUserProfile ? "我的资料" : user.username}
          </div>
          <button className="p-2">
            <Share2 className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* 个人信息区域 */}
      <div className="px-4 py-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={user.avatar || "/default.png"}
              alt={user.username}
              className={`w-20 h-20 rounded-full object-cover border-2 border-gray-200 ${
                isCurrentUserProfile
                  ? "cursor-pointer hover:opacity-80 transition-opacity"
                  : ""
              } ${avatarUploading ? "opacity-50" : ""}`}
              onError={(e) => {
                e.target.src = "/default.png";
              }}
              onClick={handleAvatarClick}
            />

            {/* 当前用户页面显示相机图标 */}
            {isCurrentUserProfile && (
              <div
                className="absolute bottom-0 right-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary-dark transition-colors shadow-md"
                onClick={handleAvatarClick}
              >
                <Camera className="w-3 h-3 text-white" />
              </div>
            )}

            {/* 上传中的加载指示器 */}
            {avatarUploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-full">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          <div className="flex-1">
            <h1 className="text-xl font-semibold">{user.username}</h1>
            {isCurrentUserProfile && user.email && (
              <p className="text-gray-500 text-sm">邮箱：{user.email}</p>
            )}
          </div>
        </div>

        {/* 统计数据 - 只在当前用户页面显示 */}
        {isCurrentUserProfile && (
          <div className="flex justify-around mt-6 py-4 border-t border-b border-gray-100">
            <div
              className="text-center"
              onClick={() => {
                navigate("/myfollow");
              }}
            >
              <div className="text-lg font-semibold">
                {stats.followingCount}
              </div>
              <div className="text-gray-500 text-sm">关注</div>
            </div>
            <div
              className="text-center"
              onClick={() => {
                navigate("/myfans");
              }}
            >
              <div className="text-lg font-semibold">
                {stats.followersCount}
              </div>
              <div className="text-gray-500 text-sm">粉丝</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold">{posts.length}</div>
              <div className="text-gray-500 text-sm">笔记</div>
            </div>
          </div>
        )}

        {/* 其他用户页面的简单分隔线 */}
        {!isCurrentUserProfile && (
          <div className="mt-6 border-b border-gray-100"></div>
        )}
      </div>

      {/* 发布的帖子 */}
      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            {isCurrentUserProfile ? "发布的笔记" : "TA的笔记"}
          </h2>
          {postsLoading && (
            <div className="text-sm text-gray-500">加载中...</div>
          )}
        </div>

        {posts.length === 0 && !postsLoading ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-500">
            <FileText className="w-16 h-16 text-gray-300 mb-4" />
            <div className="text-lg mb-2">
              {isCurrentUserProfile ? "还没有发布笔记" : "TA还没有发布笔记"}
            </div>
            <div className="text-sm text-gray-400">
              {isCurrentUserProfile ? "快去分享你的精彩生活吧~" : ""}
            </div>
          </div>
        ) : (
          <MasonryLayout>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </MasonryLayout>
        )}
      </div>

      {/* 隐藏的文件输入 */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

export default ProfilePage;
