import React from 'react';
import { Heart, UserPlus, MessageCircle } from 'lucide-react';

const MessagesPage = () => {
  // 模拟消息数据
  const messages = [
    {
      id: 1,
      user: {
        name: '旅行摄影师',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d'
      },
      lastMessage: '谢谢你的分享，照片拍得真好看！',
      time: '10:30'
    },
    {
      id: 2,
      user: {
        name: '美食达人',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d'
      },
      lastMessage: '这家店我也去过，确实不错！',
      time: '昨天'
    },
    {
      id: 3,
      user: {
        name: '时尚博主',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d'
      },
      lastMessage: '请问这件衣服在哪里买的呀？',
      time: '昨天'
    },
    {
      id: 4,
      user: {
        name: '咖啡师小王',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d'
      },
      lastMessage: '下次来店里，我请你喝咖啡！',
      time: '周一'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* 顶部标题 */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-center h-14">
          <h1 className="text-lg font-semibold">消息</h1>
        </div>
      </div>

      {/* 消息类型按钮 */}
      <div className="flex justify-around py-4 border-b border-gray-100">
        <button className="flex flex-col items-center">
          <Heart className="w-6 h-6 text-gray-600" />
          <span className="mt-1 text-sm text-gray-600">赞和收藏</span>
        </button>
        <button className="flex flex-col items-center">
          <UserPlus className="w-6 h-6 text-gray-600" />
          <span className="mt-1 text-sm text-gray-600">新增关注</span>
        </button>
        <button className="flex flex-col items-center">
          <MessageCircle className="w-6 h-6 text-gray-600" />
          <span className="mt-1 text-sm text-gray-600">评论和@</span>
        </button>
      </div>

      {/* 消息列表 */}
      <div className="divide-y divide-gray-100">
        {messages.map((message) => (
          <div key={message.id} className="flex items-center p-4 hover:bg-gray-50">
            <img
              src={message.user.avatar}
              alt={message.user.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="ml-4 flex-1">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-medium">{message.user.name}</h3>
                <span className="text-sm text-gray-500">{message.time}</span>
              </div>
              <p className="text-sm text-gray-500 mt-1 truncate">
                {message.lastMessage}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessagesPage; 