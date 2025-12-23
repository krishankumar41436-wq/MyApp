
import React, { useState, useMemo, useRef } from 'react';
import TopAppBar from './components/TopAppBar';
import Home from './components/Home';
import CategoryView from './components/CategoryView';
import SearchScreen from './components/SearchScreen';
import CartView from './components/CartView';
import ProfileView from './components/ProfileView';
import ProfileDetails from './components/ProfileDetails';
import PaymentMethods from './components/PaymentMethods';
import AddressForm from './components/AddressForm';
import AddressListView from './components/AddressListView';
import CheckoutView from './components/CheckoutView';
import ProductDetail from './components/ProductDetail';
import PaymentSuccess from './components/PaymentSuccess';
import OrderList from './components/OrderList';
import OrderDetails from './components/OrderDetails';
import OrderInvoice from './components/OrderInvoice';
import WishlistView from './components/WishlistView';
import NotificationView from './components/NotificationView';
import AdminView from './components/AdminView';
import Toast from './components/Toast';
import ProductGrid from './components/ProductGrid';
import { ViewState, CartItem, Product, Order, Address, Category, StoreConfig, Coupon } from './types';
import { Home as HomeIcon, LayoutGrid, ShoppingCart, Package, User, ChevronLeft } from 'lucide-react';
import { MOCK_PRODUCTS, MEN_CATEGORIES } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('HOME');
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS.map(p => ({ ...p, stockCount: 15, demandCount: 0 })));
  const [categories, setCategories] = useState<Category[]>(MEN_CATEGORIES);
  const [coupons, setCoupons] = useState<Coupon[]>([
    { id: '1', code: 'SNAP200', discountType: 'FLAT', value: 200, minOrder: 1000, isActive: true, description: 'Flat ₹200 off on orders above ₹1000' },
    { id: '2', code: 'ELITE15', discountType: 'PERCENT', value: 15, minOrder: 500, isActive: true, description: '15% off for Elite Customers' }
  ]);
  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(null);

  const [storeConfig, setStoreConfig] = useState<StoreConfig>({
    appName: "SnapMEN",
    heroTitle: "PREMIUM MEN'S SALE",
    heroSubtitle: "Save up to 80% on Luxury Brands",
    heroImage: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&q=80&w=800",
    heroTag: "MEGA DEAL",
    promoImage: "https://images.unsplash.com/photo-1599351431247-f577ffad1c80?auto=format&fit=crop&q=80&w=600",
    showHero: true,
    showFlashSale: true,
    showBrandSpotlight: true,
    showTrending: true,
    showCategories: true,
    profileFeatures: {
      showProfileDetails: true,
      showSavedAddresses: true,
      showPaymentMethods: true,
      showNotifications: true,
      showAdminAccess: true,
      showLegal: true
    },
    productPageSettings: {
      showBrand: true,
      showRating: true,
      showDiscountBadge: true,
      showSizeGuide: true,
      showDeliveryCheck: true,
      showTrustBadges: true,
      showDescription: true,
      showRelatedProducts: true,
      showShareButton: true
    },
    supportNumber: "91-9876543210",
    freeShippingMin: 499,
    maintenanceMode: false
  });

  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([
    { id: '1', name: 'Aryan Sharma', mobile: '9876543210', pincode: '560001', house: '123, Skyline Apartments', area: 'MG Road, Bangalore', type: 'HOME', isDefault: true }
  ]);
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [toast, setToast] = useState<{message: string, type: 'success' | 'info'} | null>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setIsScrolled(e.currentTarget.scrollTop > 60);
  };

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2000);
  };

  const handleAddToCart = (product: Product) => {
    if (product.stockCount <= 0) {
      showToast("Item is Out of Stock", "info");
      return;
    }
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast("Added to Cart");
  };

  const toggleWishlist = (id: string) => {
    setWishlist(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showToast("Removed from Wishlist", "info");
      } else {
        next.add(id);
        showToast("Added to Wishlist");
      }
      return next;
    });
  };

  const placeOrder = (paymentMethod: string) => {
    const rawSubTotal = cart.reduce((sum, item) => sum + (item.mrp * item.quantity), 0);
    const itemDiscount = cart.reduce((sum, item) => sum + ((item.mrp - item.price) * item.quantity), 0);
    const cartTotalAfterItemDiscount = rawSubTotal - itemDiscount;

    let couponDiscount = 0;
    if (activeCoupon) {
      if (activeCoupon.discountType === 'FLAT') couponDiscount = activeCoupon.value;
      else couponDiscount = Math.round(cartTotalAfterItemDiscount * (activeCoupon.value / 100));
    }

    const taxableAmount = cartTotalAfterItemDiscount - couponDiscount;
    const tax = Math.round(taxableAmount * 0.05);
    let shipping = taxableAmount > storeConfig.freeShippingMin ? 0 : 40;
    const finalTotal = taxableAmount + tax + shipping;

    const now = new Date();
    const activeAddress = addresses.find(a => a.isDefault) || addresses[0];

    const newOrder: Order = {
      id: `ORD${Math.floor(Math.random() * 900000) + 100000}`,
      date: now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      time: now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      status: 'Placed',
      items: [...cart],
      subTotal: rawSubTotal,
      discount: itemDiscount,
      couponDiscount,
      couponCode: activeCoupon?.code,
      tax,
      shipping,
      total: finalTotal,
      paymentMethod,
      address: activeAddress,
      timeline: [
        { 
          status: 'Confirmed', 
          date: now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }), 
          time: now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
          message: 'Order placed and confirmed.'
        }
      ]
    };

    setProducts(prevProducts => prevProducts.map(p => {
      const cartItem = cart.find(ci => ci.id === p.id);
      if (cartItem) return { ...p, stockCount: Math.max(0, p.stockCount - cartItem.quantity) };
      return p;
    }));

    setOrders([newOrder, ...orders]);
    setCart([]);
    setActiveCoupon(null);
    setSelectedOrder(newOrder);
    setCurrentView('PAYMENT_SUCCESS');
  };

  const renderView = () => {
    switch (currentView) {
      case 'HOME': return <Home storeConfig={storeConfig} categories={categories} products={products} onNavigateToSearch={() => setCurrentView('SEARCH_SCREEN')} onAddToCart={handleAddToCart} onProductClick={(p) => { setSelectedProduct(p); setCurrentView('PRODUCT_DETAIL'); }} onCategoryClick={(cat) => { setSelectedCategory(cat); setSelectedSubCategory(null); setCurrentView('PRODUCT_LIST_VIEW'); }} />;
      case 'CATEGORY_HUB': return <CategoryView categories={categories} onSubCategoryClick={(cat, sub) => { setSelectedCategory(cat); setSelectedSubCategory(sub); setCurrentView('PRODUCT_LIST_VIEW'); }} />;
      case 'PRODUCT_LIST_VIEW': return (
        <div className="pb-20 bg-white min-h-screen">
          <div className="px-4 py-4 border-b flex items-center gap-3 sticky top-0 bg-white z-10 shadow-sm">
            <button onClick={() => setCurrentView('CATEGORY_HUB')} className="p-1 active:bg-gray-100 rounded-full"><ChevronLeft size={24} className="text-gray-600"/></button>
            <h1 className="text-sm font-black uppercase text-gray-800 tracking-widest leading-none">{selectedSubCategory || selectedCategory}</h1>
          </div>
          <ProductGrid products={products.filter(p => !selectedCategory || p.category === selectedCategory)} onAddToCart={handleAddToCart} onProductClick={(p) => { setSelectedProduct(p); setCurrentView('PRODUCT_DETAIL'); }} wishlist={wishlist} onToggleWishlist={toggleWishlist} />
        </div>
      );
      case 'CART': return <CartView items={cart} coupons={coupons} activeCoupon={activeCoupon} storeConfig={storeConfig} onSelectCoupon={setActiveCoupon} onRemove={(id) => setCart(prev => prev.filter(i => i.id !== id))} onUpdateQty={(id, delta) => setCart(prev => prev.map(i => i.id === id ? {...i, quantity: Math.max(1, i.quantity + delta)} : i))} onCheckout={() => setCurrentView('ADDRESS_LIST')} onBack={() => setCurrentView('HOME')} />;
      case 'PROFILE': return <ProfileView storeConfig={storeConfig} onNavigate={setCurrentView} onBack={() => setCurrentView('HOME')} />;
      case 'PROFILE_DETAILS': return <ProfileDetails onBack={() => setCurrentView('PROFILE')} />;
      case 'PAYMENT_METHODS': return <PaymentMethods onBack={() => setCurrentView('PROFILE')} />;
      case 'ORDERS': return <OrderList orders={orders} onOrderClick={(o) => { setSelectedOrder(o); setCurrentView('ORDER_DETAILS'); }} onStartShopping={() => setCurrentView('HOME')} onBack={() => setCurrentView('PROFILE')} />;
      case 'ORDER_DETAILS': return selectedOrder ? <OrderDetails order={selectedOrder} onBack={() => setCurrentView('ORDERS')} onViewInvoice={() => setCurrentView('ORDER_INVOICE')} /> : null;
      case 'ORDER_INVOICE': return selectedOrder ? <OrderInvoice order={selectedOrder} onBack={() => setCurrentView('ORDER_DETAILS')} /> : null;
      case 'WISHLIST': return <WishlistView items={products.filter(p => wishlist.has(p.id))} onProductClick={(p) => { setSelectedProduct(p); setCurrentView('PRODUCT_DETAIL'); }} onRemove={toggleWishlist} onAddToCart={handleAddToCart} onGoHome={() => setCurrentView('HOME')} />;
      case 'NOTIFICATIONS': return <NotificationView onBack={() => setCurrentView('HOME')} />;
      case 'ADDRESS_LIST': return <AddressListView addresses={addresses} onAdd={() => setCurrentView('ADDRESS_FORM')} onSelect={(addr) => setCurrentView('CHECKOUT')} onBack={() => setCurrentView('PROFILE')} />;
      case 'ADDRESS_FORM': return <AddressForm onSave={(addr) => { setAddresses([...addresses, { ...addr, id: Date.now().toString(), isDefault: addresses.length === 0 }]); setCurrentView('ADDRESS_LIST'); }} onCancel={() => setCurrentView('ADDRESS_LIST')} />;
      case 'CHECKOUT': return <CheckoutView items={cart} address={addresses.find(a => a.isDefault) || addresses[0]} onPlaceOrder={(method) => placeOrder(method)} onBack={() => setCurrentView('CART')} />;
      case 'PAYMENT_SUCCESS': return <PaymentSuccess order={selectedOrder!} onContinue={() => setCurrentView('HOME')} onViewOrder={() => setCurrentView('ORDERS')} />;
      case 'ADMIN': return <AdminView products={products} orders={orders} onUpdateOrders={setOrders} coupons={coupons} onUpdateCoupons={setCoupons} categories={categories} onUpdateCategories={setCategories} storeConfig={storeConfig} onUpdateStore={setStoreConfig} onAddProduct={(p) => setProducts([p, ...products])} onUpdateProduct={(p) => setProducts(products.map(item => item.id === p.id ? p : item))} onDeleteProduct={(id) => setProducts(products.filter(item => item.id !== id))} onBack={() => setCurrentView('PROFILE')} onOpenOrderInvoice={(o) => { setSelectedOrder(o); setCurrentView('ORDER_INVOICE'); }} />;
      default: return null;
    }
  };

  return (
    <div className="max-w-md mx-auto h-screen bg-white relative flex flex-col shadow-2xl overflow-hidden border-x border-gray-100">
      {currentView === 'SEARCH_SCREEN' && <SearchScreen products={products} onBack={() => setCurrentView('HOME')} onAddToCart={handleAddToCart} onProductClick={(p) => { setSelectedProduct(p); setCurrentView('PRODUCT_DETAIL'); }} wishlist={wishlist} onToggleWishlist={toggleWishlist} />}
      {currentView === 'PRODUCT_DETAIL' && selectedProduct && <ProductDetail product={selectedProduct} storeConfig={storeConfig} onAddToCart={handleAddToCart} onBuyNow={(p) => { handleAddToCart(p); setCurrentView('CHECKOUT'); }} onBack={() => setCurrentView('HOME')} isWishlisted={wishlist.has(selectedProduct.id)} onToggleWishlist={() => toggleWishlist(selectedProduct.id)} onDemandRequest={() => showToast("Request Recorded")} />}
      {toast && <Toast message={toast.message} type={toast.type} />}
      {(currentView === 'HOME' || currentView === 'CATEGORY_HUB') && <TopAppBar onSearchFocus={() => setCurrentView('SEARCH_SCREEN')} onNavigate={setCurrentView} currentView={currentView} onWishlistClick={() => setCurrentView('WISHLIST')} onNotificationClick={() => setCurrentView('NOTIFICATIONS')} isScrolled={isScrolled} appName={storeConfig.appName} />}
      <main className="flex-1 bg-white relative overflow-hidden">
        <div ref={scrollRef} onScroll={handleScroll} className="absolute inset-0 overflow-y-auto no-scrollbar scroll-smooth">
          {renderView()}
        </div>
      </main>
      {['HOME', 'CATEGORY_HUB', 'CART', 'ORDERS', 'PROFILE'].includes(currentView) && (
        <nav className="h-16 bg-white border-t border-gray-100 flex items-center justify-around z-50 shrink-0 shadow-sm px-2">
          {[ 
            { id: 'HOME', label: 'Home', icon: <HomeIcon size={22} /> }, 
            { id: 'CATEGORY_HUB', label: 'Explore', icon: <LayoutGrid size={22} /> }, 
            { id: 'CART', label: 'Cart', icon: <ShoppingCart size={22} />, badge: cart.length > 0 ? cart.length : null }, 
            { id: 'ORDERS', label: 'Orders', icon: <Package size={22} /> }, 
            { id: 'PROFILE', label: 'Profile', icon: <User size={22} /> }
          ].map((item) => (
            <button key={item.id} onClick={() => setCurrentView(item.id as ViewState)} className={`flex flex-col items-center justify-center gap-1 min-w-[60px] transition-all relative ${currentView === item.id ? 'text-[#E40046]' : 'text-gray-400'}`}>
              <div className="relative">
                {item.icon}
                {item.badge && <span className="absolute -top-1.5 -right-2 bg-[#E40046] text-white text-[8px] font-black min-w-[15px] h-4 flex items-center justify-center rounded-full border-2 border-white leading-none">{item.badge}</span>}
              </div>
              <span className={`text-[9px] font-black uppercase tracking-tight ${currentView === item.id ? 'opacity-100' : 'opacity-70'}`}>{item.label}</span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
};

export default App;
