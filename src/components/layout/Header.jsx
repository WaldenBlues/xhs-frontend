import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Header = ({ title, showBack = false }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center bg-white h-12 px-4 border-b">
      {showBack ? (
        <button onClick={() => navigate(-1)} className="p-1">
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
      ) : (
        <div className="w-6" />
      )}
      <h1 className="flex-1 text-center text-lg font-semibold text-gray-800">
        {title}
      </h1>
      <div className="w-6" />
    </div>
  );
};

export default Header;