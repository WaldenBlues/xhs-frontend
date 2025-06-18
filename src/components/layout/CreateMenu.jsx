import React from 'react';
import { Image, Camera, PenTool } from 'lucide-react';

const CreateMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const menuItems = [
    {
      icon: <Image className="w-6 h-6" />,
      label: '从相册选择',
      onClick: () => {
        // TODO: 实现相册选择功能
        onClose();
      }
    },
    {
      icon: <Camera className="w-6 h-6" />,
      label: '相机',
      onClick: () => {
        // TODO: 实现相机功能
        onClose();
      }
    },
    {
      icon: <PenTool className="w-6 h-6" />,
      label: '写文字',
      onClick: () => {
        // TODO: 实现写文字功能
        onClose();
      }
    }
  ];

  return (
    <>
      {/* 半透明背景遮罩 */}
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      
      {/* 底部菜单 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 animate-slide-up">
        {/* 顶部拖动条 */}
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto my-3" />
        
        {/* 菜单项 */}
        <div className="px-4 pb-8">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="w-full flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-xl transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                {item.icon}
              </div>
              <span className="text-lg">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default CreateMenu; 