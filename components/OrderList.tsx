
import React from 'react';
import { Package, ChevronRight, ArrowLeft, Clock, Truck, CheckCircle2 } from 'lucide-react';
import { Order } from '../types';
import { ACCENT_COLOR } from '../constants';

interface OrderListProps {
  orders: Order[];
  onOrderClick: (order: Order) => void;
  onStartShopping: () => void;
  onBack: () => void;
}

const OrderList: React.FC<OrderListProps> = ({ orders, onOrderClick, onStartShopping, onBack }) => {
  return (
    <div className="flex flex-col h-full bg-gray-50 animate-in fade-in duration-500">
      {/* PROFESSIONAL HEADER */}
      <div className="bg-white px-4 py-3 sticky top-0 z-30 shadow-sm border-b border-gray-100 flex items-center justify-between">
        <h1 className="text-xl font-black tracking-tighter italic" style={{ color: ACCENT_COLOR }}>
          Snap<span className="text-gray-900 not-italic">MEN</span>
        </h1>
        <div className="bg-gray-50 p-2 rounded-xl">
           <Package size={18} className="text-gray-400" />
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-white">
          <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 border border-gray-100 shadow-inner">
             <Truck size={40} className="text-gray-200" />
          </div>
          <p className="text-lg font-black text-gray-800 uppercase tracking-tight">No parcels found</p>
          <p className="text-[10px] text-gray-400 mt-2 font-black uppercase tracking-widest leading-relaxed">Your fashion journey hasn't started yet.</p>
          <button 
            onClick={onStartShopping} 
            className="mt-8 px-10 py-3.5 bg-red-600 text-white rounded-xl text-[10px] font-black uppercase tracking-[3px] shadow-lg"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto pb-32 no-scrollbar">
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-2 mb-2 px-1">
              <div className="w-1 h-4 bg-red-600 rounded-full"></div>
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Purchase History</h3>
            </div>
            
            {orders.map((order) => (
              <div 
                key={order.id} 
                onClick={() => onOrderClick(order)}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 active:bg-gray-50 transition-all group"
              >
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-50">
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-gray-300" />
                    <span className="text-[11px] font-black text-gray-800 italic uppercase">Order #{order.id}</span>
                  </div>
                  <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${order.status === 'Delivered' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {order.status === 'Delivered' ? <CheckCircle2 size={10} /> : <div className="w-1 h-1 bg-red-600 rounded-full animate-pulse"></div>}
                    <span className="text-[8px] font-black uppercase tracking-widest">{order.status}</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-16 h-20 bg-gray-50 rounded-xl border border-gray-100 overflow-hidden flex-shrink-0 shadow-inner">
                    <img src={order.items[0].image} className="w-full h-full object-cover" alt={order.items[0].title} />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="text-[10px] font-black text-gray-800 uppercase tracking-tight truncate mb-1">{order.items[0].title}</h4>
                      <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">
                        {order.items.length > 1 ? `+ ${order.items.length - 1} more items` : '1 Item Ordered'}
                      </p>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-50 pt-3">
                       <p className="text-sm font-black italic">₹{order.total.toLocaleString()}</p>
                       <div className="flex items-center gap-1 text-gray-300">
                         <span className="text-[8px] font-black uppercase tracking-widest">Details</span>
                         <ChevronRight size={12} className="group-active:translate-x-0.5 transition-transform" />
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;
