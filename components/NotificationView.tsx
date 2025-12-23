
import React from 'react';
import { ArrowLeft, Bell, Tag, Package, CreditCard, Sparkles, ChevronRight } from 'lucide-react';
import { ACCENT_COLOR } from '../constants';

interface NotificationViewProps {
  onBack: () => void;
}

const NOTIFS = [
  { id: 1, title: 'Parcel Delivered!', desc: 'Your consignment #ORD823912 has reached the destination.', time: '2h ago', icon: <Package size={20}/>, color: 'text-green-600', bg: 'bg-green-50' },
  { id: 2, title: 'Elite Flash Sale', desc: 'Men\'s Winter Collection now at 60% OFF for you.', time: '5h ago', icon: <Tag size={20}/>, color: 'text-red-600', bg: 'bg-red-50' },
  { id: 3, title: 'Wallet Credited', desc: '₹150 SnapMEN Cashback received for loyalty points.', time: '1d ago', icon: <CreditCard size={20}/>, color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 4, title: 'System Update', desc: 'Version 2.5 is live. Enjoy a smoother shopping journey.', time: '2d ago', icon: <Sparkles size={20}/>, color: 'text-purple-600', bg: 'bg-purple-50' },
];

const NotificationView: React.FC<NotificationViewProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col animate-in slide-in-from-right duration-300">
      {/* PROFESSIONAL HEADER */}
      <div className="bg-white px-4 py-3 sticky top-0 z-10 shadow-sm border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 bg-gray-50 rounded-full active:scale-90 transition-all">
            <ArrowLeft size={20} className="text-gray-400" />
          </button>
          <h1 className="text-sm font-black text-gray-900 uppercase tracking-widest">Inbox Update</h1>
        </div>
        <button className="text-[9px] font-black text-gray-400 uppercase">Clear All</button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
        <div className="px-4 py-6 bg-white border-b border-gray-100 mb-2 flex items-center justify-between">
           <div className="flex items-center gap-3">
              <div className="w-1 h-4 bg-red-600 rounded-full"></div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Recent Activity</p>
           </div>
           <Bell size={16} className="text-gray-300" />
        </div>

        {NOTIFS.map((n) => (
          <div key={n.id} className="p-5 bg-white border-b border-gray-50 flex gap-5 active:bg-gray-50 transition-colors group">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm ${n.bg} ${n.color}`}>
              {n.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-1.5">
                <h3 className="text-[11px] font-black text-gray-900 uppercase tracking-tight">{n.title}</h3>
                <span className="text-[9px] text-gray-400 font-bold uppercase">{n.time}</span>
              </div>
              <p className="text-[11px] text-gray-500 leading-snug font-medium uppercase tracking-tight line-clamp-2">{n.desc}</p>
            </div>
            <div className="flex items-center text-gray-200 group-active:translate-x-1 transition-transform">
               <ChevronRight size={16} />
            </div>
          </div>
        ))}

        <div className="py-20 flex flex-col items-center justify-center opacity-30 px-12 text-center">
          <div className="w-16 h-1 bg-gray-200 rounded-full mb-6"></div>
          <p className="text-[9px] font-black uppercase tracking-[5px] text-gray-400">All caught up</p>
          <p className="text-[8px] font-bold text-gray-300 uppercase mt-2">You have no more pending alerts.</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationView;
