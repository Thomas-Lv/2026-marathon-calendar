
import React from 'react';
import { MarathonEvent, EventCategory } from '../types';

interface EventCardProps {
  event: MarathonEvent;
}

const CategoryBadge: React.FC<{ category: EventCategory }> = ({ category }) => {
  const styles = {
    A: 'bg-red-100 text-red-700 border-red-200',
    B: 'bg-blue-100 text-blue-700 border-blue-200',
    C: 'bg-gray-100 text-gray-700 border-gray-200',
  };

  return (
    <span className={`px-2 py-0.5 rounded text-xs font-bold border ${styles[category]}`}>
      {category}类赛事
    </span>
  );
};

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {event.province}
        </span>
        <CategoryBadge category={event.category} />
      </div>
      <h3 className="text-slate-900 font-bold text-lg mb-2 leading-tight">
        {event.name}
      </h3>
      <div className="space-y-1 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <span>{event.eventType}</span>
        </div>
        <div className="flex items-start gap-2">
          <svg className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="line-clamp-2">{event.organizer}</span>
        </div>
      </div>
    </div>
  );
};
