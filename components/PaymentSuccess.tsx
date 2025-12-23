
import React from 'react';
import { Check, Package, ShoppingBag, Calendar, Hash, ArrowRight } from 'lucide-react';
import { Order } from '../types';
import { ACCENT_COLOR } from '../constants';

interface PaymentSuccessProps {
  order: Order;
  onContinue: () => void;
  onViewOrder: () => void;
}

const PaymentSuccess: React.FC<PaymentSuccessProps> = ({ order, onContinue, onViewOrder }) => {
  return (
    <div className="bg-white fixed inset-0 z-[300] flex flex-col items-center justify-center p-6 animate-in fade-in duration-500">
      
      {/* 1. SUCCESS ICON */}
      <div className="mb-8 relative">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
          <Check size={40} className="text-green-600" strokeWidth={3} />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
          <Check size={12} className="text-white" strokeWidth={4} />
        </div>
      </div>

      {/* 2. SUCCESS MESSAGE */}
      <div className="text-center mb-10">
        <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-2">Order Confirmed</h1>
        <p className="text-sm text-gray-500 font-medium max-w-[240px] mx-auto leading-relaxed">
          Thank you for choosing SnapMEN. Your style upgrade is on its way.
        </p>
      </div>

      {/* 3. ORDER SUMMARY CARD (SIMPLE) */}
      <div className="w-full bg-gray-50 rounded-3xl p-6 border border-gray-100 mb-10 space-y-4">
        <div className="flex justify-between items-center pb-4 border-b border-gray-200/50">
          <div className="flex items-center gap-2 text-gray-400">
            <Hash size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest">Order ID</span>
          </div>
          <span className="text-xs font-black text-gray-900">#{order.id}</span>
        </div>

        <div className="flex justify-between items-center pb-4 border-b border-gray-200/50">
          <div className="flex items-center gap-2 text-gray-400">
            <Calendar size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest">Ordered On</span>
          </div>
          <span className="text-xs font-black text-gray-900">{order.date}</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-gray-400">
            <ShoppingBag size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest">Total Paid</span>
          </div>
          <span className="text-sm font-black text-red-600 italic">₹{order.total.toLocaleString()}</span>
        </div>
      </div>

      {/* 4. ACTIONS */}
      <div className="w-full space-y-3">
        <button 
          onClick={onViewOrder}
          className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-[3px] shadow-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
        >
          Track My Order <Package size={16} />
        </button>
        
        <button 
          onClick={onContinue}
          className="w-full py-4 bg-white text-gray-500 border border-gray-200 rounded-2xl font-black uppercase text-[10px] tracking-[3px] flex items-center justify-center gap-2 active:bg-gray-50 transition-all"
        >
          Continue Shopping <ArrowRight size={16} />
        </button>
      </div>

      {/* 5. TRUST FOOTER */}
      <p className="mt-12 text-[8px] font-black text-gray-300 uppercase tracking-[4px]">Verified by SnapMEN Security</p>
    </div>
  );
};

export default PaymentSuccess;
