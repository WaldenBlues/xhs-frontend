// src/pages/PostPage.jsx
import React from 'react';
import { PlusSquare } from 'lucide-react';

const PostPage = () => (
    <div className="p-4 bg-gray-50 h-full">
        <header className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold">发布新内容</h1>
            <button className="bg-red-500 text-white font-bold py-2 px-6 rounded-full">发布</button>
        </header>
        <textarea
            className="w-full h-32 p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-red-400"
            placeholder="添加标题..."
        ></textarea>
        <textarea
            className="w-full h-48 p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-red-400"
            placeholder="分享你的故事..."
        ></textarea>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-red-400 hover:text-red-400 transition-colors">
            <PlusSquare className="mx-auto w-12 h-12 text-gray-400" />
            <p className="mt-2 text-sm">上传图片或视频</p>
            <p className="text-xs text-gray-500 mt-1">支持本地上传或 Cloudinary</p>
        </div>
    </div>
);

export default PostPage;