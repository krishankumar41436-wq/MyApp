
import React, { useMemo } from 'react';
import { Zap, Search, Mic, Camera, Flame, Clock, ShieldCheck } from 'lucide-react';
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
    <div className="pb-20 bg-gray-50">
      <div className="bg-[#E40046] px-3 pb-3 pt-0.5 shadow-md">
        <div 
          onClick={onNavigateToSearch}
          className="bg-white rounded flex items-center px-3 h-9 border border-transparent transition-all cursor-text active:scale-[0.98] shadow-sm"
        >
          <Search size={16} className="text-gray-400 mr-2" />
          <div className="text-[10px] font-bold text-gray-400 flex-1 uppercase tracking-tight">
            Search Men's Essentials
          </div>
          <div className="flex items-center gap-2.5 text-gray-300 border-l pl-2.5 border-gray-100">
            <Mic size={16} />
            <Camera size={16} />
          </div>
        </div>
      </div>

      {storeConfig.showCategories && (
        <div className="bg-white py-3 overflow-x-auto no-scrollbar flex items-start px-3 gap-4">
          {categories.map((cat) => (
            <button 
              key={cat.id} 
              onClick={() => onCategoryClick(cat.name)}
              className="flex flex-col items-center gap-1.5 flex-shrink-0 active:scale-95 transition-transform"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-100 bg-white p-0.5 shadow-sm">
                <img src={cat.icon} className="w-full h-full object-cover rounded-full" alt={cat.name} />
              </div>
              <span className="text-[8px] font-black text-gray-700 uppercase tracking-tighter">{cat.name}</span>
            </button>
          ))}
        </div>
      )}

      {storeConfig.showHero && (
        <div className="px-3 py-1.5">
          <div 
            className="rounded-lg overflow-hidden relative h-40 bg-gray-900 shadow-lg active:scale-[0.99] transition-all cursor-pointer" 
            onClick={onNavigateToSearch}
          >
            <img src={storeConfig.heroImage} className="w-full h-full object-cover opacity-80" alt="Banner" />
            <div className="absolute inset-0 flex flex-col justify-end p-4 text-white bg-gradient-to-t from-black/80 via-black/20 to-transparent">
              <span className="text-[7px] font-black uppercase tracking-[2px] bg-[#E40046] w-fit px-1.5 py-0.5 rounded mb-1.5 shadow-lg">{storeConfig.heroTag}</span>
              <h2 className="text-lg font-black uppercase tracking-tight leading-tight">{storeConfig.heroTitle}</h2>
              <p className="text-[7px] opacity-90 uppercase font-black tracking-[3px] mt-0.5">{storeConfig.heroSubtitle}</p>
            </div>
          </div>
        </div>
      )}

      {storeConfig.showFlashSale && (
        <section className="bg-white mt-1.5 py-3 border-y border-gray-100 shadow-sm">
          <div className="flex items-center justify-between px-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="bg-red-50 p-1 rounded text-[#E40046]">
                <Flame size={14} fill="currentColor" />
              </div>
              <div>
                <h2 className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Deals of the Day</h2>
                <div className="flex items-center gap-1 mt-0.5">
                  <Clock size={8} className="text-gray-400" />
                  <p className="text-[7px] font-black text-red-600 uppercase tracking-widest">Ends In: 04h 22m</p>
                </div>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto no-scrollbar flex gap-3 px-3 pb-1.5">
            {flashDeals.map((p) => (
              <div key={p.id} onClick={() => onProductClick(p)} className="w-24 flex-shrink-0 cursor-pointer group active:scale-95 transition-transform">
                <div className="aspect-[3/4] rounded-xl bg-gray-50 overflow-hidden mb-1.5 relative border border-gray-100 shadow-inner">
                  <img src={p.image} className="w-full h-full object-cover group-hover:scale-105" alt={p.title} />
                  <div className="absolute top-1.5 left-1.5 bg-[#E40046] text-white text-[7px] font-black px-1.5 py-0.5 rounded-full shadow-lg">-{p.discount}%</div>
                </div>
                <p className="text-[9px] font-black text-gray-900 px-1">₹{p.price}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {storeConfig.showTrending && (
        <section className="mt-3 bg-white">
          <div className="flex items-center justify-between px-3 py-4 border-b border-gray-50">
            <div className="flex items-center gap-2">
              <div className="w-1 h-5 bg-[#E40046] rounded-full"></div>
              <h2 className="text-[11px] font-black text-gray-900 uppercase tracking-widest italic">Curated Trends</h2>
            </div>
            <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full border border-green-100">
               <ShieldCheck size={10} className="text-green-600" />
               <span className="text-[7px] font-black text-green-700 uppercase tracking-widest leading-none">Men Verified</span>
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
