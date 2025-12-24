
import React from 'react';
import { Heart, Bell, Search } from 'lucide-react';
import { ViewState } from '../types';

interface TopAppBarProps {
  onSearchFocus: () => void;
  onNavigate: (view: ViewState) => void;
  onWishlistClick: () => void;
  onNotificationClick: () => void;
  currentView: ViewState;
  isScrolled?: boolean;
  appName?: string;
}

const TopAppBar: React.FC<TopAppBarProps> = ({ 
  onSearchFocus,
  onNavigate, 
  onWishlistClick,
  onNotificationClick,
  isScrolled,
  appName = "SnapMEN"
}) => {
  const prefix = appName.toLowerCase().startsWith('snap') ? 'Snap' : '';
  const suffix = prefix ? appName.slice(4) : appName;

  return (
    <header className={`z-50 border-b pt-1 pb-1 px-3 sticky top-0 transition-all duration-300 ${isScrolled ? 'bg-white border-gray-100 shadow-sm' : 'bg-[#E40046] border-[#E40046] shadow-none'}`}>
      <div className="flex items-center justify-between h-10">
        <div className="flex items-center gap-2">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('HOME')}>
            <h1 className={`text-lg font-black tracking-tighter italic ${isScrolled ? 'text-[#E40046]' : 'text-white'}`}>
              {prefix}<span className={`${isScrolled ? 'text-gray-900' : 'text-white'} not-italic uppercase`}>{suffix}</span>
            </h1>
          </div>
        </div>
        
        <div className={`flex items-center gap-0.5 ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
          {isScrolled && (
            <button 
              onClick={onSearchFocus} 
              className="p-1.5 rounded-full transition-all active:scale-90 hover:bg-gray-50 animate-in fade-in slide-in-from-right-2 duration-300"
            >
              <Search size={18} />
            </button>
          )}
          
          <button onClick={onNotificationClick} className={`relative p-1.5 rounded-full transition-all active:scale-90 ${isScrolled ? 'hover:bg-gray-50' : 'hover:bg-white/10'}`}>
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-yellow-400 rounded-full border border-red-600"></span>
          </button>
          
          <button onClick={onWishlistClick} className={`relative p-1.5 rounded-full transition-all active:scale-90 ${isScrolled ? 'hover:bg-gray-50' : 'hover:bg-white/10'}`}>
            <Heart size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopAppBar;
