// Product and Category Data for Ink Matrix

export interface Product {
  id: string;
  sku?: string;
  name: string;
  description: string;
  keyComponents?: string;
  materials?: string;
  specifications?: string;
  designFeatures?: string;
  price: number;
  originalPrice?: number;
  image: string;
  additionalImages?: string[];
  category: string;
  subcategory: string;
  bulkPricing: { minQty: number; price: number }[];
  customizable: boolean;
  colors?: string[];
  inStock: boolean;
  stock?: number;
  rating: number;
  reviews: number;
  badge?: 'bestseller' | 'new' | 'sale';
}

export interface Category {
  id: string;
  name: string;
  image: string;
  subcategories: string[];
}

export const categories: Category[] = [
  {
    id: 'drinkware',
    name: 'Drinkware',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&q=80',
    subcategories: ['Mugs', 'Bottles', 'Tumblers', 'Glasses'],
  },
  {
    id: 'tech-gadgets',
    name: 'Tech & Gadgets',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
    subcategories: ['Power Banks', 'USB Drives', 'Speakers', 'Earbuds'],
  },
  {
    id: 'office-essentials',
    name: 'Office Essentials',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&q=80',
    subcategories: ['Notebooks', 'Pens', 'Desk Organizers', 'Calendars'],
  },
  {
    id: 'bags-travel',
    name: 'Bags & Travel',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80',
    subcategories: ['Backpacks', 'Laptop Bags', 'Duffel Bags', 'Travel Kits'],
  },
  {
    id: 'apparel',
    name: 'Apparel',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&q=80',
    subcategories: ['T-Shirts', 'Caps', 'Jackets', 'Hoodies'],
  },
  {
    id: 'wellness',
    name: 'Wellness & Lifestyle',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80',
    subcategories: ['Fitness Gear', 'Yoga Mats', 'Massagers', 'Health Kits'],
  },
];

