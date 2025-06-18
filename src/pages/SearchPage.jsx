import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search as SearchIcon, Clock, TrendingUp } from 'lucide-react';

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // 模拟搜索历史数据
  const searchHistory = [
    '春季穿搭',
    '美食探店',
    '旅行攻略',
    '护肤心得',
    '健身打卡'
  ];

  // 模拟热点榜单数据
  const hotTopics = [
    { id: 1, title: '2024春季穿搭指南', hot: '9999+' },
    { id: 2, title: '超实用的收纳技巧', hot: '8888+' },
    { id: 3, title: '春日野餐必备清单', hot: '7777+' },
    { id: 4, title: '平价好用的护肤品推荐', hot: '6666+' },
    { id: 5, title: '周末出游好去处', hot: '5555+' },
    { id: 6, title: '春季养生小贴士', hot: '4444+' },
    { id: 7, title: '居家健身动作分享', hot: '3333+' },
    { id: 8, title: '春日妆容教程', hot: '2222+' },
    { id: 9, title: '春季美食食谱', hot: '1111+' },
    { id: 10, title: '春日摄影技巧', hot: '1000+' }
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // TODO: 实现搜索功能
      console.log('搜索:', searchQuery);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 顶部搜索栏 */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="flex items-center px-4 h-14">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          
          <div className="flex-1 mx-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索你感兴趣的内容"
                className="w-full h-10 pl-10 pr-4 text-sm bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
              />
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <button 
            onClick={handleSearch}
            className="text-primary font-medium text-sm px-2"
          >
            搜索
          </button>
        </div>
      </div>

      {/* 搜索历史和热点榜单 */}
      <div className="px-4 py-6">
        {/* 搜索历史 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center text-gray-600">
              <Clock className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">搜索历史</span>
            </div>
            <button className="text-gray-400 text-sm">清除</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {searchHistory.map((item, index) => (
              <button
                key={index}
                className="px-3 py-1.5 text-sm bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* 热点榜单 */}
        <div>
          <div className="flex items-center mb-4">
            <TrendingUp className="w-5 h-5 mr-2 text-red-500" />
            <span className="text-sm font-medium text-gray-600">小红书热点</span>
          </div>
          <div className="space-y-4">
            {hotTopics.map((topic) => (
              <div key={topic.id} className="flex items-center">
                <span className={`w-6 text-center text-sm font-medium ${
                  topic.id <= 3 ? 'text-red-500' : 'text-gray-400'
                }`}>
                  {topic.id}
                </span>
                <span className="flex-1 ml-2 text-sm text-gray-600">{topic.title}</span>
                <span className="text-xs text-gray-400">{topic.hot}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage; 