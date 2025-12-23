
import React, { useMemo } from 'react';
import { Zap, Search, Mic, Camera, Flame, Sparkles, ChevronRight, Clock, ShieldCheck } from 'lucide-react';
import ProductGrid from './ProductGrid';
import { Product, Category, StoreConfig } from '../types';

interface HomeProps {
  storeConfig: StoreConfig;
  categories: Category[];
  products: Product[];
  onNavigateToSearch: () => void;
  onAddToCart: (p: Product) => void;
  onProductClick: (p: Product) => void;
  onCategoryClick: (cat: string) => void;
}

const Home: React.FC<HomeProps> = ({ 
  storeConfig,
  categories,
  products,
  onNavigateToSearch, 
  onAddToCart, 
  onProductClick,
  onCategoryClick
}) => {
  const flashDeals = useMemo(() => products.slice(0, 8), [products]);

  return (
    <div className="pb-24 bg-gray-50">
      {/* 1. SEARCH HEADER */}
      <div className="bg-[#E40046] px-4 pb-4 pt-1 shadow-md">
        <div 
          onClick={onNavigateToSearch}
          className="bg-white rounded-lg flex items-center px-4 h-11 border border-transparent transition-all cursor-text active:scale-[0.98] shadow-sm"
        >
          <Search size={18} className="text-gray-400 mr-3" />
          <div className="text-xs font-bold text-gray-400 flex-1 uppercase tracking-tight">
            Search Men's Fashion, Tech & More
          </div>
          <div className="flex items-center gap-3 text-gray-300 border-l pl-3 border-gray-100">
            <Mic size={18} />
            <Camera size={18} />
          </div>
        </div>
      </div>

      {/* 2. CATEGORY ICONS */}
      {storeConfig.showCategories && (
        <div className="bg-white py-5 overflow-x-auto no-scrollbar flex items-start px-4 gap-6">
          {categories.map((cat) => (
            <button 
              key={cat.id} 
              onClick={() => onCategoryClick(cat.name)}
              className="flex flex-col items-center gap-2 flex-shrink-0 active:scale-95 transition-transform"
            >
              <div className="w-14 h-14 rounded-full overflow-hidden border border-gray-100 bg-white p-0.5 shadow-sm">
                <img src={cat.icon} className="w-full h-full object-cover rounded-full" alt={cat.name} />
              </div>
              <span className="text-[9px] font-black text-gray-700 uppercase tracking-tighter">{cat.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* 3. HERO BANNER */}
      {storeConfig.showHero && (
        <div className="px-4 py-2">
          <div 
            className="rounded-xl overflow-hidden relative h-48 bg-gray-900 shadow-lg active:scale-[0.99] transition-all cursor-pointer" 
            onClick={onNavigateToSearch}
          >
            <img src={storeConfig.heroImage} className="w-full h-full object-cover opacity-80" alt="Banner" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white bg-gradient-to-t from-black/80 via-black/20 to-transparent">
              <span className="text-[8px] font-black uppercase tracking-[3px] bg-[#E40046] w-fit px-2 py-1 rounded mb-2 shadow-lg">{storeConfig.heroTag}</span>
              <h2 className="text-2xl font-black uppercase tracking-tight leading-tight">{storeConfig.heroTitle}</h2>
              <p className="text-[9px] opacity-90 uppercase font-black tracking-[4px] mt-1">{storeConfig.heroSubtitle}</p>
            </div>
          </div>
        </div>
      )}

      {/* 4. DEALS OF THE DAY */}
      {storeConfig.showFlashSale && (
        <section className="bg-white mt-2 py-4 border-y border-gray-100 shadow-sm">
          <div className="flex items-center justify-between px-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-red-50 p-1.5 rounded-lg text-[#E40046]">
                <Flame size={18} fill="currentColor" />
              </div>
              <div>
                <h2 className="text-[12px] font-black text-gray-900 uppercase tracking-widest">Deals of the Day</h2>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Clock size={10} className="text-gray-400" />
                  <p className="text-[8px] font-black text-red-600 uppercase tracking-widest">Ends In: 04h 22m 10s</p>
                </div>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto no-scrollbar flex gap-4 px-4 pb-2">
            {flashDeals.map((p) => (
              <div key={p.id} onClick={() => onProductClick(p)} className="w-32 flex-shrink-0 cursor-pointer group active:scale-95 transition-transform">
                <div className="aspect-[3/4] rounded-2xl bg-gray-50 overflow-hidden mb-2 relative border border-gray-100 shadow-inner">
                  <img src={p.image} className="w-full h-full object-cover group-hover:scale-105" alt={p.title} />
                  <div className="absolute top-2 left-2 bg-[#E40046] text-white text-[8px] font-black px-2 py-0.5 rounded-full shadow-lg">-{p.discount}%</div>
                </div>
                <p className="text-[11px] font-black text-gray-900 px-1">₹{p.price}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. TRENDING GRID */}
      {storeConfig.showTrending && (
        <section className="mt-4 bg-white">
          <div className="flex items-center justify-between px-4 py-5 border-b border-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-[#E40046] rounded-full"></div>
              <h2 className="text-[13px] font-black text-gray-900 uppercase tracking-widest italic">Curated Trends</h2>
            </div>
            <div className="flex items-center gap-1.5 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
               <ShieldCheck size={12} className="text-green-600" />
               <span className="text-[8px] font-black text-green-700 uppercase tracking-widest leading-none">Men Verified</span>
            </div>
          </div>
          <ProductGrid 
             products={products} 
             onAddToCart={onAddToCart} 
             onProductClick={onProductClick} 
          />
        </section>
      )}
    </div>
  );
};

export default Home;