export const products: Product[] = [
  {
    id: 'prod-1',
    name: 'Premium Stainless Steel Tumbler',
    description: 'Double-wall insulated tumbler with custom logo engraving. Keeps beverages hot for 12 hours or cold for 24 hours.',
    price: 599,
    originalPrice: 799,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80',
    category: 'drinkware',
    subcategory: 'Tumblers',
    bulkPricing: [
      { minQty: 50, price: 549 },
      { minQty: 100, price: 499 },
      { minQty: 500, price: 449 },
    ],
    customizable: true,
    colors: ['#1e3a5f', '#2d2d2d', '#ffffff', '#c4a35a'],
    inStock: true,
    rating: 4.8,
    reviews: 234,
    badge: 'bestseller',
  },
  {
    id: 'prod-2',
    name: 'Wireless Power Bank 10000mAh',
    description: 'Slim wireless charging power bank with dual USB ports. Perfect for tech-savvy professionals.',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=80',
    category: 'tech-gadgets',
    subcategory: 'Power Banks',
    bulkPricing: [
      { minQty: 25, price: 1199 },
      { minQty: 50, price: 1099 },
      { minQty: 100, price: 999 },
    ],
    customizable: true,
    colors: ['#1e3a5f', '#2d2d2d', '#ffffff'],
    inStock: true,
    rating: 4.6,
    reviews: 156,
    badge: 'new',
  },
  {
    id: 'prod-3',
    name: 'Executive Leather Notebook',
    description: 'Premium hardcover leather notebook with 200 pages of acid-free paper. Gold foil logo stamping available.',
    price: 449,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=80',
    category: 'office-essentials',
    subcategory: 'Notebooks',
    bulkPricing: [
      { minQty: 50, price: 399 },
      { minQty: 100, price: 349 },
      { minQty: 250, price: 299 },
    ],
    customizable: true,
    colors: ['#1e3a5f', '#8b4513', '#2d2d2d'],
    inStock: true,
    rating: 4.9,
    reviews: 312,
    badge: 'bestseller',
  },
  {
    id: 'prod-4',
    name: 'Premium Laptop Backpack',
    description: 'Water-resistant laptop backpack with USB charging port. Fits laptops up to 15.6 inches.',
    price: 1899,
    originalPrice: 2299,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
    category: 'bags-travel',
    subcategory: 'Backpacks',
    bulkPricing: [
      { minQty: 25, price: 1749 },
      { minQty: 50, price: 1599 },
      { minQty: 100, price: 1449 },
    ],
    customizable: true,
    colors: ['#1e3a5f', '#2d2d2d'],
    inStock: true,
    rating: 4.7,
    reviews: 189,
    badge: 'sale',
  },
  {
    id: 'prod-5',
    name: 'Custom Printed Polo T-Shirt',
    description: 'High-quality cotton polo with embroidered logo. Perfect for corporate events and team uniforms.',
    price: 699,
    image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=600&q=80',
    category: 'apparel',
    subcategory: 'T-Shirts',
    bulkPricing: [
      { minQty: 50, price: 649 },
      { minQty: 100, price: 599 },
      { minQty: 250, price: 549 },
    ],
    customizable: true,
    colors: ['#1e3a5f', '#ffffff', '#2d2d2d', '#0e4a0e'],
    inStock: true,
    rating: 4.5,
    reviews: 267,
  },
  {
    id: 'prod-6',
    name: 'Ceramic Coffee Mug Set',
    description: 'Set of 4 premium ceramic mugs with custom printing. Microwave and dishwasher safe.',
    price: 899,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80',
    category: 'drinkware',
    subcategory: 'Mugs',
    bulkPricing: [
      { minQty: 25, price: 849 },
      { minQty: 50, price: 799 },
      { minQty: 100, price: 749 },
    ],
    customizable: true,
    colors: ['#ffffff', '#1e3a5f', '#f5e6d3'],
    inStock: true,
    rating: 4.4,
    reviews: 145,
  },
  {
    id: 'prod-7',
    name: 'Bluetooth Wireless Earbuds',
    description: 'True wireless earbuds with noise cancellation. Custom case printing available.',
    price: 1599,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80',
    category: 'tech-gadgets',
    subcategory: 'Earbuds',
    bulkPricing: [
      { minQty: 25, price: 1499 },
      { minQty: 50, price: 1399 },
      { minQty: 100, price: 1299 },
    ],
    customizable: true,
    colors: ['#ffffff', '#2d2d2d'],
    inStock: true,
    rating: 4.6,
    reviews: 198,
    badge: 'new',
  },
  {
    id: 'prod-8',
    name: 'Metal Pen Gift Set',
    description: 'Elegant metal ballpoint pen set with custom engraving. Includes premium gift box.',
    price: 349,
    image: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=600&q=80',
    category: 'office-essentials',
    subcategory: 'Pens',
    bulkPricing: [
      { minQty: 50, price: 319 },
      { minQty: 100, price: 289 },
      { minQty: 250, price: 259 },
    ],
    customizable: true,
    colors: ['#c4a35a', '#c0c0c0', '#1e3a5f'],
    inStock: true,
    rating: 4.7,
    reviews: 412,
    badge: 'bestseller',
  },
];

export const businessNeeds = [
  {
    id: 'startups',
    title: 'For Startups',
    description: 'Budget-friendly branded merchandise',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&q=80',
  },
  {
    id: 'corporate',
    title: 'Corporate Gifts',
    description: 'Premium gifts for clients & partners',
    image: 'https://images.unsplash.com/photo-1513001900722-370f803f498d?w=400&q=80',
  },
  {
    id: 'events',
    title: 'Event Merchandise',
    description: 'Branded swag for conferences & events',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80',
  },
  {
    id: 'employee',
    title: 'Employee Kits',
    description: 'Welcome kits & appreciation gifts',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80',
  },
];
