
import React, { useState, useMemo, useEffect } from 'react';
import { ArrowLeft, Search, X, TrendingUp, ChevronRight, Mic, Camera, SlidersHorizontal } from 'lucide-react';
import { TRENDING_SEARCHES } from '../constants';
import { Product } from '../types';
import ProductGrid from './ProductGrid';

interface SearchScreenProps {
  products: Product[];
  onBack: () => void;
  onAddToCart: (p: Product) => void;
  onProductClick: (p: Product) => void;
  wishlist: Set<string>;
  onToggleWishlist: (id: string) => void;
}

const SearchScreen: React.FC<SearchScreenProps> = ({ 
  products, 
  onBack, 
  onAddToCart, 
  onProductClick,
  wishlist,
  onToggleWishlist
}) => {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'POPULAR' | 'LOW_HIGH' | 'HIGH_LOW' | 'RATING'>('POPULAR');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const brands = useMemo(() => Array.from(new Set(products.map(p => p.brand))), [products]);

  const filteredProducts = useMemo(() => {
    let result = products.filter(p => 
      p.title.toLowerCase().includes(query.toLowerCase()) || 
      p.brand.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
    );

    if (selectedBrand) {
      result = result.filter(p => p.brand === selectedBrand);
    }

    if (sortBy === 'LOW_HIGH') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'HIGH_LOW') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'RATING') result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [query, products, sortBy, selectedBrand]);

  return (
    <div className="fixed inset-0 max-w-md mx-auto bg-white z-[200] flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-200">
      {/* Header */}
      <div className="flex flex-col border-b border-gray-100 bg-white">
        <div className="flex items-center px-2 h-16">
          <button onClick={onBack} className="p-2 text-gray-600 active:bg-gray-100 rounded-full">
            <ArrowLeft size={22} />
          </button>
          <div className="flex-1 ml-1 bg-gray-100 rounded-xl flex items-center px-3 h-11 border border-gray-100 focus-within:ring-2 focus-within:ring-red-50 focus-within:bg-white transition-all">
            <Search size={18} className="text-gray-400 mr-2 flex-shrink-0" />
            <input 
              autoFocus
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search fashion, gadgets..." 
              className="bg-transparent text-sm w-full outline-none text-gray-800 font-bold placeholder-gray-400 h-full"
            />
            {query ? (
              <button onClick={() => setQuery('')} className="p-1 text-gray-400">
                <X size={16} />
              </button>
            ) : (
              <div className="flex items-center gap-2 text-gray-400">
                <Mic size={18} />
                <Camera size={18} />
              </div>
            )}
          </div>
          <button 
            onClick={() => setShowFilters(true)}
            className={`p-3 ml-1 rounded-xl transition-colors ${showFilters || selectedBrand ? 'text-red-600 bg-red-50' : 'text-gray-400'}`}
          >
            <SlidersHorizontal size={20} />
          </button>
        </div>

        {/* Quick Sort Bar */}
        {query && (
          <div className="flex px-4 py-2 gap-2 overflow-x-auto no-scrollbar bg-gray-50/50">
             <button 
               onClick={() => setSortBy('POPULAR')}
               className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest whitespace-nowrap border ${sortBy === 'POPULAR' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-500 border-gray-200'}`}
             >
               Popularity
             </button>
             <button 
               onClick={() => setSortBy('LOW_HIGH')}
               className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest whitespace-nowrap border ${sortBy === 'LOW_HIGH' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-500 border-gray-200'}`}
             >
               Price Low-High
             </button>
             <button 
               onClick={() => setSortBy('RATING')}
               className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest whitespace-nowrap border ${sortBy === 'RATING' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-500 border-gray-200'}`}
             >
               Customer Rating
             </button>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
        {!query ? (
          <div className="p-5">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] mb-5">Trending Now</h3>
            <div className="space-y-1">
              {TRENDING_SEARCHES.map((item, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setQuery(item)}
                  className="w-full flex items-center justify-between py-3.5 px-1 active:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <TrendingUp size={16} className="text-gray-300" />
                    <span className="text-xs font-black text-gray-700 uppercase">{item}</span>
                  </div>
                  <ChevronRight size={14} className="text-gray-300" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in duration-300">
            <div className="px-4 py-2 text-[9px] font-black text-gray-400 uppercase tracking-widest bg-white">
              Showing {filteredProducts.length} items for "{query}"
            </div>
            <ProductGrid 
              products={filteredProducts} 
              onAddToCart={onAddToCart} 
              onProductClick={onProductClick}
              wishlist={wishlist}
              onToggleWishlist={onToggleWishlist}
            />
          </div>
        )}
      </div>

      {/* Filter Modal */}
      {showFilters && (
        <div className="fixed inset-0 z-[300] flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" onClick={() => setShowFilters(false)}></div>
          <div className="relative bg-white rounded-t-[2.5rem] p-8 space-y-8 animate-in slide-in-from-bottom duration-300">
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto -mt-2"></div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Filters</h3>
              <button 
                onClick={() => { setSelectedBrand(null); setSortBy('POPULAR'); }}
                className="text-[10px] font-black text-red-600 uppercase"
              >
                Reset All
              </button>
            </div>

            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Select Brand</h4>
              <div className="flex flex-wrap gap-2">
                {brands.map(brand => (
                  <button 
                    key={brand}
                    onClick={() => setSelectedBrand(selectedBrand === brand ? null : brand)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-tight transition-all border ${selectedBrand === brand ? 'bg-red-600 text-white border-red-600 shadow-lg shadow-red-100' : 'bg-gray-50 text-gray-500 border-gray-100'}`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => setShowFilters(false)}
              className="w-full bg-gray-900 text-white py-5 rounded-[2rem] font-black uppercase tracking-widest text-[11px] shadow-2xl"
            >
              Apply Filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchScreen;
