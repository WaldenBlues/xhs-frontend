import React from 'react';
import { Menu as MenuIcon } from 'lucide-react';

const Menu = () => {
  return (
    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors z-50">
      <MenuIcon className="w-6 h-6 text-gray-600" />
    </button>
  );
};

export default Menu; 