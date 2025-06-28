import { Product, Collection, Category } from '@/types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Productos Favoritos',
    slug: 'favoritos',
    image: '/api/placeholder/400/300',
    productCount: 45
  },
  {
    id: '2',
    name: 'Colecciones Favoritas',
    slug: 'colecciones',
    image: '/api/placeholder/400/300',
    productCount: 32
  },
  {
    id: '3',
    name: 'Más Vendidos',
    slug: 'mas-vendidos',
    image: '/api/placeholder/400/300',
    productCount: 28
  },
  {
    id: '4',
    name: 'Productos Nuevos',
    slug: 'nuevos',
    image: '/api/placeholder/400/300',
    productCount: 15
  }
];

export const collections: Collection[] = [
  {
    id: '1',
    name: 'La Casa de Papel',
    image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=600',
    showTitle: 'Money Heist',
    productCount: 12
  },
  {
    id: '2',
    name: 'Stranger Things',
    image: 'https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=600',
    showTitle: 'Stranger Things',
    productCount: 18
  },
  {
    id: '3',
    name: 'Bridgerton',
    image: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=600',
    showTitle: 'Bridgerton',
    productCount: 8
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Rompevientos amarillo',
    price: 49.89,
    originalPrice: 65.99,
    image: 'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=600',
    images: [
      'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    category: 'clothing',
    collection: 'Dark',
    description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['yellow', 'black'],
    isFeatured: true,
    discount: 24
  },
  {
    id: '2',
    name: 'Sudadera Cobra Kai Strike First',
    price: 64.59,
    originalPrice: 79.99,
    image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'clothing',
    collection: 'Cobra Kai',
    description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['black', 'gray'],
    isFeatured: true
  },
  {
    id: '3',
    name: 'Sudadera Bella Ciao',
    price: 49.89,
    originalPrice: 59.99,
    image: 'https://images.pexels.com/photos/8532635/pexels-photo-8532635.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'clothing',
    collection: 'La Casa de Papel',
    description: 'Sudadera oficial de La Casa de Papel con diseño exclusivo.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['red', 'black'],
    discount: 17
  },
  {
    id: '4',
    name: 'Almohada Favorite Wachify',
    price: 29.99,
    image: 'https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'home',
    collection: 'Wachify',
    description: 'Almohada de lujo con logo de Wachify.',
    colors: ['black', 'white']
  },
  {
    id: '5',
    name: 'Camiseta Triquetra Dark',
    price: 49.89,
    originalPrice: 59.99,
    image: 'https://images.pexels.com/photos/8532939/pexels-photo-8532939.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'clothing',
    collection: 'Dark',
    description: 'Camiseta oficial de Dark con símbolo triquetra.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['black', 'gray'],
    discount: 17
  },
  {
    id: '6',
    name: 'Taza Stranger Things',
    price: 19.69,
    originalPrice: 24.99,
    image: 'https://images.pexels.com/photos/6664376/pexels-photo-6664376.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'accessories',
    collection: 'Stranger Things',
    description: 'Taza oficial de Stranger Things con diseño retro.',
    colors: ['red', 'black']
  },
  {
    id: '7',
    name: 'Palomera All You Need Is Wachify',
    price: 49.89,
    image: 'https://images.pexels.com/photos/6664385/pexels-photo-6664385.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'home',
    collection: 'Wachify',
    description: 'Palomera con diseño exclusivo de Wachify.',
    colors: ['yellow', 'white']
  }
];

export const featuredProduct = products[0];