
import React, { useState } from 'react';
import { 
  ArrowLeft, Heart, Star, Share2, 
  MapPin, ChevronRight, CheckCircle2, 
  Truck, ShieldCheck, ShoppingBag, Info
} from 'lucide-react';
import { Product, StoreConfig } from '../types';

interface ProductDetailProps {
  product: Product;
  storeConfig: StoreConfig;
  onAddToCart: (p: Product) => void;
  onBuyNow: (p: Product) => void;
  onBack: () => void;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
  onDemandRequest: (id: string) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ 
  product, storeConfig, onAddToCart, onBuyNow, onBack, isWishlisted, onToggleWishlist
}) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const images = [product.image, ...(product.gallery || [])];

  const isFashion = ['clothing', 'footwear'].includes(product.category.toLowerCase());
  const settings = storeConfig.productPageSettings;

  return (
    <div className="fixed inset-0 max-w-md mx-auto bg-white z-[200] flex flex-col animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1 active:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft size={24} className="text-gray-800" />
          </button>
          <span className="text-sm font-bold text-gray-800 truncate max-w-[180px]">{product.title}</span>
        </div>
        <div className="flex items-center gap-1">
          {settings.showShareButton && <button className="p-2"><Share2 size={20} className="text-gray-500" /></button>}
          <button onClick={onToggleWishlist} className="p-2">
            <Heart size={22} className={isWishlisted ? 'text-red-500 fill-red-500' : 'text-gray-400'} />
          </button>
          <div className="relative p-2">
            <ShoppingBag size={22} className="text-gray-500" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Main Image Slider */}
        <div className="relative aspect-square bg-white">
          <div 
            className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar h-full"
            onScroll={(e) => {
              const index = Math.round(e.currentTarget.scrollLeft / e.currentTarget.offsetWidth);
              setActiveImageIndex(index);
            }}
          >
            {images.map((img, idx) => (
              <div key={idx} className="w-full h-full flex-shrink-0 snap-center flex items-center justify-center">
                <img src={img} className="max-w-full max-h-full object-contain" alt="product" />
              </div>
            ))}
          </div>
          {images.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
              {images.map((_, idx) => (
                <div key={idx} className={`w-1.5 h-1.5 rounded-full transition-colors ${activeImageIndex === idx ? 'bg-red-500' : 'bg-gray-300'}`} />
              ))}
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="p-4 space-y-3">
          <div>
            {settings.showBrand && <p className="text-xs font-bold text-red-500 uppercase mb-1">{product.brand}</p>}
            <h1 className="text-base text-gray-800 font-medium leading-snug">{product.title}</h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
            <span className="text-sm text-gray-400 line-through">₹{product.mrp}</span>
            {settings.showDiscountBadge && <span className="text-sm font-bold text-green-600">{product.discount}% OFF</span>}
          </div>

          {settings.showRating && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-green-600 px-1.5 py-0.5 rounded text-white text-[11px] font-bold">
                {product.rating} <Star size={10} fill="currentColor" />
              </div>
              <span className="text-[11px] text-gray-400 font-medium">Verified Merchant Feedback</span>
            </div>
          )}
        </div>

        {/* Variants Selection */}
        {isFashion && (
          <div className="p-4 border-t border-gray-100">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-bold text-gray-800">Select Size</span>
              {settings.showSizeGuide && <button className="text-xs font-bold text-red-500">Size Chart</button>}
            </div>
            <div className="flex flex-wrap gap-2">
              {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                <button 
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[44px] h-10 border rounded flex items-center justify-center text-sm font-bold ${selectedSize === size ? 'border-red-500 bg-red-50 text-red-500' : 'border-gray-200 text-gray-600'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Pincode & Delivery */}
        {settings.showDeliveryCheck && (
          <div className="p-4 border-t border-gray-100 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-gray-800">Check Delivery</span>
            </div>
            <div className="flex gap-2">
              <div className="flex-1 bg-gray-50 border border-gray-200 rounded px-3 flex items-center">
                <MapPin size={16} className="text-gray-400 mr-2" />
                <input type="text" placeholder="Enter Pincode" className="bg-transparent h-10 w-full text-sm outline-none font-medium" />
              </div>
              <button className="px-5 bg-gray-100 text-gray-800 font-bold text-xs rounded border border-gray-200 uppercase">Check</button>
            </div>
          </div>
        )}

        {/* Specifications */}
        <div className="p-4 border-t border-gray-100 space-y-3">
          <span className="text-sm font-bold text-gray-800 block">Product Details</span>
          <div className="border border-gray-100 rounded overflow-hidden">
            {product.specifications && product.specifications.length > 0 ? (
              product.specifications.map((spec, idx) => (
                <div key={idx} className={`flex text-xs ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  <div className="w-1/3 p-3 font-bold text-gray-500 border-r border-gray-100">{spec.key}</div>
                  <div className="w-2/3 p-3 text-gray-800 font-medium">{spec.value}</div>
                </div>
              ))
            ) : (
              <div className="p-4 text-xs text-gray-400 italic">Specifications updated by merchant regularly.</div>
            )}
          </div>
        </div>

        {/* Trust Protocol */}
        {settings.showTrustBadges && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-around bg-gray-50/50">
             <div className="flex flex-col items-center gap-1 opacity-60">
                <CheckCircle2 size={24} className="text-green-600" />
                <span className="text-[8px] font-black uppercase">Genuine</span>
             </div>
             <div className="flex flex-col items-center gap-1 opacity-60">
                <Truck size={24} className="text-blue-600" />
                <span className="text-[8px] font-black uppercase">Fast Ship</span>
             </div>
             <div className="flex flex-col items-center gap-1 opacity-60">
                <ShieldCheck size={24} className="text-red-600" />
                <span className="text-[8px] font-black uppercase">Safe Pay</span>
             </div>
          </div>
        )}

        {settings.showDescription && (
          <div className="p-4 border-t border-gray-100 mb-20">
            <span className="text-sm font-bold text-gray-800 block mb-2">Description</span>
            <p className="text-xs text-gray-600 leading-relaxed font-medium">
              This premium {product.title} from {product.brand} is crafted with high quality materials, ensuring durability and style. Perfect for the modern man.
            </p>
          </div>
        )}
      </div>

      {/* Sticky Bottom Actions */}
      <div className="bg-white border-t border-gray-100 p-3 flex gap-3 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <button 
          onClick={() => onAddToCart(product)}
          className="flex-1 h-12 border border-red-500 text-red-500 font-bold rounded uppercase text-sm flex items-center justify-center active:bg-red-50"
        >
          Add to Cart
        </button>
        <button 
          onClick={() => onBuyNow(product)}
          className="flex-1 h-12 bg-red-600 text-white font-bold rounded uppercase text-sm flex items-center justify-center shadow-lg active:bg-red-700"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
