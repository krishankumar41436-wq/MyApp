
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Filter, SortAsc, SearchX, Check, X, ArrowLeft, Search, Mic, Camera } from 'lucide-react';
import { ACCENT_COLOR } from '../constants';
import ProductGrid from './ProductGrid';
import { Product } from '../types';

interface SearchResultsProps {
  products: Product[];
  searchQuery: string;
  onAddToCart: (p: Product) => void;
  onProductClick: (p: Product) => void;
  onGoHome: () => void;
  onSearchUpdate: (q: string) => void;
  wishlist: Set<string>;
  onToggleWishlist: (id: string) => void;
}

type SortOption = 'POPULAR' | 'PRICE_LOW' | 'PRICE_HIGH' | 'RATING';

const SearchResults: React.FC<SearchResultsProps> = ({ 
  products,
  searchQuery, 
  onAddToCart, 
  onProductClick, 
  onGoHome, 
  onSearchUpdate,
  wishlist, 
  onToggleWishlist 
}) => {
  const [sortBy, setSortBy] = useState<SortOption>('POPULAR');
  const [showSortSheet, setShowSortSheet] = useState(false);
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    onSearchUpdate(localQuery);
    inputRef.current?.blur();
  };

  const clearAllFilters = () => {
    setSortBy('POPULAR');
  };

  const filteredProducts = useMemo(() => {
    let list = products.filter(product => {
      const query = searchQuery.toLowerCase();
      return (
        product.title.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    });

    switch (sortBy) {
      case 'PRICE_LOW': return [...list].sort((a, b) => a.price - b.price);
      case 'PRICE_HIGH': return [...list].sort((a, b) => b.price - a.price);
      case 'RATING': return [...list].sort((a, b) => b.rating - a.rating);
      default: return list;
    }
  }, [searchQuery, sortBy, products]);

  const SortItem = ({ label, value }: { label: string, value: SortOption }) => (
    <button 
      onClick={() => { setSortBy(value); setShowSortSheet(false); }}
      className="w-full flex items-center justify-between py-5 border-b border-gray-50 text-left px-2 active:bg-gray-50 transition-colors"
    >
      <span className={`text-sm font-black uppercase tracking-tight ${sortBy === value ? 'text-red-600' : 'text-gray-700'}`}>
        {label}
      </span>
      {sortBy === value && (
        <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
          <Check size={12} className="text-white" />
        </div>
      )}
    </button>
  );

  const hasActiveFilters = sortBy !== 'POPULAR';

  return (
    <div className="bg-white min-h-full pb-32 relative flex flex-col animate-in fade-in duration-300">
      {/* 1. Integrated Search Bar Header */}
      <div className="bg-white px-3 py-3 border-b border-gray-100 sticky top-0 z-50 flex items-center gap-2 shadow-sm">
        <button onClick={onGoHome} className="p-2 text-gray-600 active:bg-gray-50 rounded-full transition-colors">
          <ArrowLeft size={22} />
        </button>
        <form onSubmit={handleSearchSubmit} className="flex-1 bg-gray-100 rounded-xl flex items-center px-3 h-11 border border-gray-100 focus-within:bg-white focus-within:ring-2 focus-within:ring-red-50 transition-all">
          <Search size={16} className="text-gray-400 mr-2 flex-shrink-0" />
          <input 
            ref={inputRef}
            type="text" 
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            placeholder="Search fashion, grooming..." 
            className="bg-transparent text-sm w-full outline-none text-gray-800 font-bold placeholder-gray-400 h-full"
          />
          {localQuery && (
            <button type="button" onClick={() => setLocalQuery('')} className="p-1 text-gray-400">
              <X size={14} />
            </button>
          )}
        </form>
        <div className="flex gap-2 text-gray-400 ml-1">
          <Mic size={18} />
          <Camera size={18} />
        </div>
      </div>

      {/* 2. Results Info Bar */}
      <div className="px-4 py-3 bg-gray-50/50 flex justify-between items-center border-b border-gray-100">
        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
          {filteredProducts.length} PREMIUM ITEMS FOUND
        </p>
        {hasActiveFilters && (
          <button 
            onClick={clearAllFilters}
            className="text-[9px] font-black text-red-600 uppercase flex items-center gap-1 bg-white border border-red-100 px-2 py-1 rounded shadow-sm"
          >
            Reset <X size={10} />
          </button>
        )}
      </div>

      {/* 3. Products List */}
      {filteredProducts.length > 0 ? (
        <div className="flex-1">
          <ProductGrid 
            products={filteredProducts} 
            onAddToCart={onAddToCart} 
            onProductClick={onProductClick}
            wishlist={wishlist}
            onToggleWishlist={onToggleWishlist}
          />
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center py-20 px-8 text-center bg-white min-h-[60vh]">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6 border border-gray-100 shadow-inner">
            <SearchX size={48} className="text-gray-200" />
          </div>
          <h2 className="text-xl font-black text-gray-800 mb-2 uppercase tracking-tight">No results matched</h2>
          <p className="text-sm text-gray-400 mb-8 max-w-xs font-medium">Try different keywords or check your spelling.</p>
          <button 
            onClick={() => { setLocalQuery(''); onSearchUpdate(''); }} 
            className="w-full py-4 rounded-xl font-black text-white shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-transform uppercase tracking-widest text-xs" 
            style={{ backgroundColor: ACCENT_COLOR }}
          >
            Explore All Products
          </button>
        </div>
      )}

      {/* 4. Premium Sticky Bottom Actions */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md h-14 bg-white flex border-t border-gray-200 z-40 shadow-[0_-8px_15px_-1px_rgba(0,0,0,0.06)]">
        <button 
          onClick={() => setShowSortSheet(true)}
          className={`flex-1 flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-tight border-r border-gray-100 active:bg-gray-50 transition-colors
            ${sortBy !== 'POPULAR' ? 'text-red-600' : 'text-gray-800'}`}
        >
          <SortAsc size={16} /> 
          SORT {sortBy !== 'POPULAR' && <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>}
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-tight active:bg-gray-50 transition-colors text-gray-800">
          <Filter size={16} /> 
          FILTER
        </button>
      </div>

      {/* Sort Bottom Sheet */}
      {showSortSheet && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" onClick={() => setShowSortSheet(false)}></div>
          <div className="relative bg-white rounded-t-[32px] p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-8"></div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Sort Options</h3>
              <button onClick={() => setShowSortSheet(false)} className="p-2 bg-gray-50 rounded-full text-gray-400 active:text-red-600">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-1">
              <SortItem label="Popularity" value="POPULAR" />
              <SortItem label="Price: Low to High" value="PRICE_LOW" />
              <SortItem label="Price: High to Low" value="PRICE_HIGH" />
              <SortItem label="Customer Rating" value="RATING" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
