import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  Image as ImageIcon,
  X,
  Plus,
  Upload,
  FileText,
  Save,
  Send,
  Edit3,
} from "lucide-react";
import api from "../api/apiClient.js";
import { message } from "antd";

const PublishPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("id"); // 获取查询参数中的id
  const fileInputRef = useRef(null);
  const coverInputRef = useRef(null);

  // 表单数据
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    coverUrl: "",
    imageUrls: [],
  });

  // 页面状态
  const [loading, setLoading] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [activeTab, setActiveTab] = useState("edit"); // edit | draft
  const [drafts, setDrafts] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false); // 是否为编辑模式
  const [originalPost, setOriginalPost] = useState(null); // 原始帖子数据

  // 从localStorage获取草稿列表
  const loadDraftsFromStorage = () => {
    try {
      const storedDrafts = localStorage.getItem("contentDrafts");
      if (storedDrafts) {
        const parsedDrafts = JSON.parse(storedDrafts);
        setDrafts(parsedDrafts);
      } else {
        setDrafts([]);
      }
    } catch (error) {
      console.error("加载草稿失败:", error);
      setDrafts([]);
    }
  };

  // 获取要编辑的帖子信息
  const fetchPostForEdit = async (postId) => {
    setLoading(true);
    try {
      const response = await api.get(`/api/content/${postId}`);

      if (response.data && response.data.content) {
        const post = response.data.content;
        setOriginalPost(post);
        setIsEditMode(true);

        // 解析图片URLs
        let imageUrls = [];
        try {
          if (post.imageUrls) {
            imageUrls = JSON.parse(post.imageUrls);
          }
        } catch (error) {
          console.error("解析图片URLs失败:", error);
          imageUrls = [];
        }

        // 填入表单数据
        setFormData({
          title: post.title || "",
          description: post.description || "",
          content: post.content || "",
          coverUrl: post.coverUrl || "",
          imageUrls: imageUrls || [],
        });

        message.success("帖子信息加载成功");
      } else {
        message.error("帖子不存在或已被删除");
        navigate(-1);
      }
    } catch (error) {
      console.error("获取帖子信息失败:", error);
      message.error(
        "获取帖子信息失败: " + (error.response?.data?.message || error.message)
      );
      navigate(-1);
    } finally {
      setLoading(false);
    }
  };

  // 保存草稿到localStorage
  const saveDraftToStorage = (draftData) => {
    try {
      const existingDrafts = JSON.parse(
        localStorage.getItem("contentDrafts") || "[]"
      );

      // 生成草稿ID（时间戳）
      const draftId = Date.now();
      const newDraft = {
        id: draftId,
        ...draftData,
        updateTime: new Date().toISOString(),
      };

      // 检查是否已存在相同标题的草稿，如果存在则更新
      const existingIndex = existingDrafts.findIndex(
        (draft) => draft.title === draftData.title
      );

      if (existingIndex !== -1) {
        // 更新现有草稿
        existingDrafts[existingIndex] = {
          ...existingDrafts[existingIndex],
          ...draftData,
          updateTime: new Date().toISOString(),
        };
      } else {
        // 添加新草稿
        existingDrafts.unshift(newDraft); // 新草稿添加到顶部
      }

      // 限制草稿数量（最多保存20个）
      if (existingDrafts.length > 20) {
        existingDrafts.splice(20);
      }

      localStorage.setItem("contentDrafts", JSON.stringify(existingDrafts));
      setDrafts(existingDrafts);

      return true;
    } catch (error) {
      console.error("保存草稿失败:", error);
      return false;
    }
  };

  // 删除草稿
  const deleteDraft = (draftId) => {
    try {
      const existingDrafts = JSON.parse(
        localStorage.getItem("contentDrafts") || "[]"
      );
      const updatedDrafts = existingDrafts.filter(
        (draft) => draft.id !== draftId
      );

      localStorage.setItem("contentDrafts", JSON.stringify(updatedDrafts));
      setDrafts(updatedDrafts);
    } catch (error) {
      console.error("删除草稿失败:", error);
    }
  };

  // 组件加载时处理
  useEffect(() => {
    loadDraftsFromStorage();

    // 如果有id参数，则进入编辑模式
    if (editId) {
      fetchPostForEdit(editId);
    }
  }, [editId]);

  // 更新表单数据
  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 上传图片
  const uploadImage = async (file, type = "CONTENT") => {
    const formDataToSend = new FormData();
    formDataToSend.append("file", file);
    formDataToSend.append("type", type);

    try {
      const response = await api.post(
        "/api/files/upload/images",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // 根据实际响应格式处理
      if (response.data && response.data.fileUrl) {
        // 获取API的baseURL
        const baseURL = api.defaults.baseURL || window.location.origin;
        // 拼接完整的图片URL
        const fullUrl = response.data.fileUrl.startsWith("http")
          ? response.data.fileUrl
          : `${baseURL}${response.data.fileUrl}`;
        return fullUrl;
      } else if (response.data.success && response.data.data.url) {
        // 兼容原来的格式
        return response.data.data.url;
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

  // 处理封面上传
  const handleCoverUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 验证文件类型
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      message.error("请选择 jpg、jpeg、png 或 gif 格式的图片");
      return;
    }

    // 验证文件大小 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      message.error("图片大小不能超过 5MB");
      return;
    }

    setUploadingCover(true);
    try {
      const url = await uploadImage(file, "COVER");
      updateFormData("coverUrl", url);
    } catch (error) {
      // 错误已在uploadImage中处理
    } finally {
      setUploadingCover(false);
    }
  };

  // 处理内容图片上传
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // 验证文件数量
    if (formData.imageUrls.length + files.length > 9) {
      message.error("最多只能上传 9 张图片");
      return;
    }

    setUploadingImages(true);
    try {
      const uploadPromises = files.map((file) => {
        // 验证文件类型
        const allowedTypes = [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/gif",
        ];
        if (!allowedTypes.includes(file.type)) {
          throw new Error(`文件 ${file.name} 格式不支持`);
        }

        // 验证文件大小
        if (file.size > 5 * 1024 * 1024) {
          throw new Error(`文件 ${file.name} 大小超过 5MB`);
        }

        return uploadImage(file, "CONTENT");
      });

      const urls = await Promise.all(uploadPromises);
      updateFormData("imageUrls", [...formData.imageUrls, ...urls]);
    } catch (error) {
      // 错误已在uploadImage中处理
    } finally {
      setUploadingImages(false);
    }
  };

  // 删除图片
  const removeImage = (index) => {
    const newUrls = formData.imageUrls.filter((_, i) => i !== index);
    updateFormData("imageUrls", newUrls);
  };

  // 删除封面
  const removeCover = () => {
    updateFormData("coverUrl", "");
  };

  // 选择草稿
  const selectDraft = (draft) => {
    setFormData({
      title: draft.title,
      description: draft.description,
      content: draft.content,
      coverUrl: draft.coverUrl || "",
      imageUrls: draft.imageUrls || [],
    });
    setActiveTab("edit");
    message.success("草稿已加载到编辑器");
  };

  // 保存草稿
  const saveDraft = async () => {
    if (!formData.title.trim()) {
      message.warning("请输入标题");
      return;
    }

    // 编辑模式下不允许保存草稿
    if (isEditMode) {
      message.warning("编辑模式下不支持保存草稿");
      return;
    }

    setLoading(true);
    try {
      const success = saveDraftToStorage(formData);
      if (success) {
        message.success("草稿保存成功");
      } else {
        message.error("草稿保存失败");
      }
    } catch (error) {
      console.error("保存草稿失败:", error);
      message.error("保存草稿失败");
    } finally {
      setLoading(false);
    }
  };

  // 发布内容
  const publishContent = async () => {
    // 验证必填字段
    if (!formData.title.trim()) {
      message.error("请输入标题");
      return;
    }
    if (!formData.description.trim()) {
      message.error("请输入描述");
      return;
    }
    if (!formData.content.trim()) {
      message.error("请输入内容");
      return;
    }

    setLoading(true);
    try {
      const publishData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        content: formData.content.trim(),
        type: 1,
        coverUrl: formData.coverUrl,
        imageUrls: JSON.stringify(formData.imageUrls),
        status: 1,
      };

      let response;
      if (isEditMode && originalPost) {
        // 编辑模式：更新帖子
        response = await api.put(
          `/api/content/${originalPost.id}`,
          publishData
        );
        message.success("更新成功！");
      } else {
        // 创建模式：发布新帖子
        response = await api.post("/api/content", publishData);
        message.success("发布成功！");
      }

      // 根据实际响应格式处理
      if (response.data && (response.data.id || response.data.success)) {
        navigate("/");
      } else {
        throw new Error(response.data.message || "操作失败");
      }
    } catch (error) {
      console.error("操作失败:", error);
      const action = isEditMode ? "更新" : "发布";
      message.error(
        `${action}失败: ` + (error.response?.data?.message || error.message)
      );
    } finally {
      setLoading(false);
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
      return hours === 0 ? "刚刚" : `${hours}小时前`;
    } else if (days < 7) {
      return `${days}天前`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div className="ml-2 flex items-center">
              {isEditMode && <Edit3 className="w-5 h-5 text-gray-600 mr-2" />}
              <h1 className="font-medium text-gray-900">
                {isEditMode ? "编辑内容" : "发布内容"}
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {!isEditMode && (
              <button
                onClick={saveDraft}
                disabled={loading}
                className="flex items-center px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                <Save className="w-4 h-4 mr-1" />
                存草稿
              </button>
            )}
            <button
              onClick={publishContent}
              disabled={loading}
              className="flex items-center px-4 py-1.5 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50"
            >
              <Send className="w-4 h-4 mr-1" />
              {loading
                ? isEditMode
                  ? "更新中..."
                  : "发布中..."
                : isEditMode
                ? "更新"
                : "发布"}
            </button>
          </div>
        </div>
      </div>

      {/* 标签页切换 - 编辑模式下隐藏草稿选择 */}
      {!isEditMode && (
        <div className="bg-white border-b border-gray-200">
          <div className="flex px-4">
            <button
              onClick={() => setActiveTab("edit")}
              className={`flex-1 py-3 text-center text-sm font-medium border-b-2 transition-colors ${
                activeTab === "edit"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              编辑内容
            </button>
            <button
              onClick={() => setActiveTab("draft")}
              className={`flex-1 py-3 text-center text-sm font-medium border-b-2 transition-colors ${
                activeTab === "draft"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              选择草稿
            </button>
          </div>
        </div>
      )}

      {/* 内容区域 */}
      <div className="p-4">
        {isEditMode || activeTab === "edit" ? (
          <div className="space-y-6">
            {/* 编辑模式提示 */}
            {isEditMode && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-center">
                  <Edit3 className="w-5 h-5 text-blue-600 mr-2" />
                  <div className="text-blue-800">
                    <div className="font-medium">编辑模式</div>
                    <div className="text-sm">
                      正在编辑帖子：{originalPost?.title}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 标题 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                标题 *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => updateFormData("title", e.target.value)}
                placeholder="输入标题..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                maxLength={100}
              />
              <div className="text-xs text-gray-400 mt-1">
                {formData.title.length}/100
              </div>
            </div>

            {/* 描述 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                描述 *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => updateFormData("description", e.target.value)}
                placeholder="输入描述..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                maxLength={200}
              />
              <div className="text-xs text-gray-400 mt-1">
                {formData.description.length}/200
              </div>
            </div>

            {/* 封面图片 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                封面图片
              </label>
              {formData.coverUrl ? (
                <div className="relative inline-block">
                  <img
                    src={formData.coverUrl}
                    alt="封面"
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <button
                    onClick={removeCover}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => coverInputRef.current?.click()}
                  disabled={uploadingCover}
                  className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-primary hover:bg-primary/5 transition-colors disabled:opacity-50"
                >
                  {uploadingCover ? (
                    <div className="text-sm text-gray-500">上传中...</div>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-500">添加封面</span>
                    </>
                  )}
                </button>
              )}
              <input
                ref={coverInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/gif"
                onChange={handleCoverUpload}
                className="hidden"
              />
            </div>

            {/* 内容图片 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                内容图片 (最多9张)
              </label>
              <div className="grid grid-cols-3 gap-3">
                {formData.imageUrls.map((url, index) => (
                  <div key={index} className="relative">
                    <img
                      src={url}
                      alt={`内容图片${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {formData.imageUrls.length < 9 && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImages}
                    className="w-full h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-primary hover:bg-primary/5 transition-colors disabled:opacity-50"
                  >
                    {uploadingImages ? (
                      <div className="text-xs text-gray-500">上传中...</div>
                    ) : (
                      <>
                        <Plus className="w-6 h-6 text-gray-400 mb-1" />
                        <span className="text-xs text-gray-500">添加图片</span>
                      </>
                    )}
                  </button>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/gif"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {/* 内容 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                内容 *
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => updateFormData("content", e.target.value)}
                placeholder="分享你的想法..."
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                maxLength={2000}
              />
              <div className="text-xs text-gray-400 mt-1">
                {formData.content.length}/2000
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* 草稿列表 */}
            {drafts.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <div className="text-gray-500">暂无草稿</div>
                <div className="text-gray-400 text-sm mt-1">
                  编辑内容后点击"存草稿"保存
                </div>
              </div>
            ) : (
              drafts.map((draft) => (
                <div
                  key={draft.id}
                  className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-gray-900 flex-1 mr-2">
                      {draft.title}
                    </h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteDraft(draft.id);
                        message.success("草稿已删除");
                      }}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {draft.description && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {draft.description}
                    </p>
                  )}

                  {draft.content && (
                    <p className="text-gray-500 text-xs mb-3 line-clamp-1">
                      {draft.content.substring(0, 100)}...
                    </p>
                  )}

                  {/* 显示图片数量 */}
                  {(draft.coverUrl ||
                    (draft.imageUrls && draft.imageUrls.length > 0)) && (
                    <div className="flex items-center text-xs text-gray-400 mb-2">
                      <ImageIcon className="w-3 h-3 mr-1" />
                      <span>
                        {draft.coverUrl && "封面"}
                        {draft.coverUrl &&
                          draft.imageUrls &&
                          draft.imageUrls.length > 0 &&
                          " + "}
                        {draft.imageUrls &&
                          draft.imageUrls.length > 0 &&
                          `${draft.imageUrls.length}张图片`}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>更新于 {formatTime(draft.updateTime)}</span>
                    <button
                      onClick={() => selectDraft(draft)}
                      className="text-primary hover:text-primary-dark transition-colors"
                    >
                      选择此草稿
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PublishPage;
