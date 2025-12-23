
import React from 'react';
import { ArrowLeft, Crown, Check, Zap, Truck, Star } from 'lucide-react';
import { MembershipTier } from '../types';

interface MembershipViewProps {
  currentTier: MembershipTier;
  onUpgrade: (tier: MembershipTier) => void;
  onBack: () => void;
}

const MembershipView: React.FC<MembershipViewProps> = ({ currentTier, onUpgrade, onBack }) => {
  const TIERS = [
    { 
      id: 'STANDARD' as MembershipTier, 
      name: 'Standard', 
      price: 'Free',
      color: 'bg-gray-100 text-gray-500',
      benefits: ['Access to all products', 'Standard Shipping', '7-day returns']
    },
    { 
      id: 'PRO' as MembershipTier, 
      name: 'Elite Pro', 
      price: '₹299/mo',
      color: 'bg-red-600 text-white shadow-red-200',
      benefits: ['Flat 5% Extra Discount', 'Priority Support', 'Access to Elite Sales', 'Faster Refunds']
    },
    { 
      id: 'LEGEND' as MembershipTier, 
      name: 'Elite Legend', 
      price: '₹999/yr',
      color: 'bg-neutral-900 text-yellow-500 shadow-neutral-300',
      benefits: ['Flat 10% Extra Discount', 'Zero Shipping Fees Always', 'Personal Stylist', 'VIP Event Access', 'Birthday Rewards']
    }
  ];

  return (
    <div className="bg-white min-h-screen flex flex-col animate-in slide-in-from-right">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-4 bg-white sticky top-0 z-10">
        <button onClick={onBack} className="p-2 bg-gray-50 rounded-full"><ArrowLeft size={20}/></button>
        <h1 className="text-sm font-black uppercase tracking-widest">Elite Membership</h1>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-8 pb-32">
        <div className="text-center space-y-2">
           <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Crown size={40} className="text-red-600" />
           </div>
           <h2 className="text-2xl font-black uppercase italic">SnapMEN <span className="text-red-600">ELITE</span></h2>
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Upgrade your lifestyle with exclusive benefits</p>
        </div>

        <div className="space-y-6">
          {TIERS.map((tier) => (
            <div 
              key={tier.id} 
              className={`p-6 rounded-[2.5rem] border transition-all relative overflow-hidden ${currentTier === tier.id ? 'border-red-600 bg-red-50/20' : 'border-gray-100 bg-white'}`}
            >
               {currentTier === tier.id && (
                 <div className="absolute top-4 right-6 bg-red-600 text-white text-[8px] font-black px-3 py-1 rounded-full uppercase">Current</div>
               )}
               
               <div className="flex justify-between items-end mb-6">
                  <div>
                    <h3 className="text-lg font-black uppercase italic">{tier.name}</h3>
                    <p className="text-2xl font-black mt-1">{tier.price}</p>
                  </div>
                  <div className={`p-4 rounded-3xl ${tier.color}`}><Zap size={24}/></div>
               </div>

               <div className="space-y-3">
                  {tier.benefits.map((b, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                       <div className="w-5 h-5 bg-green-50 text-green-600 rounded-full flex items-center justify-center"><Check size={12}/></div>
                       <span className="text-[10px] font-bold text-gray-700 uppercase tracking-tight">{b}</span>
                    </div>
                  ))}
               </div>

               {currentTier !== tier.id && (
                 <button 
                   onClick={() => onUpgrade(tier.id)}
                   className="w-full mt-8 py-4 bg-gray-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl active:scale-95 transition-all"
                 >
                   Become A {tier.name}
                 </button>
               )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MembershipView;
