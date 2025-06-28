export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  collection: string;
  description: string;
  sizes?: string[];
  colors?: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  discount?: number;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  image: string;
  bannerImage: string;
  showTitle: string;
  productCount: number;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  productCount: number;
}