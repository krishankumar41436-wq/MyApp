
import React from 'react';
import { 
  Package, ChevronRight, Heart, MapPin, 
  LogOut, ShieldCheck, Settings, User, Bell, HelpCircle, Ticket, CreditCard, ShieldAlert, Zap
} from 'lucide-react';
import { ViewState, StoreConfig } from '../types';
import { ACCENT_COLOR } from '../constants';

interface ProfileViewProps {
  storeConfig: StoreConfig;
  onNavigate: (view: ViewState) => void;
  onBack: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ storeConfig, onNavigate }) => {
  const QUICK_ACTIONS = [
    { label: 'Orders', icon: <Package size={20} />, target: 'ORDERS' as ViewState },
    { label: 'Wishlist', icon: <Heart size={20} />, target: 'WISHLIST' as ViewState },
    { label: 'Coupons', icon: <Ticket size={20} />, target: 'HOME' as ViewState },
    { label: 'Help', icon: <HelpCircle size={20} />, target: 'HOME' as ViewState },
  ];

  const MENU_GROUPS = [
    {
      title: 'Personal Account',
      items: [
        { icon: <User size={20} />, label: 'Profile Details', target: 'PROFILE_DETAILS' as ViewState, color: 'text-blue-500', visible: storeConfig.profileFeatures.showProfileDetails },
        { icon: <MapPin size={20} />, label: 'Saved Addresses', target: 'ADDRESS_LIST' as ViewState, color: 'text-green-500', visible: storeConfig.profileFeatures.showSavedAddresses },
        { icon: <CreditCard size={20} />, label: 'Payment Methods', target: 'PAYMENT_METHODS' as ViewState, color: 'text-orange-500', visible: storeConfig.profileFeatures.showPaymentMethods },
      ]
    },
    {
      title: 'Security & Support',
      items: [
        { icon: <Bell size={20} />, label: 'Notifications', target: 'NOTIFICATIONS' as ViewState, color: 'text-purple-500', visible: storeConfig.profileFeatures.showNotifications },
        { icon: <ShieldCheck size={20} />, label: 'Admin Terminal', target: 'ADMIN' as ViewState, color: 'text-red-500', visible: storeConfig.profileFeatures.showAdminAccess },
        { icon: <ShieldAlert size={20} />, label: 'Legal & Privacy', target: 'HOME' as ViewState, color: 'text-gray-400', visible: storeConfig.profileFeatures.showLegal },
      ]
    }
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50 animate-in fade-in">
      <div className="bg-white px-4 py-3 sticky top-0 z-30 shadow-sm border-b border-gray-100 flex items-center justify-between">
        <h1 className="text-xl font-black tracking-tighter italic" style={{ color: ACCENT_COLOR }}>
          Snap<span className="text-gray-900 not-italic uppercase">MEN</span>
        </h1>
        <button className="p-2 hover:bg-gray-50 rounded-full"><Settings size={20} className="text-gray-400" /></button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
        <div className="px-4 py-4">
          <div className="rounded-3xl overflow-hidden relative h-44 bg-neutral-900 shadow-xl border border-gray-800">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 bg-red-500"></div>
            <div className="absolute inset-0 flex flex-col justify-center p-6 text-white">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full border-2 border-red-600 p-0.5 bg-gray-800 shadow-xl relative">
                  <div className="w-full h-full rounded-full bg-gray-700 flex items-center justify-center overflow-hidden"><User size={32} className="text-gray-400" /></div>
                </div>
                <div>
                  <h2 className="text-xl font-black uppercase">Aryan Sharma</h2>
                  <div className="flex items-center gap-2 mt-1">
                     <span className="text-[8px] font-black uppercase px-2 py-0.5 rounded-md bg-gray-700 text-gray-400">
                        Elite Customer
                     </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white py-6 border-y border-gray-100 flex items-center justify-around px-4">
          {QUICK_ACTIONS.map((action, idx) => (
            <button key={idx} onClick={() => onNavigate(action.target)} className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-600 active:scale-95 border border-gray-100 shadow-sm">{action.icon}</div>
              <span className="text-[9px] font-black text-gray-700 uppercase tracking-tighter">{action.label}</span>
            </button>
          ))}
        </div>

        {MENU_GROUPS.map((group, gidx) => {
          const visibleItems = group.items.filter(i => i.visible);
          if (visibleItems.length === 0) return null;
          return (
            <div key={gidx} className="mt-4 bg-white border-y border-gray-100">
              <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-50"><div className="w-1 h-4 bg-red-600 rounded-full"></div><h2 className="text-[11px] font-black text-gray-400 uppercase tracking-widest">{group.title}</h2></div>
              <div className="divide-y divide-gray-50">
                {visibleItems.map((item, idx) => (
                  <button key={idx} onClick={() => onNavigate(item.target)} className="w-full flex items-center justify-between p-5 active:bg-gray-50 transition-colors group">
                    <div className="flex items-center gap-4"><div className={`${item.color} p-2 bg-gray-50 rounded-xl`}>{item.icon}</div><span className="text-xs font-bold text-gray-800 uppercase tracking-tight">{item.label}</span></div>
                    <ChevronRight size={18} className="text-gray-300 group-active:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          );
        })}

        <div className="px-4 mt-6">
          <button className="w-full h-14 bg-white border border-gray-100 rounded-2xl flex items-center justify-center gap-3 text-red-600 font-black uppercase text-[10px] tracking-[3px] shadow-sm active:bg-red-50 transition-all">
            <LogOut size={18} /> Sign Out Session
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
