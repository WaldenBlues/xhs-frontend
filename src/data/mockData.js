// src/data/mockData.js

// 模拟的帖子数据
const getInitialPosts = () => [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?q=80&w=1915&auto=format&fit=crop',
    title: '探索山间秘境，寻找那一片宁静',
    user: { name: '旅行爱好者', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
    likes: 128,
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723a996f6ea?q=80&w=2070&auto=format&fit=crop',
    title: '海边的日落，是治愈一切的良药',
    user: { name: '摄影师阿张', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d' },
    likes: 452,
  },
  {
    id: 3,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ab?q=80&w=2070&auto=format&fit=crop',
    title: '今日份穿搭分享，潮流永不落幕',
    user: { name: '时尚Coco', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d' },
    likes: 78,
  },
  {
    id: 4,
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop',
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
];

const getCommentsForPost = () => [
    { id: 1, user: { name: '摄影爱好者', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026702e' }, text: '这张照片太美了，光线捕捉得刚刚好！', likes: 15 },
    { id: 2, user: { name: '路人甲', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026703e' }, text: '哇，这个地方在哪里呀？好想去！', likes: 8 },
];