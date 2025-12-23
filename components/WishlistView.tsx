
import React from 'react';
import { ArrowLeft, Trash2, ShoppingCart, Heart, ChevronRight, Zap } from 'lucide-react';
import { Product } from '../types';
import { ACCENT_COLOR } from '../constants';

interface WishlistViewProps {
  items: Product[];
  onProductClick: (p: Product) => void;
  onRemove: (id: string) => void;
  onAddToCart: (p: Product) => void;
  onGoHome: () => void;
}

const WishlistView: React.FC<WishlistViewProps> = ({ items, onProductClick, onRemove, onAddToCart, onGoHome }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col animate-in fade-in duration-500">
      {/* 1. PROFESSIONAL HEADER */}
      <div className="bg-white px-4 py-3 sticky top-0 z-30 shadow-sm border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onGoHome} className="p-2 bg-gray-50 rounded-full active:scale-90 transition-all">
            <ArrowLeft size={20} className="text-gray-400" />
          </button>
          <h1 className="text-sm font-black text-gray-900 uppercase tracking-widest italic">
            Elite<span className="text-red-600">Curation</span>
          </h1>
        </div>
        <div className="bg-red-50 px-2 py-1 rounded-lg">
           <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">{items.length} Saved</span>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-white">
          <div className="w-24 h-24 bg-gray-50 rounded-[2rem] flex items-center justify-center mb-8 shadow-inner border border-gray-100">
            <Heart size={48} className="text-gray-200" />
          </div>
          <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight">Your vault is empty</h2>
          <p className="text-[10px] text-gray-400 mt-2 font-black uppercase tracking-widest max-w-[220px] leading-relaxed">Curate your premium fashion collection today.</p>
          <button 
            onClick={onGoHome} 
            className="mt-10 px-10 py-4 bg-red-600 text-white rounded-2xl font-black uppercase tracking-[3px] text-[10px] shadow-xl active:scale-95 transition-transform"
          >
            Explore Catalog
          </button>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
          {/* Elite Banner */}
          <div className="m-4 p-4 bg-gray-900 rounded-2xl text-white flex items-center justify-between shadow-lg border border-gray-800">
             <div className="flex items-center gap-3">
                <div className="p-2 bg-red-600 rounded-xl">
                   <Zap size={18} fill="white" />
                </div>
                <div>
                   <p className="text-[10px] font-black uppercase tracking-tight">Personal Picks</p>
                </div>
             </div>
             <p className="text-[8px] font-black uppercase tracking-[2px] text-gray-500">SnapMEN Exclusive</p>
          </div>

          <div className="grid grid-cols-2 gap-px bg-gray-100 border-y border-gray-100">
            {items.map((item) => (
              <div 
                key={item.id} 
                className="bg-white p-4 flex flex-col relative active:bg-gray-50 transition-colors group" 
                onClick={() => onProductClick(item)}
              >
                {/* Remove Button */}
                <button 
                  onClick={(e) => { e.stopPropagation(); onRemove(item.id); }}
                  className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md rounded-xl border border-gray-100 shadow-sm text-gray-400 hover:text-red-600"
                >
                  <Trash2 size={14} />
                </button>

                <div className="aspect-[3/4] mb-4 rounded-2xl overflow-hidden border border-gray-50 shadow-sm group-hover:scale-[1.02] transition-transform duration-500">
                  <img src={item.image} className="w-full h-full object-cover" alt={item.title} />
                </div>
                
                <p className="text-[8px] font-black text-red-600 uppercase tracking-[3px] mb-1">{item.brand}</p>
                <h3 className="text-[11px] text-gray-800 font-bold truncate uppercase tracking-tight mb-2 leading-none">{item.title}</h3>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm font-black italic">₹{item.price}</span>
                  <span className="text-[10px] text-gray-400 line-through font-bold">₹{item.mrp}</span>
                </div>

                <button 
                  onClick={(e) => { e.stopPropagation(); onAddToCart(item); }}
                  className="w-full h-11 bg-gray-900 text-white rounded-xl text-[9px] font-black uppercase tracking-[2px] flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md"
                >
                  <ShoppingCart size={14} /> Move to Bag
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistView;
