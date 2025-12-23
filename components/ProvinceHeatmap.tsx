
import React, { useMemo } from 'react';
import { RAW_EVENTS } from '../constants';

interface ProvinceHeatmapProps {
  selectedProvince: string | null;
  onSelectProvince: (province: string | null) => void;
}

const PROVINCE_POSITIONS = [
  { name: '黑龙江', x: 82, y: 15 },
  { name: '吉林', x: 80, y: 24 },
  { name: '辽宁', x: 78, y: 31 },
  { name: '内蒙古', x: 55, y: 22 },
  { name: '北京', x: 71, y: 35 },
  { name: '天津', x: 74, y: 38 },
  { name: '河北', x: 70, y: 40 },
  { name: '山东', x: 75, y: 48 },
  { name: '江苏', x: 79, y: 58 },
  { name: '上海', x: 84, y: 62 },
  { name: '浙江', x: 80, y: 68 },
  { name: '福建', x: 77, y: 78 },
  { name: '广东', x: 70, y: 86 },
  { name: '海南', x: 64, y: 95 },
  { name: '广西', x: 60, y: 85 },
  { name: '云南', x: 48, y: 85 },
  { name: '贵州', x: 55, y: 80 },
  { name: '四川', x: 48, y: 72 },
  { name: '重庆', x: 56, y: 71 },
  { name: '湖南', x: 63, y: 76 },
  { name: '湖北', x: 65, y: 68 },
  { name: '江西', x: 71, y: 75 },
  { name: '安徽', x: 74, y: 66 },
  { name: '河南', x: 68, y: 60 },
  { name: '山西', x: 65, y: 50 },
  { name: '陕西', x: 60, y: 60 },
  { name: '宁夏', x: 58, y: 50 },
  { name: '甘肃', x: 50, y: 52 },
  { name: '青海', x: 40, y: 55 },
  { name: '新疆', x: 23, y: 35 },
  { name: '西藏', x: 30, y: 75 },
  { name: '新疆兵团', x: 28, y: 45 }
];

export const ProvinceHeatmap: React.FC<ProvinceHeatmapProps> = ({ selectedProvince, onSelectProvince }) => {
  const provinceCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    RAW_EVENTS.forEach(event => {
      counts[event.province] = (counts[event.province] || 0) + 1;
    });
    return counts;
  }, []);

  const getBubbleSize = (count: number) => {
    if (count < 10) return 'w-2.5 h-2.5 sm:w-4 sm:h-4';
    if (count < 20) return 'w-4 h-4 sm:w-6 sm:h-6';
    if (count < 30) return 'w-5 h-5 sm:w-8 sm:h-8';
    return 'w-7 h-7 sm:w-10 sm:h-10';
  };

  const getBubbleColor = (count: number) => {
    if (count === 0) return 'bg-slate-700';
    if (count < 15) return 'bg-red-500/80';
    return 'bg-red-600';
  };

  return (
    <div className="relative w-full aspect-[4/3] min-h-[300px] bg-[#0f172a] p-4 sm:p-8 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
         <div className="absolute top-1/4 left-1/3 w-64 sm:w-96 h-64 sm:h-96 bg-red-600/30 rounded-full blur-[80px] sm:blur-[120px]"></div>
         <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-blue-600/20 rounded-full blur-[80px] sm:blur-[120px]"></div>
      </div>

      <div className="absolute top-6 left-6 sm:top-10 sm:left-10 z-20">
        <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
            <div className="w-1 sm:w-1.5 h-4 sm:h-6 bg-red-600 rounded-full"></div>
            <h2 className="text-white text-sm sm:text-xl font-black">赛事分布热力图</h2>
        </div>
        <p className="text-slate-500 text-[10px] sm:text-xs font-bold">点击省份点位快速筛选</p>
      </div>

      {/* Map Content Container (scrollable on very small screens if needed) */}
      <div className="relative w-full h-full pt-12 sm:pt-16">
        {PROVINCE_POSITIONS.map((pos) => {
          const count = provinceCounts[pos.name] || 0;
          const isSelected = selectedProvince === pos.name;
          
          return (
            <div 
              key={pos.name}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 group transition-all duration-300 ${isSelected ? 'z-30' : 'z-10'}`}
            >
              {/* Bubble */}
              <button
                onClick={() => onSelectProvince(isSelected ? null : pos.name)}
                className={`
                  ${getBubbleSize(count)}
                  ${getBubbleColor(count)}
                  rounded-full transition-all duration-300 relative
                  ${isSelected ? 'scale-125 ring-2 sm:ring-4 ring-red-400 ring-offset-2 sm:ring-offset-4 ring-offset-[#0f172a]' : 'hover:scale-110 shadow-[0_0_10px_rgba(239,68,68,0.3)]'}
                `}
              >
                {isSelected && (
                  <div className="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-75"></div>
                )}
              </button>
              
              {/* Label */}
              <div 
                className={`
                  whitespace-nowrap px-1.5 py-0.5 rounded-md text-[8px] sm:text-[10px] font-bold transition-all shadow-sm
                  ${isSelected ? 'bg-red-600 text-white translate-y-1' : 'text-slate-400 group-hover:text-white group-hover:bg-slate-800/50'}
                `}
              >
                {pos.name}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend - Responsive positioning */}
      <div className="absolute bottom-4 right-4 sm:bottom-10 sm:right-10 bg-slate-800/80 backdrop-blur-md border border-slate-700 p-3 sm:p-5 rounded-2xl sm:rounded-3xl min-w-[100px] sm:min-w-[140px] z-20">
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-2.5 h-2.5 sm:w-4 sm:h-4 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.8)]"></div>
            <span className="text-[9px] sm:text-[11px] font-bold text-slate-300">密集</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500/60 rounded-full"></div>
            <span className="text-[9px] sm:text-[11px] font-bold text-slate-300">常规</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 bg-slate-600 rounded-full"></div>
            <span className="text-[9px] sm:text-[11px] font-bold text-slate-400">待入</span>
          </div>
        </div>
      </div>
    </div>
  );
};
