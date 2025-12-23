
import React from 'react';
import { ChevronLeft, CreditCard, Plus, Trash2, ShieldCheck, Zap } from 'lucide-react';

interface PaymentMethodsProps {
  onBack: () => void;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ onBack }) => {
  return (
    <div className="bg-white min-h-screen flex flex-col p-6 animate-in slide-in-from-right duration-300">
      <button onClick={onBack} className="mb-8 flex items-center gap-2 text-gray-400 font-black uppercase text-[10px] tracking-widest">
        <ChevronLeft size={16}/> Back
      </button>

      <div className="space-y-6">
        <h2 className="text-2xl font-black uppercase italic">Payment Vault</h2>
        
        {/* Elite Credit Card UI */}
        <div className="bg-neutral-900 p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group border border-white/5">
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-red-600/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-12">
              <Zap size={28} className="text-yellow-500 fill-yellow-500" />
              <p className="text-[10px] font-black uppercase tracking-[4px] text-gray-500">Titanium Elite</p>
            </div>
            
            <p className="text-lg tracking-[6px] font-medium mb-8">•••• •••• •••• 4210</p>
            
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[8px] uppercase text-gray-500 font-black tracking-widest mb-1">Card Holder</p>
                <p className="text-[10px] font-black uppercase">ARYAN SHARMA</p>
              </div>
              <div className="text-right">
                <p className="text-[8px] uppercase text-gray-500 font-black tracking-widest mb-1">Expiry</p>
                <p className="text-[10px] font-black">12 / 28</p>
              </div>
            </div>
          </div>
        </div>

        <button className="w-full flex items-center justify-between p-6 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 text-gray-400 active:scale-95 transition-all">
          <div className="flex items-center gap-4">
            <Plus size={20} />
            <span className="text-xs font-black uppercase tracking-widest">Add New Instrument</span>
          </div>
          <ChevronLeft size={18} className="rotate-180" />
        </button>

        <div className="pt-10 space-y-4">
           <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-3 bg-red-600 rounded-full"></div>
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Security Assurance</h3>
           </div>
           <div className="p-5 bg-white rounded-2xl border border-gray-100 flex items-center gap-4">
              <ShieldCheck size={24} className="text-blue-500" />
              <p className="text-[10px] font-black text-gray-500 uppercase leading-snug tracking-tight">
                All credentials are PCI-DSS Compliant and encrypted via 256-Bit SSL.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
