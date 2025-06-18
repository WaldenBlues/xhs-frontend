#!/bin/bash

echo "📁 创建目录结构..."
mkdir -p \
  public \
  src/api \
  src/assets/images \
  src/assets/fonts \
  src/components/common \
  src/components/layout \
  src/components/post \
  src/contexts \
  src/hooks \
  src/pages \
  src/routes \
  src/utils

echo "📄 创建配置与占位文件..."
touch .env .gitignore .eslintrc.cjs tailwind.config.js postcss.config.js

echo "📄 创建 src 文件..."
touch \
  src/api/apiClient.js \
  src/api/authApi.js \
  src/api/postsApi.js \
  src/components/common/Button.jsx \
  src/components/common/Input.jsx \
  src/components/common/Spinner.jsx \
  src/components/common/Modal.jsx \
  src/components/layout/Header.jsx \
  src/components/layout/BottomNav.jsx \
  src/components/layout/PageWrapper.jsx \
  src/components/post/PostCard.jsx \
  src/components/post/MasonryLayout.jsx \
  src/components/post/Comment.jsx \
  src/components/post/CommentList.jsx \
  src/contexts/AuthContext.jsx \
  src/hooks/useAuth.js \
  src/hooks/useApi.js \
  src/hooks/useInfiniteScroll.js \
  src/pages/HomePage.jsx \
  src/pages/DetailPage.jsx \
  src/pages/LoginPage.jsx \
  src/pages/PostPage.jsx \
  src/pages/ProfilePage.jsx \
  src/pages/NotFoundPage.jsx \
  src/routes/ProtectedRoute.jsx \
  src/routes/index.jsx \
  src/utils/dateFormatter.js \
  src/utils/validators.js

echo "✅ 如果你已有 App.jsx / main.jsx / index.css，会自动保留。"

# 若这些文件不存在则创建
[[ -f src/App.jsx ]] || touch src/App.jsx
[[ -f src/main.jsx ]] || touch src/main.jsx
[[ -f src/index.css ]] || touch src/index.css

echo "�� 创建 public/index.html 与 favicon.ico 占位..."
touch public/index.html public/favicon.ico

echo "📦 初始化 package.json（如已存在可跳过）..."
if [ ! -f package.json ]; then
  npm init -y
fi

echo "✅ 所有结构文件创建完毕！"

