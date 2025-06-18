// src/pages/DetailPage.jsx
import React, { useMemo } from 'react';
import { ChevronLeft, MoreHorizontal, Heart, MessageCircle } from 'lucide-react';
import { getCommentsForPost } from '../data/mockData'; // 导入模拟评论数据

const DetailPage = ({ post, onBack }) => {
    const comments = useMemo(() => getCommentsForPost(), []);

    if (!post) {
        return <div className="p-4 text-center text-gray-500">内容加载中或不存在...</div>;
    }

    return (
        <div className="bg-white min-h-full">
            <header className="sticky top-0 bg-white z-10 flex items-center p-4 border-b">
                <button onClick={onBack} className="p-2 -ml-2"><ChevronLeft className="w-6 h-6 text-gray-800" /></button>
                <div className="flex items-center ml-2">
                    <img src={post.user.avatar} alt={post.user.name} className="w-8 h-8 rounded-full mr-3"/>
                    <span className="font-bold text-sm">{post.user.name}</span>
                </div>
                <button className="ml-auto bg-red-500 text-white text-sm font-bold py-1.5 px-4 rounded-full">关注</button>
                <button className="ml-2 p-1"><MoreHorizontal className="w-5 h-5 text-gray-800" /></button>
            </header>
            
            <div className="p-4">
                <img src={post.imageUrl} alt={post.title} className="w-full rounded-lg mb-4"/>
                <h1 className="text-xl font-bold mb-2">{post.title}</h1>
                <p className="text-gray-600 mb-4">这是一段关于这张图片的详细描述。#旅行日记 #摄影分享</p>
                <span className="text-xs text-gray-400">发布于 昨天 18:30</span>
            </div>

            <div className="border-t p-4">
                <h2 className="font-bold text-gray-700 mb-4">评论 {comments.length}</h2>
                <div>
                    {comments.map(comment => (
                        <div key={comment.id} className="flex items-start mb-4">
                            <img src={comment.user.avatar} alt={comment.user.name} className="w-8 h-8 rounded-full mr-3 mt-1"/>
                            <div className="flex-1">
                                <p className="text-xs text-gray-500">{comment.user.name}</p>
                                <p className="text-sm text-gray-800 mt-1">{comment.text}</p>
                            </div>
                            <div className="flex flex-col items-center text-gray-500">
                                <Heart className="w-4 h-4"/>
                                <span className="text-xs">{comment.likes}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <footer className="sticky bottom-0 bg-white border-t p-2 flex items-center">
                <input type="text" placeholder="说点什么..." className="flex-1 bg-gray-100 rounded-full py-2 px-4 text-sm focus:outline-none"/>
                <div className="flex space-x-4 ml-4 text-gray-600">
                     <div className="flex items-center space-x-1"><Heart className="w-5 h-5" /><span>{post.likes}</span></div>
                     <div className="flex items-center space-x-1"><MessageCircle className="w-5 h-5" /><span>{comments.length}</span></div>
                </div>
            </footer>
        </div>
    );
};
export default DetailPage;