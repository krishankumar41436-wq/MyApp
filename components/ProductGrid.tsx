
import React from 'react';
import { Heart, Star, Zap } from 'lucide-react';
import { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  onProductClick?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  wishlist?: Set<string>;
  onToggleWishlist?: (id: string) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  onProductClick, 
  wishlist,
  onToggleWishlist 
}) => {
  return (
    <div className="grid grid-cols-2 gap-px bg-gray-100 border-y border-gray-100">
      {products.map((product) => {
        const isWishlisted = wishlist?.has(product.id);

        return (
          <div 
            key={product.id} 
            className="bg-white p-3 flex flex-col relative active:bg-gray-50 transition-colors group"
            onClick={() => onProductClick?.(product)}
          >
            {product.discount > 45 && (
              <div className="absolute top-3 left-3 z-10 bg-gray-900 text-white text-[6px] font-black px-1.5 py-0.5 rounded-sm uppercase tracking-tighter flex items-center gap-0.5 shadow-sm">
                <Zap size={7} fill="white" className="text-yellow-400" /> Hot Deal
              </div>
            )}

            <button 
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist?.(product.id);
              }}
              className="absolute top-3 right-3 z-10 p-1.5 rounded-lg bg-white/80 backdrop-blur-md shadow-sm border border-gray-50 hover:bg-white transition-colors"
            >
              <Heart size={12} className={isWishlisted ? 'text-red-600 fill-red-600' : 'text-gray-400'} />
            </button>
            
            <div className="aspect-[3/4] overflow-hidden mb-2 rounded-xl bg-gray-50 border border-gray-50 shadow-inner">
              <img 
                src={product.image} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                alt={product.title} 
              />
            </div>
            
            <div className="flex flex-col flex-1">
              <div className="flex items-center gap-1 mb-0.5">
                <p className="text-[7px] font-black text-red-600 uppercase tracking-widest leading-none">
                  {product.brand}
                </p>
              </div>
              
              <h3 className="text-[10px] font-bold text-gray-800 line-clamp-1 mb-1 tracking-tight">
                {product.title}
              </h3>
              
              <div className="flex items-center gap-1.5 mb-2">
                 <div className="flex items-center gap-0.5 px-1 py-0.5 bg-green-600 text-white rounded text-[7px] font-black">
                    {product.rating} <Star size={8} fill="white" />
                 </div>
                 <div className="w-px h-2 bg-gray-200"></div>
                 <span className="text-[7px] text-gray-400 font-black tracking-[1px] uppercase">Elite</span>
              </div>

              <div className="mt-auto flex flex-col gap-0.5">
                <div className="flex items-center gap-1.5">
                   <span className="text-xs font-black text-gray-900 italic">₹{product.price}</span>
                   <span className="text-[8px] font-black text-green-600 uppercase">{product.discount}% Off</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[8px] text-gray-400 line-through font-bold">₹{product.mrp}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductGrid;
