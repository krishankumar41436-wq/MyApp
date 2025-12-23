
export interface ProductSpec {
  key: string;
  value: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  mrp: number;
  discount: number;
  rating: number;
  image: string;
  gallery?: string[];
  brand: string;
  category: string;
  subCategory: string;
  description?: string;
  highlights?: string[];
  specifications?: ProductSpec[];
  material?: string;
  fit?: string;       // New: Slim, Regular, etc.
  pattern?: string;   // New: Solid, Printed, etc.
  sleeve?: string;    // New: Full, Short, etc.
  occasion?: string;  // New: Casual, Formal, etc.
  washCare?: string;
  careInstructions?: string;
  isNew?: boolean;
  sizes?: string[];
  colors?: string[];
  inStock?: boolean;
  stockCount: number;
  demandCount: number;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'PERCENT' | 'FLAT';
  value: number;
  minOrder: number;
  isActive: boolean;
  description: string;
}

export interface ProfileToggles {
  showProfileDetails: boolean;
  showSavedAddresses: boolean;
  showPaymentMethods: boolean;
  showNotifications: boolean;
  showAdminAccess: boolean;
  showLegal: boolean;
}

export interface ProductDetailToggles {
  showBrand: boolean;
  showRating: boolean;
  showDiscountBadge: boolean;
  showSizeGuide: boolean;
  showDeliveryCheck: boolean;
  showTrustBadges: boolean;
  showDescription: boolean;
  showRelatedProducts: boolean;
  showShareButton: boolean;
}

export interface StoreConfig {
  appName: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  heroTag: string;
  promoImage: string;
  showHero: boolean;
  showFlashSale: boolean;
  showBrandSpotlight: boolean;
  showTrending: boolean;
  showCategories: boolean;
  profileFeatures: ProfileToggles;
  productPageSettings: ProductDetailToggles;
  supportNumber: string;
  freeShippingMin: number;
  maintenanceMode: boolean;
}

export interface OrderTimeline {
  status: string;
  date: string;
  time: string;
  message: string;
}

export interface SubCategory {
  id: string;
  name: string;
  icon: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subCategories: SubCategory[];
  banner?: string;
}

export type ViewState = 
  | 'HOME' 
  | 'CATEGORY_HUB' 
  | 'SUB_CATEGORY_LIST'
  | 'PRODUCT_LIST_VIEW'
  | 'CART' 
  | 'ORDERS' 
  | 'PROFILE' 
  | 'PROFILE_DETAILS'
  | 'PAYMENT_METHODS'
  | 'SEARCH_SCREEN'
  | 'CHECKOUT' 
  | 'ADDRESS_FORM' 
  | 'ADDRESS_LIST'
  | 'PRODUCT_DETAIL' 
  | 'PAYMENT_SUCCESS' 
  | 'ORDER_DETAILS'
  | 'ORDER_INVOICE'
  | 'WISHLIST'
  | 'NOTIFICATIONS'
  | 'ADMIN';

export interface CartItem extends Product {
  quantity: number;
}

export interface Address {
  id: string;
  name: string;
  mobile: string;
  pincode: string;
  house: string;
  area: string;
  type: 'HOME' | 'OFFICE';
  isDefault: boolean;
}

export interface Order {
  id: string;
  date: string;
  time: string;
  status: 'Placed' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Out for Delivery';
  items: CartItem[];
  subTotal: number;
  discount: number;
  couponDiscount: number;
  tax: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  trackingId?: string;
  address: Address;
  timeline: OrderTimeline[];
  couponCode?: string;
}

export type MembershipTier = 'STANDARD' | 'PRO' | 'LEGEND';
