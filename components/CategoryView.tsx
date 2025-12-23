
import React, { useState } from 'react';
import { Search, ChevronRight, LayoutGrid, Zap, Mic, Camera, Sparkles } from 'lucide-react';
import { Category } from '../types';
import { ACCENT_COLOR } from '../constants';

interface CategoryViewProps {
  categories: Category[];
  onSubCategoryClick: (categoryName: string, subCategoryName: string) => void;
}

const CategoryView: React.FC<CategoryViewProps> = ({ categories, onSubCategoryClick }) => {
  const [activeTab, setActiveTab] = useState(categories[0]?.id || '');
  const activeCategory = categories.find(c => c.id === activeTab) || categories[0];

  return (
    <div className="flex flex-col h-full bg-white animate-in fade-in duration-500">
      {/* Redundant header removed - handled by TopAppBar in App.tsx */}

      {/* 1. CATEGORY DASHBOARD LAYOUT */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Elite Sidebar (Left) */}
        <div className="w-20 bg-gray-50 border-r border-gray-100 flex flex-col overflow-y-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`py-5 px-1 flex flex-col items-center gap-2 transition-all relative
                ${activeTab === cat.id ? 'bg-white' : 'text-gray-400'}`}
            >
              {/* Active Indicator Bar */}
              {activeTab === cat.id && (
                <div className="absolute left-0 top-4 bottom-4 w-1 rounded-r-full bg-red-600 shadow-[2px_0_8px_rgba(228,0,70,0.3)]"></div>
              )}
              
              <div className={`w-11 h-11 rounded-full overflow-hidden border-2 transition-all duration-300 ${activeTab === cat.id ? 'border-red-100 scale-110 shadow-md ring-2 ring-red-50' : 'border-transparent opacity-50 grayscale'}`}>
                <img src={cat.icon} className="w-full h-full object-cover" alt={cat.name} />
              </div>
              <span className={`text-[8px] font-black text-center leading-tight uppercase tracking-tighter max-w-[60px]
                ${activeTab === cat.id ? 'text-red-600' : 'text-gray-400'}`}>
                {cat.name}
              </span>
            </button>
          ))}
          
          <div className="mt-auto py-8 flex flex-col items-center opacity-20">
             <Sparkles size={16} />
          </div>
        </div>

        {/* Content Showcase (Right) */}
        <div className="flex-1 overflow-y-auto p-4 no-scrollbar bg-white">
          
          {/* Category Banner (Style like Home Banner) */}
          <div className="mb-6 rounded-2xl overflow-hidden relative h-32 bg-neutral-900 shadow-sm border border-gray-100">
             <img 
               src={activeCategory.banner || activeCategory.icon} 
               className="w-full h-full object-cover opacity-60" 
               alt={activeCategory.name} 
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                <span className="text-[8px] font-black uppercase tracking-[3px] text-red-500 mb-1">Catalog Focus</span>
                <h2 className="text-sm font-black text-white uppercase tracking-widest leading-none">
                  {activeCategory.name} Hub
                </h2>
             </div>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-4 bg-red-600 rounded-full"></div>
            <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Available Sections
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {activeCategory.subCategories.map((sub) => (
              <button
                key={sub.id}
                onClick={() => onSubCategoryClick(activeCategory.name, sub.name)}
                className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-2xl border border-gray-100 active:scale-95 transition-all group"
              >
                <div className="aspect-square w-full rounded-xl overflow-hidden shadow-sm bg-white border border-white group-hover:border-red-50 transition-colors">
                  <img src={sub.icon} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={sub.name} />
                </div>
                <span className="text-[9px] font-black text-gray-800 uppercase tracking-tight text-center leading-none mt-1">
                  {sub.name}
                </span>
              </button>
            ))}
            
            {/* View All Placeholder */}
            <button
               onClick={() => onSubCategoryClick(activeCategory.name, '')}
               className="flex flex-col items-center justify-center gap-2 p-3 bg-white rounded-2xl border-2 border-dashed border-gray-100 active:bg-gray-50 transition-all text-gray-300"
            >
               <LayoutGrid size={24} />
               <span className="text-[8px] font-black uppercase tracking-widest">View All</span>
            </button>
          </div>

          {activeCategory.subCategories.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 opacity-20">
               <Zap size={48} />
               <p className="text-[9px] font-black uppercase mt-4 tracking-[4px]">Syncing Stocks</p>
            </div>
          )}
          
          <div className="mt-12 p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-3">
             <div className="bg-white p-1.5 rounded-lg text-blue-600 shadow-sm">
                <Sparkles size={14} fill="currentColor" />
             </div>
             <div>
                <p className="text-[9px] font-black text-blue-900 uppercase tracking-widest">New Arrival</p>
                <p className="text-[10px] text-blue-800 font-medium leading-relaxed mt-0.5">Explore the latest {activeCategory.name} from top brands across the globe.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryView;
