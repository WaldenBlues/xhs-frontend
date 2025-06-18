import React from 'react';
import { 
  UserPlus, 
  MessageSquare, 
  History, 
  ShoppingBag, 
  ShoppingCart, 
  Wallet,
  Headphones,
  Settings
} from 'lucide-react';

const SideMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const menuItems = [
    { icon: UserPlus, text: '添加好友' },
    { icon: MessageSquare, text: '我的评论' },
    { icon: History, text: '浏览记录' },
    { icon: ShoppingBag, text: '订单' },
    { icon: ShoppingCart, text: '购物车' },
    { icon: Wallet, text: '钱包' },
  ];

  return (
    <>
      {/* 遮罩层 */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* 侧边菜单 */}
      <div className="fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out">
        {/* 菜单列表 */}
        <div className="pt-4">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="w-full flex items-center px-4 py-3 hover:bg-gray-50"
            >
              <item.icon className="w-5 h-5 text-gray-600" />
              <span className="ml-3 text-gray-700">{item.text}</span>
            </button>
          ))}
        </div>

        {/* 底部按钮 */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-around">
          <button className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
              <Headphones className="w-6 h-6 text-gray-600" />
            </div>
            <span className="mt-2 text-sm text-gray-600">客服</span>
          </button>
          <button className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
              <Settings className="w-6 h-6 text-gray-600" />
            </div>
            <span className="mt-2 text-sm text-gray-600">设置</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SideMenu; 