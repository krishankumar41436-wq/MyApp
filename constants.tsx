
import { Product, Category } from './types';

export const ACCENT_COLOR = '#E40046';
export const SECONDARY_COLOR = '#212121';

export const MEN_CATEGORIES: Category[] = [
  { 
    id: 'clothing', 
    name: 'Clothing', 
    icon: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&q=80&w=150', 
    subCategories: [
      { id: 'shirts', name: 'Shirts', icon: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=100' },
      { id: 'tshirts', name: 'T-Shirts', icon: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=100' },
      { id: 'jeans', name: 'Jeans', icon: 'https://images.unsplash.com/photo-1542272604-787c38ad5551?auto=format&fit=crop&q=80&w=100' }
    ]
  },
  { 
    id: 'electronics', 
    name: 'Electronics', 
    icon: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=150', 
    subCategories: [
      { id: 'phones', name: 'Phones', icon: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=100' },
      { id: 'audio', name: 'Audio', icon: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=100' },
      { id: 'wearables', name: 'Wearables', icon: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=100' }
    ]
  },
  { 
    id: 'footwear', 
    name: 'Footwear', 
    icon: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=150', 
    subCategories: [
      { id: 'sneakers', name: 'Sneakers', icon: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=100' },
      { id: 'formal_shoes', name: 'Formal', icon: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=100' }
    ]
  },
  { 
    id: 'grooming', 
    name: 'Grooming', 
    icon: 'https://images.unsplash.com/photo-1512496011931-a2c38827c4c5?auto=format&fit=crop&q=80&w=150', 
    subCategories: [
      { id: 'skincare', name: 'Skincare', icon: 'https://images.unsplash.com/photo-1626015569424-df359487c67c?auto=format&fit=crop&q=80&w=100' },
      { id: 'perfumes', name: 'Perfumes', icon: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=100' }
    ]
  },
  { 
    id: 'acc', 
    name: 'Accessories', 
    icon: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=150', 
    subCategories: [
      { id: 'watches', name: 'Watches', icon: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=100' },
      { id: 'sunglasses', name: 'Eyewear', icon: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=100' }
    ]
  },
];

// Added missing mandatory stockCount and demandCount fields to satisfy Product interface
export const MOCK_PRODUCTS: Product[] = [
  // CLOTHING - Shirts
  { id: 'c1', title: 'Casual White Shirt', price: 899, mrp: 1499, discount: 40, rating: 4.5, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=400', brand: 'Roadster', category: 'Clothing', subCategory: 'Shirts', sizes: ['S', 'M', 'L', 'XL'], colors: ['#FFFFFF', '#E2E8F0'], isNew: true, stockCount: 10, demandCount: 0 },
  { id: 'c1-2', title: 'Oxford Denim Shirt', price: 1199, mrp: 1999, discount: 40, rating: 4.3, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=400', brand: 'Wrangler', category: 'Clothing', subCategory: 'Shirts', sizes: ['M', 'L', 'XL'], stockCount: 10, demandCount: 0 },
  
  // CLOTHING - T-Shirts
  { id: 'c3', title: 'Black Oversized Tee', price: 499, mrp: 999, discount: 50, rating: 4.6, image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=400', brand: 'H&M', category: 'Clothing', subCategory: 'T-Shirts', sizes: ['M', 'L', 'XL'], colors: ['#000000', '#1F2937'], stockCount: 10, demandCount: 0 },
  { id: 'c4', title: 'Navy Blue Polo Shirt', price: 799, mrp: 1599, discount: 50, rating: 4.4, image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=400', brand: 'U.S. Polo', category: 'Clothing', subCategory: 'T-Shirts', sizes: ['S', 'M', 'L', 'XL'], colors: ['#000080'], stockCount: 10, demandCount: 0 },
  
  // CLOTHING - Jeans
  { id: 'c2', title: 'Slim Fit Blue Jeans', price: 1299, mrp: 2499, discount: 48, rating: 4.2, image: 'https://images.unsplash.com/photo-1542272604-787c38ad5551?auto=format&fit=crop&q=80&w=400', brand: 'Levi\'s', category: 'Clothing', subCategory: 'Jeans', sizes: ['30', '32', '34', '36'], colors: ['#1E3A8A'], stockCount: 10, demandCount: 0 },
  { id: 'c2-2', title: 'Black Biker Jeans', price: 1599, mrp: 2999, discount: 46, rating: 4.5, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=400', brand: 'Jack & Jones', category: 'Clothing', subCategory: 'Jeans', sizes: ['32', '34'], stockCount: 10, demandCount: 0 },

  // ELECTRONICS
  { id: 'e1', title: 'iPhone 15 Pro Max', price: 139900, mrp: 159900, discount: 12, rating: 4.9, image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=400', brand: 'Apple', category: 'Electronics', subCategory: 'Phones', colors: ['#333333', '#CCCCCC'], stockCount: 10, demandCount: 0 },
  { id: 'e2', title: 'Sony WH-1000XM5', price: 29999, mrp: 34999, discount: 14, rating: 4.8, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400', brand: 'Sony', category: 'Electronics', subCategory: 'Audio', colors: ['#000000', '#FFFFFF'], stockCount: 10, demandCount: 0 },
  { id: 'e3', title: 'Series 9 Smartwatch', price: 41900, mrp: 44900, discount: 6, rating: 4.8, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400', brand: 'Apple', category: 'Electronics', subCategory: 'Wearables', stockCount: 10, demandCount: 0 },
  { id: 'e4', title: 'Galaxy S24 Ultra', price: 119999, mrp: 129999, discount: 8, rating: 4.8, image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=400', brand: 'Samsung', category: 'Electronics', subCategory: 'Phones', stockCount: 10, demandCount: 0 },

  // FOOTWEAR
  { id: 'f1', title: 'Air Max Sneakers', price: 8995, mrp: 11995, discount: 25, rating: 4.6, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400', brand: 'Nike', category: 'Footwear', subCategory: 'Sneakers', sizes: ['7', '8', '9', '10'], stockCount: 10, demandCount: 0 },
  { id: 'f2', title: 'Classic Derby Shoes', price: 2499, mrp: 4999, discount: 50, rating: 4.4, image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=400', brand: 'Clarks', category: 'Footwear', subCategory: 'Formal', stockCount: 10, demandCount: 0 },

  // GROOMING
  { id: 'g1', title: 'Charcoal Face Wash', price: 249, mrp: 349, discount: 28, rating: 4.5, image: 'https://images.unsplash.com/photo-1626015569424-df359487c67c?auto=format&fit=crop&q=80&w=400', brand: 'The Man Company', category: 'Grooming', subCategory: 'Skincare', stockCount: 10, demandCount: 0 },
  { id: 'g2', title: 'Signature Oud Perfume', price: 1299, mrp: 1999, discount: 35, rating: 4.7, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=400', brand: 'Beardo', category: 'Grooming', subCategory: 'Perfumes', stockCount: 10, demandCount: 0 },

  // ACCESSORIES
  { id: 'a1', title: 'Chronograph Black Watch', price: 4999, mrp: 9999, discount: 50, rating: 4.6, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=400', brand: 'Fossil', category: 'Accessories', subCategory: 'Watches', stockCount: 10, demandCount: 0 },
  { id: 'a2', title: 'Classic Aviator Glasses', price: 3599, mrp: 5999, discount: 40, rating: 4.8, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=400', brand: 'Ray-Ban', category: 'Accessories', subCategory: 'Eyewear', stockCount: 10, demandCount: 0 }
];

export const TRENDING_SEARCHES = [
  "Oversized T-shirts",
  "iPhone 15 Pro",
  "Premium Watches",
  "Running Shoes",
  "Men's Perfume"
];
