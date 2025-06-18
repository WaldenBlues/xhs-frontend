// src/pages/ProfilePage.jsx
import React, { useMemo } from 'react';
import MasonryLayout from '../components/post/MasonryLayout'; // 更新路径
import { getInitialPosts } from '../data/mockData'; // 导入模拟数据

const ProfilePage = ({ user, onSelectPost }) => {
    // 模拟用户的发布内容，这里简单地取偶数索引的帖子作为示例
    const myPosts = useMemo(() => getInitialPosts().filter((_, index) => index % 2 === 0), []);
    
    // 如果没有user信息，可以返回一个加载状态或者提示登录
    if (!user) {
        return <div className="p-4 text-center text-gray-500">请先登录以查看个人主页。</div>;
    }

    return (
        <div className="bg-gray-100 min-h-full">
            <div className="p-6 bg-white">
                 <div className="flex items-center">
                    <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full mr-6"/>
                    <div>
                        <h2 className="text-2xl font-bold">{user.name}</h2>
                        <p className="text-sm text-gray-500 mt-1">小红书号: 12345678</p>
                    </div>
                 </div>
                 <p className="mt-4 text-sm">点击这里，填写简介</p>
                 <div className="flex mt-4 space-x-8 text-center">
                     <div>
                         <p className="font-bold text-lg">10</p>
                         <p className="text-sm text-gray-500">关注</p>
                     </div>
                     <div>
                         <p className="font-bold text-lg">1.2k</p>
                         <p className="text-sm text-gray-500">粉丝</p>
                     </div>
                     <div>
                         <p className="font-bold text-lg">304</p>
                         <p className="text-sm text-gray-500">获赞与收藏</p>
                     </div>
                 </div>
            </div>
            <div className="mt-2 bg-white">
                <h3 className="p-4 font-bold border-b">我的发布</h3>
                <MasonryLayout posts={myPosts} onSelectPost={onSelectPost} />
            </div>
        </div>
    )
};

export default ProfilePage;