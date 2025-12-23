
import React, { useState } from 'react';
import { Trash2, ShoppingBag, Minus, Plus, ChevronRight, ShieldCheck, Ticket, X, Check } from 'lucide-react';
import { CartItem, Coupon, StoreConfig } from '../types';
import { ACCENT_COLOR } from '../constants';

interface CartViewProps {
  items: CartItem[];
  coupons: Coupon[];
  activeCoupon: Coupon | null;
  storeConfig: StoreConfig;
  onSelectCoupon: (c: Coupon | null) => void;
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, delta: number) => void;
  onCheckout: () => void;
  onBack: () => void;
}

const CartView: React.FC<CartViewProps> = ({ 
  items, coupons, activeCoupon, storeConfig, onSelectCoupon, onRemove, onUpdateQty, onCheckout, onBack 
}) => {
  const [showCouponSheet, setShowCouponSheet] = useState(false);

  const rawSubTotal = items.reduce((sum, item) => sum + (item.mrp * item.quantity), 0);
  const itemDiscount = items.reduce((sum, item) => sum + ((item.mrp - item.price) * item.quantity), 0);
  const basePrice = rawSubTotal - itemDiscount;

  let couponDiscount = 0;
  if (activeCoupon) {
    if (activeCoupon.discountType === 'FLAT') couponDiscount = activeCoupon.value;
    else couponDiscount = Math.round(basePrice * (activeCoupon.value / 100));
  }

  const finalPrice = basePrice - couponDiscount;

  if (items.length === 0) {
    return (
      <div className="flex flex-col h-full bg-white animate-in fade-in duration-300">
        <div className="bg-white px-4 py-3 sticky top-0 z-30 shadow-sm border-b border-gray-100 flex items-center justify-between">
          <h1 className="text-xl font-black tracking-tighter italic" style={{ color: ACCENT_COLOR }}>
            Snap<span className="text-gray-900 not-italic uppercase">MEN</span>
          </h1>
          <div className="bg-gray-50 p-2 rounded-xl">
             <ShoppingBag size={18} className="text-gray-400" />
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
          <div className="w-24 h-24 bg-gray-50 rounded-[2.5rem] flex items-center justify-center mb-8 border border-gray-100 shadow-inner">
            <ShoppingBag size={48} className="text-gray-200" />
          </div>
          <h2 className="text-xl font-black uppercase text-gray-800 tracking-tight">Your bag is empty</h2>
          <p className="text-[10px] text-gray-400 mt-2 font-black uppercase tracking-[3px] max-w-[200px]">Stock up on premium essentials now.</p>
          <button onClick={onBack} className="mt-10 px-12 py-4 bg-red-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[4px] shadow-xl active:scale-95 transition-all">Explore Trends</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50 animate-in slide-in-from-right duration-300">
      <div className="bg-white px-4 py-3 sticky top-0 z-30 shadow-sm border-b border-gray-100 flex items-center justify-between">
        <h1 className="text-xl font-black tracking-tighter italic" style={{ color: ACCENT_COLOR }}>
          Snap<span className="text-gray-900 not-italic uppercase">MEN</span>
        </h1>
        <div className="bg-gray-50 p-2 rounded-xl flex items-center gap-2">
           <span className="text-[10px] font-black text-red-600">{items.length}</span>
           <ShoppingBag size={18} className="text-gray-400" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
        <div className="mt-4 px-4 space-y-4">
          <div className="flex items-center gap-2 mb-2 px-1">
             <div className="w-1 h-3 bg-red-600 rounded-full"></div>
             <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Itemized Selection</h3>
          </div>
          
          {items.map((item) => (
            <div key={item.id} className="bg-white p-5 rounded-[2rem] border border-gray-100 flex gap-5 shadow-sm group">
              <div className="w-24 h-28 bg-gray-50 rounded-2xl border border-gray-100 flex-shrink-0 overflow-hidden shadow-inner">
                <img src={item.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={item.title} />
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-[9px] font-black text-red-600 uppercase tracking-widest leading-none">{item.brand}</p>
                    <button onClick={() => onRemove(item.id)} className="p-1 text-gray-300 hover:text-red-600 transition-colors"><Trash2 size={16}/></button>
                  </div>
                  <h3 className="text-[12px] font-bold text-gray-800 truncate uppercase tracking-tight">{item.title}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm font-black text-gray-900 italic">₹{item.price}</span>
                    <span className="text-[10px] text-gray-400 line-through font-bold">₹{item.mrp}</span>
                    <span className="text-[9px] font-black text-green-600 uppercase bg-green-50 px-1.5 rounded">{item.discount}% Off</span>
                  </div>
                </div>
                <div className="flex items-center border border-gray-100 rounded-xl overflow-hidden h-9 w-fit bg-gray-50 mt-4 shadow-sm">
                  <button onClick={() => onUpdateQty(item.id, -1)} className="px-3 hover:bg-white transition-colors"><Minus size={14} className="text-gray-400" /></button>
                  <span className="px-4 text-[11px] font-black text-gray-900 border-x border-gray-100 h-full flex items-center">{item.quantity}</span>
                  <button onClick={() => onUpdateQty(item.id, 1)} className="px-3 hover:bg-white transition-colors"><Plus size={14} className="text-gray-400" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Promo Code Logic strictly for ADMIN to toggle */}
        {true && ( 
          <div 
            onClick={() => setShowCouponSheet(true)}
            className="mx-4 mt-8 p-6 bg-white rounded-[2rem] border border-gray-100 flex items-center justify-between shadow-sm cursor-pointer hover:border-red-100 transition-colors"
          >
             <div className="flex items-center gap-4">
                <div className={`p-2.5 rounded-2xl ${activeCoupon ? 'bg-green-600 text-white' : 'bg-gray-50 text-gray-400'}`}>
                  <Ticket size={20} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase text-gray-800 tracking-tight">{activeCoupon ? activeCoupon.code : 'Apply Promo Protocol'}</p>
                  {activeCoupon ? (
                     <p className="text-[8px] font-black text-green-600 uppercase tracking-widest mt-1">Savings Activated</p>
                  ) : (
                     <p className="text-[9px] font-bold text-gray-400 uppercase mt-0.5">Check for available coupons</p>
                  )}
                </div>
             </div>
             {activeCoupon ? <X size={18} className="text-gray-300" onClick={(e) => { e.stopPropagation(); onSelectCoupon(null); }} /> : <ChevronRight size={18} className="text-gray-300" />}
          </div>
        )}

        <div className="p-8 bg-white mt-8 rounded-t-[3rem] border-t border-gray-100 shadow-[0_-15px_30px_rgba(0,0,0,0.03)]">
          <div className="flex items-center gap-2 mb-8">
             <div className="w-1 h-3 bg-gray-900 rounded-full"></div>
             <h3 className="text-[10px] font-black uppercase text-gray-400 tracking-[3px]">Financial Ledger</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-gray-500"><span>Consolidated MRP</span><span className="text-gray-900 font-black">₹{rawSubTotal}</span></div>
            <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-green-600"><span>Catalog Discount</span><span className="font-black">-₹{itemDiscount}</span></div>
            {couponDiscount > 0 && <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-purple-600"><span>Promo Credit</span><span className="font-black">-₹{couponDiscount}</span></div>}
            <div className="flex justify-between border-t border-gray-100 pt-6 mt-4 items-end">
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-[3px] text-gray-400 mb-1">Grand Total</span>
                <span className="text-2xl font-black text-gray-900 italic tracking-tighter">₹{finalPrice}</span>
              </div>
              <div className="text-right">
                <p className="text-[8px] font-black text-green-600 uppercase tracking-widest">You saved</p>
                <p className="text-sm font-black text-green-600 italic">₹{itemDiscount + couponDiscount}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-10 p-5 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-4">
             <ShieldCheck size={24} className="text-gray-300" />
             <p className="text-[9px] font-bold text-gray-400 uppercase leading-relaxed tracking-tight">100% Trustified Checkout. Items are sanitized & standard-verified for Men's health.</p>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white border-t border-gray-100 sticky bottom-0 flex items-center justify-between z-20 shadow-[0_-10px_25px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col">
          <p className="text-xl font-black text-gray-900 italic tracking-tighter leading-none">₹{finalPrice}</p>
          <p className="text-[8px] font-black text-red-600 uppercase tracking-widest mt-1">Final Amount</p>
        </div>
        <button 
          onClick={onCheckout} 
          className="bg-red-600 text-white px-12 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[4px] shadow-xl shadow-red-200 active:scale-95 transition-all flex items-center gap-3"
        >
          Checkout <ChevronRight size={18} />
        </button>
      </div>

      {showCouponSheet && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end">
          <div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm" onClick={() => setShowCouponSheet(false)}></div>
          <div className="relative bg-white rounded-t-[3rem] p-8 animate-in slide-in-from-bottom duration-300 shadow-2xl">
             <div className="w-14 h-1.5 bg-gray-100 rounded-full mx-auto mb-8"></div>
             <div className="flex items-center justify-between mb-8">
                <h3 className="text-sm font-black uppercase text-gray-900 tracking-[3px]">Promo Vault</h3>
                <button onClick={() => setShowCouponSheet(false)} className="p-2 bg-gray-50 rounded-full active:bg-gray-100"><X size={18}/></button>
             </div>
             <div className="space-y-5 max-h-[55vh] overflow-y-auto no-scrollbar pb-10">
                {coupons.map(c => {
                  const isEligible = basePrice >= c.minOrder;
                  const isApplied = activeCoupon?.code === c.code;
                  return (
                    <div 
                      key={c.id} 
                      onClick={() => { if(isEligible) { onSelectCoupon(c); setShowCouponSheet(false); } }}
                      className={`p-6 rounded-[2rem] border-2 border-dashed transition-all relative overflow-hidden ${isEligible ? (isApplied ? 'border-red-600 bg-red-50/30' : 'border-gray-100 bg-white active:scale-[0.98]') : 'border-gray-50 opacity-50 grayscale cursor-not-allowed'}`}
                    >
                       {isApplied && <div className="absolute top-0 right-0 bg-red-600 text-white text-[7px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-widest">Active</div>}
                       <div className="flex justify-between items-center mb-4">
                          <span className="text-xs font-black bg-neutral-900 text-white px-4 py-1.5 rounded-xl shadow-lg leading-none">{c.code}</span>
                          {isApplied && <Check size={20} className="text-red-600" />}
                       </div>
                       <p className="text-[11px] font-black text-gray-800 uppercase tracking-tight leading-snug">{c.description}</p>
                       {!isEligible && (
                         <div className="mt-4 flex items-center gap-2">
                           <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-red-600" style={{ width: `${(basePrice / c.minOrder) * 100}%` }}></div>
                           </div>
                           <p className="text-[8px] font-black text-red-600 uppercase">Add ₹{c.minOrder - basePrice} more</p>
                         </div>
                       )}
                    </div>
                  );
                })}
             </div>
             <button onClick={() => setShowCouponSheet(false)} className="w-full mt-6 py-5 bg-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-[3px] text-gray-400">Dismiss</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartView;
