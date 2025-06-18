// src/data/mockData.js

// 模拟的帖子数据
export const getInitialPosts = () => [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?q=80&w=1915&auto=format&fit=crop',
    title: '探索山间秘境，寻找那一片宁静',
    user: { name: '旅行爱好者', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
    likes: 128,
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723a996f6ea?id=2&q=80&w=2070&auto=format&fit=crop',
    title: '海边的日落，是治愈一切的良药',
    user: { name: '摄影师阿张', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d' },
    likes: 452,
  },
  {
    id: 3,
    imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop',
    title: '今日份穿搭分享，潮流永不落幕',
    user: { name: '时尚Coco', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d' },
    likes: 78,
  },
  {
    id: 4,
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop',
    title: '美食探店 | 这家烤肉真的绝了！',
    user: { name: '吃货日记', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d' },
    likes: 999,
  },
  {
    id: 5,
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop',
    title: '我的极简主义桌面 setup',
    user: { name: '科技宅', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026708d' },
    likes: 302,
  },
  {
    id: 6,
    imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop',
    title: '高效工作流：我是如何管理我的任务的',
    user: { name: '效率达人', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026709d' },
    likes: 156,
  },
  {
    id: 7,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop',
    title: '新入手的智能手表，颜值与功能并存',
    user: { name: '数码控', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026710d' },
    likes: 234,
  },
  {
    id: 8,
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop',
    title: '周末咖啡时光，享受独处的美好',
    user: { name: '咖啡师小王', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026711d' },
    likes: 567,
  },
  {
    id: 9,
    imageUrl: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=2070&auto=format&fit=crop',
    title: '春季穿搭指南，这些单品让你时尚又舒适',
    user: { name: '时尚博主', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026712d' },
    likes: 789,
  },
  {
    id: 10,
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop',
    title: '健康饮食日记：今天也要好好吃饭',
    user: { name: '健康生活家', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026713d' },
    likes: 432,
  },
  {
    id: 11,
    imageUrl: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?q=80&w=2070&auto=format&fit=crop',
    title: '自制美食分享：这道菜简单又好吃',
    user: { name: '美食达人', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026714d' },
    likes: 876,
  },
  {
    id: 12,
    imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=2098&auto=format&fit=crop',
    title: '我的读书笔记：这本书改变了我的人生观',
    user: { name: '书虫', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026715d' },
    likes: 345,
  }
];

// 模拟获取关注页面的帖子数据
export const getFollowPosts = () => [
  {
    id: 101,
    imageUrl: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2072&auto=format&fit=crop',
    title: '新入手的智能手表，颜值与功能并存',
    user: { name: '数码控', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026710d' },
    likes: 234,
  },
  {
    id: 102,
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop',
    title: '周末咖啡时光，享受独处的美好',
    user: { name: '咖啡师小王', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026711d' },
    likes: 567,
  },
  {
    id: 103,
    imageUrl: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=2070&auto=format&fit=crop',
    title: '春季穿搭指南，这些单品让你时尚又舒适',
    user: { name: '时尚博主', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026712d' },
    likes: 789,
  },
  {
    id: 104,
    imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop',
    title: '健康饮食日记：今天也要好好吃饭',
    user: { name: '健康生活家', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026713d' },
    likes: 432,
  },
  {
    id: 105,
    imageUrl: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?q=80&w=2070&auto=format&fit=crop',
    title: '自制美食分享：这道菜简单又好吃',
    user: { name: '美食达人', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026714d' },
    likes: 876,
  },
  {
    id: 106,
    imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=2098&auto=format&fit=crop',
    title: '我的读书笔记：这本书改变了我的人生观',
    user: { name: '书虫', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026715d' },
    likes: 345,
  }
];

// 模拟获取附近页面的帖子数据
export const getNearbyPosts = () => [
  {
    id: 201,
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop',
    title: '附近新开的网红餐厅，环境超赞！',
    user: { name: '美食探店', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026716d' },
    likes: 678,
  },
  {
    id: 202,
    imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop',
    title: '周末好去处：这家书店太适合拍照了',
    user: { name: '城市探索者', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026717d' },
    likes: 543,
  },
  {
    id: 203,
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop',
    title: '本地特色小吃推荐，这家店排队也要吃',
    user: { name: '本地美食家', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026718d' },
    likes: 890,
  },
  {
    id: 204,
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2070&auto=format&fit=crop',
    title: '发现一家超赞的咖啡馆，环境安静适合工作',
    user: { name: '咖啡爱好者', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026719d' },
    likes: 456,
  },
  {
    id: 205,
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop',
    title: '附近新开的健身房，设施很齐全',
    user: { name: '健身达人', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026720d' },
    likes: 321,
  },
  {
    id: 206,
    imageUrl: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=2070&auto=format&fit=crop',
    title: '周末市集：发现了很多有趣的小玩意',
    user: { name: '市集达人', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026721d' },
    likes: 765,
  }
];

// 模拟获取评论数据
export const getCommentsForPost = () => [
  {
    id: 1,
    text: '太美了！请问这是在哪里拍的？',
    user: { name: '摄影爱好者', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026710d' },
  },
  {
    id: 2,
    text: '构图很棒，光线也很到位',
    user: { name: '专业摄影师', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026711d' },
  },
  {
    id: 3,
    text: '这个角度拍得真好，学习了！',
    user: { name: '新手摄影师', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026712d' },
  },
];
