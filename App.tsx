
import React, { useState, useMemo } from 'react';
import { RAW_EVENTS, groupEventsByDate, sortDates } from './constants';
import { EventCard } from './components/EventCard';
import { MarathonEvent } from './types';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredEvents = useMemo(() => {
    return RAW_EVENTS.filter(event => {
      const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            event.province.includes(searchTerm);
      const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const grouped = useMemo(() => {
    const groups = groupEventsByDate(filteredEvents);
    return Object.keys(groups).sort(sortDates).map(date => ({
      date,
      events: groups[date]
    }));
  }, [filteredEvents]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                <span className="bg-red-600 text-white p-1 rounded">2026</span>
                全国马拉松赛事目录
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                数据来源：中国田径协会 2025年12月19日发布
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="搜索赛事或省份..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-red-500 transition-all outline-none text-sm"
                />
                <svg className="w-5 h-5 absolute left-3 top-2.5 text-slate-400 group-focus-within:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-red-500 transition-all outline-none text-sm font-medium"
              >
                <option value="All">全部级别</option>
                <option value="A">A类赛事</option>
                <option value="B">B类赛事</option>
                <option value="C">C类赛事</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {grouped.length > 0 ? (
          <div className="space-y-12">
            {grouped.map((group) => (
              <section key={group.date} className="relative">
                <div className="flex items-center gap-4 mb-6 sticky top-24 bg-slate-50 py-2 z-10">
                  <h2 className="text-xl font-black text-red-600 shrink-0 bg-red-50 px-3 py-1 rounded-lg border border-red-100">
                    {group.date}
                  </h2>
                  <div className="h-px bg-slate-200 flex-grow"></div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest shrink-0">
                    {group.events.length} 场赛事
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {group.events.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <svg className="w-16 h-16 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-lg font-medium">未找到匹配的赛事信息</p>
            <button 
              onClick={() => {setSearchTerm(''); setSelectedCategory('All');}}
              className="mt-4 text-red-600 font-bold hover:underline"
            >
              重置筛选条件
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 mt-12">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-xs">
            © 2026 马拉松赛事历 - 仅供参考，具体以官方发布为准
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
