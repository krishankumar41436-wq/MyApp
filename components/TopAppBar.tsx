
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
  // Parsing app name for styling (e.g., SnapMEN -> Snap + MEN)
  const prefix = appName.toLowerCase().startsWith('snap') ? 'Snap' : '';
  const suffix = prefix ? appName.slice(4) : appName;

  return (
    <header className={`z-50 border-b pt-2 pb-1 px-4 sticky top-0 transition-all duration-300 ${isScrolled ? 'bg-white border-gray-100 shadow-md' : 'bg-[#E40046] border-[#E40046] shadow-none'}`}>
      <div className="flex items-center justify-between h-12">
        <div className="flex items-center gap-3">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('HOME')}>
            <h1 className={`text-xl font-black tracking-tighter italic ${isScrolled ? 'text-[#E40046]' : 'text-white'}`}>
              {prefix}<span className={`${isScrolled ? 'text-gray-900' : 'text-white'} not-italic uppercase`}>{suffix}</span>
            </h1>
          </div>
        </div>
        
        <div className={`flex items-center gap-1 ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
          {/* Search icon only shows when user scrolls down */}
          {isScrolled && (
            <button 
              onClick={onSearchFocus} 
              className="p-2 rounded-full transition-all active:scale-90 hover:bg-gray-50 animate-in fade-in slide-in-from-right-2 duration-300"
            >
              <Search size={22} />
            </button>
          )}
          
          <button onClick={onNotificationClick} className={`relative p-2 rounded-full transition-all active:scale-90 ${isScrolled ? 'hover:bg-gray-50' : 'hover:bg-white/10'}`}>
            <Bell size={22} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full border border-red-600"></span>
          </button>
          
          <button onClick={onWishlistClick} className={`relative p-2 rounded-full transition-all active:scale-90 ${isScrolled ? 'hover:bg-gray-50' : 'hover:bg-white/10'}`}>
            <Heart size={22} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopAppBar;
