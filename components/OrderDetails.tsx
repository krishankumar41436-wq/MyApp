
import React from 'react';
import { 
  ArrowLeft, MapPin, CheckCircle, Package, 
  Truck, AlertCircle, Clock
} from 'lucide-react';
import { Order } from '../types';

interface OrderDetailsProps {
  order: Order;
  onBack: () => void;
  onViewInvoice: () => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order, onBack, onViewInvoice }) => {
  const steps = [
    { label: 'Ordered', isDone: true, time: order.date },
    { label: 'Shipped', isDone: order.status !== 'Placed', time: 'Pending' },
    { label: 'Out for Delivery', isDone: ['Delivered', 'Out for Delivery'].includes(order.status), time: 'Pending' },
    { label: 'Delivered', isDone: order.status === 'Delivered', time: 'Expected' }
  ];

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col animate-in slide-in-from-right duration-300 max-w-md mx-auto">
      {/* Header */}
      <div className="bg-white px-4 py-4 sticky top-0 z-50 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-1 active:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft size={24} className="text-gray-800" />
          </button>
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">Order Details</span>
            <span className="text-sm font-black text-gray-800 mt-0.5">#{order.id}</span>
          </div>
        </div>
        <button onClick={onViewInvoice} className="text-[10px] font-black text-red-600 uppercase bg-red-50 px-3 py-1.5 rounded border border-red-100">
          Invoice
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Simple Status Card */}
        <div className="bg-white p-6 mb-2 border-b border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-green-50 text-green-600 rounded-xl">
              <CheckCircle size={22} />
            </div>
            <div>
              <h3 className="text-sm font-black text-gray-900 uppercase">Item {order.status}</h3>
              <p className="text-[11px] text-gray-500 font-medium">Standard delivery confirmed for this package.</p>
            </div>
          </div>
          
          <div className="space-y-6 relative pl-4">
            <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gray-100"></div>
            {steps.map((step, i) => (
              <div key={i} className="flex gap-6 items-start relative z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step.isDone ? 'bg-red-500 border-red-500' : 'bg-white border-gray-200'}`}>
                  {step.isDone ? <CheckCircle size={16} className="text-white" /> : <div className="w-2 h-2 rounded-full bg-gray-200" />}
                </div>
                <div className="flex-1">
                  <p className={`text-xs font-black uppercase tracking-tight ${step.isDone ? 'text-gray-900' : 'text-gray-300'}`}>{step.label}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5 font-bold uppercase">{step.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white p-6 mb-2 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={18} className="text-gray-400" />
            <span className="text-xs font-black text-gray-900 uppercase tracking-widest">Delivery Address</span>
          </div>
          <div className="text-[11px] text-gray-500 space-y-1 ml-7 uppercase font-bold tracking-tight">
            <p className="text-gray-900 font-black mb-1">{order.address.name}</p>
            <p className="leading-relaxed">{order.address.house}, {order.address.area}</p>
            <p>Mobile: +91 {order.address.mobile}</p>
          </div>
        </div>

        {/* Items List */}
        <div className="bg-white p-6 mb-2 border-b border-gray-100">
          <span className="text-xs font-black text-gray-900 uppercase tracking-widest block mb-5">Order Manifest</span>
          <div className="space-y-4">
            {order.items.map(item => (
              <div key={item.id} className="flex gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <img src={item.image} className="w-16 h-20 object-cover rounded shadow-sm" alt={item.title}/>
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <p className="text-[11px] font-black text-gray-900 uppercase truncate">{item.title}</p>
                  <p className="text-[9px] text-red-500 font-black mt-1 uppercase tracking-widest">{item.brand}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs font-black text-gray-900 italic">₹{item.price}</span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase">Qty: {item.quantity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Total Summary */}
        <div className="bg-white p-6 mb-10 border-b border-gray-100">
          <span className="text-xs font-black text-gray-900 uppercase tracking-widest block mb-4">Payment Summary</span>
          <div className="space-y-3">
            <div className="flex justify-between text-[11px] font-bold uppercase text-gray-400">
              <span>Final Price Total</span>
              <span className="text-gray-900 font-black italic">₹{order.total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-[11px] font-bold uppercase text-gray-400">
              <span>Payment Mode</span>
              <span className="text-gray-900 font-black">{order.paymentMethod}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Support Action */}
      <div className="bg-white border-t border-gray-100 p-4 sticky bottom-0 flex gap-3 z-20">
        <button className="flex-1 h-12 border border-gray-200 text-gray-900 font-black rounded-xl uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 active:bg-gray-50">
          <AlertCircle size={18} className="text-red-500" /> Need Help?
        </button>
        {order.status === 'Delivered' && (
          <button className="flex-1 h-12 bg-black text-white font-black rounded-xl uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 active:bg-gray-900">
            Return Order
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
