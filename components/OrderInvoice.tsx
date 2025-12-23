
import React from 'react';
import { ArrowLeft, Download, Printer, ShieldCheck, FileText } from 'lucide-react';
import { Order } from '../types';
import { ACCENT_COLOR } from '../constants';

interface OrderInvoiceProps {
  order: Order;
  onBack: () => void;
}

const OrderInvoice: React.FC<OrderInvoiceProps> = ({ order, onBack }) => {
  return (
    <div className="bg-white min-h-screen flex flex-col animate-in fade-in duration-500">
      {/* HEADER */}
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-50">
        <button onClick={onBack} className="p-2 bg-gray-50 rounded-full active:scale-90 transition-all">
          <ArrowLeft size={20} className="text-gray-400" />
        </button>
        <h1 className="text-sm font-black text-gray-900 uppercase tracking-widest">Tax Invoice</h1>
        <div className="flex gap-2">
          <button className="p-2 text-blue-600 bg-blue-50 rounded-full"><Download size={18}/></button>
          <button className="p-2 text-gray-400 bg-gray-50 rounded-full"><Printer size={18}/></button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
        {/* INVOICE CONTAINER - Visualizing as a real document */}
        <div className="border border-gray-100 rounded-lg p-6 bg-white shadow-sm space-y-8 relative overflow-hidden">
           {/* PAID STAMP */}
           <div className="absolute top-10 right-4 -rotate-12 border-4 border-green-600/30 text-green-600/30 px-6 py-2 rounded-xl text-3xl font-black uppercase tracking-[10px] pointer-events-none">
              PAID
           </div>

           {/* 1. SELLER & BUYER DETAILS */}
           <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                 <h2 className="text-xl font-black tracking-tighter italic mb-3" style={{ color: ACCENT_COLOR }}>
                    Snap<span className="text-gray-900 not-italic uppercase">MEN</span>
                 </h2>
                 <div className="text-[8px] font-bold text-gray-400 uppercase leading-relaxed tracking-widest space-y-0.5">
                    <p>Elite Commerce Pvt. Ltd.</p>
                    <p>Building 42, Silicon Valley Road</p>
                    <p>Whitefield, Bangalore, KA - 560066</p>
                    <p>GSTIN: 29AABCX4210M1Z2</p>
                 </div>
              </div>
              <div className="text-right">
                 <p className="text-[10px] font-black uppercase text-gray-900 mb-1">Tax Invoice</p>
                 <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-1">#{order.id}</p>
                 <p className="text-[8px] font-black uppercase text-gray-600">{order.date}</p>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-8 border-y border-gray-100 py-6">
              <div>
                 <h3 className="text-[9px] font-black uppercase text-gray-400 tracking-widest mb-3">Billed To</h3>
                 <div className="text-[10px] font-black uppercase text-gray-900 space-y-1">
                    <p>{order.address.name}</p>
                    <p className="text-gray-500 font-medium tracking-tight leading-relaxed line-clamp-2">
                       {order.address.house}, {order.address.area}
                    </p>
                    <p className="text-gray-500 font-medium tracking-tight">PIN: {order.address.pincode}</p>
                 </div>
              </div>
              <div>
                 <h3 className="text-[9px] font-black uppercase text-gray-400 tracking-widest mb-3">Remittance</h3>
                 <div className="text-[10px] font-black uppercase text-gray-900 space-y-1">
                    <p>Method: {order.paymentMethod}</p>
                    <p>Ref ID: {order.id.replace('ORD', 'TXN')}</p>
                    <p className="text-green-600">Settlement: Success</p>
                 </div>
              </div>
           </div>

           {/* 2. ITEM TABLE */}
           <div className="space-y-4">
              <div className="grid grid-cols-12 gap-4 text-[8px] font-black uppercase text-gray-300 tracking-widest border-b border-gray-50 pb-2">
                 <div className="col-span-6">Description</div>
                 <div className="col-span-2 text-center">HSN</div>
                 <div className="col-span-1 text-center">QTY</div>
                 <div className="col-span-3 text-right">Amount</div>
              </div>
              
              {order.items.map(item => (
                <div key={item.id} className="grid grid-cols-12 gap-4 text-[10px] font-bold text-gray-900 uppercase items-center pb-2">
                   <div className="col-span-6">
                      <p className="font-black text-gray-900 truncate">{item.title}</p>
                      <p className="text-[8px] text-gray-400 font-black">{item.brand}</p>
                   </div>
                   <div className="col-span-2 text-center text-gray-400 text-[8px]">620520</div>
                   <div className="col-span-1 text-center italic">{item.quantity}</div>
                   <div className="col-span-3 text-right font-black">₹{(item.price * item.quantity).toLocaleString()}</div>
                </div>
              ))}
           </div>

           {/* 3. FINAL SUMMARY */}
           <div className="flex flex-col items-end pt-8 border-t border-gray-100 space-y-3">
              <div className="w-full max-w-[180px] space-y-2">
                 <div className="flex justify-between text-[10px] font-bold uppercase text-gray-400 tracking-widest">
                    <span>Taxable Value</span>
                    <span className="text-gray-900 font-black">₹{(order.subTotal - order.discount).toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between text-[10px] font-bold uppercase text-gray-400 tracking-widest">
                    <span>IGST (5%)</span>
                    <span className="text-gray-900 font-black">₹{order.tax.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between text-[10px] font-bold uppercase text-gray-400 tracking-widest">
                    <span>Shipping</span>
                    <span className="text-green-600 font-black">{order.shipping > 0 ? `₹${order.shipping}` : 'FREE'}</span>
                 </div>
                 <div className="flex justify-between items-end pt-3 border-t-2 border-gray-900">
                    <span className="text-xs font-black uppercase tracking-widest text-gray-900 italic">Total Payable</span>
                    <span className="text-xl font-black text-gray-900 italic">₹{order.total.toLocaleString()}</span>
                 </div>
              </div>
           </div>

           {/* FOOTER BADGES */}
           <div className="pt-12 flex items-center justify-between opacity-50 grayscale">
              <div className="flex items-center gap-3">
                 <ShieldCheck size={24} />
                 <div className="text-[7px] font-black uppercase tracking-widest">
                    <p>Computer Generated</p>
                    <p>No Signature Required</p>
                 </div>
              </div>
              <div className="h-12 w-12 border-2 border-gray-100 rounded-lg bg-gray-50 flex items-center justify-center p-2">
                 <div className="w-full h-full bg-gray-200 rounded"></div> {/* QR CODE PLACEHOLDER */}
              </div>
           </div>
        </div>

        <div className="mt-8 bg-blue-50 p-6 rounded-3xl border border-blue-100 flex items-start gap-4">
           <div className="p-2 bg-white rounded-xl text-blue-600 shadow-sm"><FileText size={18}/></div>
           <div>
              <p className="text-[10px] font-black uppercase text-blue-900 tracking-widest">Policy Note</p>
              <p className="text-[9px] text-blue-800 font-medium leading-relaxed mt-1 uppercase tracking-tight">Return requests must be initiated within 7 days. Reference the Invoice ID in all communications.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default OrderInvoice;
