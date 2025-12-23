
import React, { useState } from 'react';
import { CreditCard, Smartphone, Banknote, ChevronRight, ShieldCheck, ArrowLeft, Check, MapPin, Zap } from 'lucide-react';
import { CartItem, Address } from '../types';
import { ACCENT_COLOR } from '../constants';

interface CheckoutViewProps {
  items: CartItem[];
  address: Address;
  onPlaceOrder: (method: string) => void;
  onBack: () => void;
}

const CheckoutView: React.FC<CheckoutViewProps> = ({ items, address, onPlaceOrder, onBack }) => {
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CARD' | 'COD'>('UPI');
  const totalItemsPrice = items.reduce((sum, item) => sum + (item.mrp * item.quantity), 0);
  const totalDiscount = items.reduce((sum, item) => sum + ((item.mrp - item.price) * item.quantity), 0);
  const upiOffer = paymentMethod === 'UPI' ? 50 : 0;
  const finalPrice = totalItemsPrice - totalDiscount - upiOffer;

  const PaymentItem = ({ id, label, icon: Icon, sub }: { id: any, label: string, icon: any, sub?: string }) => (
    <button 
      onClick={() => setPaymentMethod(id)}
      className={`w-full flex items-center justify-between p-5 rounded-2xl border transition-all mb-3 ${paymentMethod === id ? 'border-red-600 bg-red-50/20 shadow-sm' : 'border-gray-100 bg-white'}`}
    >
      <div className="flex items-center gap-4">
        <div className={`p-2.5 rounded-xl ${paymentMethod === id ? 'bg-red-600 text-white' : 'bg-gray-50 text-gray-400'}`}>
          <Icon size={20} />
        </div>
        <div className="text-left">
          <span className="text-[11px] font-black uppercase tracking-tight text-gray-800 block">{label}</span>
          {sub && <span className="text-[9px] font-bold text-green-600 uppercase mt-0.5">{sub}</span>}
        </div>
      </div>
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === id ? 'border-red-600 bg-red-600' : 'border-gray-200'}`}>
        {paymentMethod === id && <Check size={12} className="text-white" />}
      </div>
    </button>
  );

  return (
    <div className="bg-gray-50 h-full flex flex-col animate-in slide-in-from-right duration-300">
      {/* PROFESSIONAL HEADER */}
      <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center gap-4 sticky top-0 z-50 shadow-sm">
         <button onClick={onBack} className="p-2 bg-gray-50 rounded-full active:scale-90 transition-all">
           <ArrowLeft size={20} className="text-gray-400"/>
         </button>
         <h1 className="text-sm font-black uppercase tracking-widest text-gray-900">Checkout Terminal</h1>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
        {/* Shipping Summary */}
        <div className="bg-white p-6 border-b border-gray-100 mb-2">
           <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-1 h-3 bg-red-600 rounded-full"></div>
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Destination</h3>
              </div>
              <button onClick={onBack} className="text-[9px] font-black text-red-600 uppercase bg-red-50 px-2 py-1 rounded">Update</button>
           </div>
           <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <MapPin size={20} className="text-gray-400 mt-1" />
              <div className="min-w-0">
                 <p className="text-xs font-black uppercase text-gray-900 mb-1">{address.name}</p>
                 <p className="text-[10px] text-gray-500 font-medium uppercase leading-relaxed tracking-tight">
                    {address.house}, {address.area}, PIN: {address.pincode}
                 </p>
              </div>
           </div>
        </div>

        {/* Payment Methods */}
        <div className="p-6 bg-white mb-2 border-y border-gray-100">
           <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-3 bg-red-600 rounded-full"></div>
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Gateway Selection</h3>
           </div>
           <PaymentItem id="UPI" label="UPI / Mobile Pay" icon={Smartphone} sub="Instant ₹50 Discount Applied" />
           <PaymentItem id="CARD" label="Credit & Debit Cards" icon={CreditCard} />
           <PaymentItem id="COD" label="Pay on Delivery" icon={Banknote} />
        </div>

        {/* Trust Banner - Simplified */}
        <div className="mx-6 mt-4 p-5 bg-white rounded-3xl flex items-center gap-4 shadow-sm border border-gray-100">
           <div className="p-3 bg-red-50 text-red-600 rounded-2xl">
              <ShieldCheck size={24} />
           </div>
           <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-gray-900">SnapMEN Verified</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase mt-0.5">Secure Transaction Engine Active</p>
           </div>
        </div>

        {/* Pricing Summary */}
        <div className="p-6 bg-white mt-6 border-t border-gray-100">
           <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-3 bg-red-600 rounded-full"></div>
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Final Ledger</h3>
           </div>
           <div className="space-y-4">
              <div className="flex justify-between text-[11px] font-bold uppercase tracking-tight text-gray-500">
                <span>Consolidated MRP</span>
                <span className="text-gray-900 font-black italic">₹{totalItemsPrice}</span>
              </div>
              <div className="flex justify-between text-[11px] font-bold uppercase tracking-tight">
                <span className="text-gray-500">Product Discount</span>
                <span className="text-green-600 font-black">-₹{totalDiscount}</span>
              </div>
              {upiOffer > 0 && (
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-tight">
                  <span className="text-gray-500">Method Offer</span>
                  <span className="text-green-600 font-black">-₹{upiOffer}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-gray-100 pt-5 mt-2">
                <span className="text-xs font-black uppercase tracking-widest text-gray-900">Total Payable</span>
                <span className="text-xl font-black text-red-600 italic">₹{finalPrice}</span>
              </div>
           </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4 bg-white border-t border-gray-100 sticky bottom-0 flex items-center justify-between shadow-[0_-15px_30px_rgba(0,0,0,0.05)] z-50">
        <div className="flex flex-col">
          <p className="text-lg font-black text-gray-900 italic leading-none">₹{finalPrice}</p>
          <p className="text-[8px] font-black text-green-600 uppercase tracking-widest mt-1">Saving ₹{totalDiscount + upiOffer}</p>
        </div>
        <button 
          onClick={() => onPlaceOrder(paymentMethod)}
          className="bg-red-600 text-white px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[3px] flex items-center gap-3 shadow-xl active:scale-95 transition-transform"
        >
          Place Order <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default CheckoutView;
