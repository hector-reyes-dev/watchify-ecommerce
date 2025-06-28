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
    slug: 'la-casa-de-papel',
    image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=600',
    bannerImage: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1200',
    showTitle: 'Money Heist',
    productCount: 12,
    description: 'Únete a la resistencia con nuestra colección exclusiva de La Casa de Papel. Productos oficiales inspirados en la serie más icónica de Netflix.'
  },
  {
    id: '2',
    name: 'Stranger Things',
    slug: 'stranger-things',
    image: 'https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=600',
    bannerImage: 'https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=1200',
    showTitle: 'Stranger Things',
    productCount: 18,
    description: 'Explora el mundo al revés con nuestra colección de Stranger Things. Productos retro inspirados en los años 80 y la serie más nostálgica de Netflix.'
  },
  {
    id: '3',
    name: 'Bridgerton',
    slug: 'bridgerton',
    image: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=600',
    bannerImage: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=1200',
    showTitle: 'Bridgerton',
    productCount: 8,
    description: 'Vive la elegancia de la época Regencia con nuestra colección de Bridgerton. Productos refinados inspirados en el drama romántico más popular de Netflix.'
  },
  {
    id: '4',
    name: 'Dark',
    slug: 'dark',
    image: 'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=600',
    bannerImage: 'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=1200',
    showTitle: 'Dark',
    productCount: 10,
    description: 'Desentraña los misterios del tiempo con nuestra colección de Dark. Productos enigmáticos inspirados en la serie alemana más compleja de Netflix.'
  },
  {
    id: '5',
    name: 'Cobra Kai',
    slug: 'cobra-kai',
    image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=600',
    bannerImage: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=1200',
    showTitle: 'Cobra Kai',
    productCount: 14,
    description: 'Strike First, Strike Hard, No Mercy. Nuestra colección de Cobra Kai trae de vuelta el espíritu de las artes marciales con productos oficiales de la serie.'
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

// Collection-specific products
export const collectionProducts: Record<string, Product[]> = {
  'la-casa-de-papel': [
    {
      id: 'lcdp-1',
      name: 'Máscara de Dalí Oficial',
      price: 34.99,
      originalPrice: 44.99,
      image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'accessories',
      collection: 'La Casa de Papel',
      description: 'Máscara oficial de Salvador Dalí, icónica de la serie La Casa de Papel. Material de alta calidad.',
      colors: ['beige'],
      discount: 22
    },
    {
      id: 'lcdp-2',
      name: 'Mono Rojo de Atraco',
      price: 89.99,
      originalPrice: 109.99,
      image: 'https://images.pexels.com/photos/8532635/pexels-photo-8532635.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'clothing',
      collection: 'La Casa de Papel',
      description: 'Mono rojo oficial usado por los atracadores. Incluye cremallera frontal y bolsillos laterales.',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['red'],
      discount: 18
    },
    {
      id: 'lcdp-3',
      name: 'Sudadera Bella Ciao',
      price: 49.89,
      originalPrice: 59.99,
      image: 'https://images.pexels.com/photos/8532635/pexels-photo-8532635.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'clothing',
      collection: 'La Casa de Papel',
      description: 'Sudadera con capucha con el icónico "Bella Ciao" bordado. 100% algodón orgánico.',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['red', 'black'],
      discount: 17
    },
    {
      id: 'lcdp-4',
      name: 'Taza Profesor',
      price: 24.99,
      image: 'https://images.pexels.com/photos/6664376/pexels-photo-6664376.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'accessories',
      collection: 'La Casa de Papel',
      description: 'Taza de cerámica con frase del Profesor. Perfecta para planificar tu próximo atraco.',
      colors: ['red', 'black']
    },
    {
      id: 'lcdp-5',
      name: 'Camiseta Resistencia',
      price: 29.99,
      image: 'https://images.pexels.com/photos/8532939/pexels-photo-8532939.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'clothing',
      collection: 'La Casa de Papel',
      description: 'Camiseta con diseño de resistencia inspirado en la serie. Corte unisex.',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['black', 'red', 'white']
    },
    {
      id: 'lcdp-6',
      name: 'Poster Vintage La Casa de Papel',
      price: 19.99,
      image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'home',
      collection: 'La Casa de Papel',
      description: 'Poster oficial con diseño vintage de la serie. Impresión de alta calidad en papel mate.',
      colors: ['multicolor']
    }
  ],
  'stranger-things': [
    {
      id: 'st-1',
      name: 'Camiseta Hawkins High',
      price: 32.99,
      image: 'https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'clothing',
      collection: 'Stranger Things',
      description: 'Camiseta oficial del instituto Hawkins High. Diseño retro años 80.',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['green', 'white', 'yellow']
    },
    {
      id: 'st-2',
      name: 'Sudadera Demogorgon',
      price: 54.99,
      originalPrice: 69.99,
      image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'clothing',
      collection: 'Stranger Things',
      description: 'Sudadera con capucha con diseño del Demogorgon. Perfecta para el mundo al revés.',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['black', 'dark-red'],
      discount: 21
    },
    {
      id: 'st-3',
      name: 'Taza Eleven Waffles',
      price: 22.99,
      image: 'https://images.pexels.com/photos/6664376/pexels-photo-6664376.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'accessories',
      collection: 'Stranger Things',
      description: 'Taza con el diseño favorito de Eleven: Eggo Waffles. Cambio de color con calor.',
      colors: ['blue', 'pink']
    },
    {
      id: 'st-4',
      name: 'Gorra Dustin Camp Know Where',
      price: 28.99,
      image: 'https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'accessories',
      collection: 'Stranger Things',
      description: 'Gorra trucker oficial del campamento de Dustin. Ajuste snapback.',
      colors: ['blue', 'red', 'green']
    },
    {
      id: 'st-5',
      name: 'Póster Upside Down',
      price: 24.99,
      image: 'https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'home',
      collection: 'Stranger Things',
      description: 'Póster del mundo al revés con efectos holográficos. Tamaño 60x40cm.',
      colors: ['multicolor']
    },
    {
      id: 'st-6',
      name: 'Mochila Hellfire Club',
      price: 45.99,
      image: 'https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'accessories',
      collection: 'Stranger Things',
      description: 'Mochila oficial del club Hellfire. Múltiples compartimentos y diseño resistente.',
      colors: ['black', 'red']
    }
  ],
  'bridgerton': [
    {
      id: 'bg-1',
      name: 'Taza de Té Lady Whistledown',
      price: 34.99,
      image: 'https://images.pexels.com/photos/6664376/pexels-photo-6664376.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'accessories',
      collection: 'Bridgerton',
      description: 'Elegante taza de porcelana con diseño de Lady Whistledown. Perfecta para el té de la tarde.',
      colors: ['white', 'gold']
    },
    {
      id: 'bg-2',
      name: 'Camiseta Bridgerton Family',
      price: 39.99,
      image: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'clothing',
      collection: 'Bridgerton',
      description: 'Camiseta elegante con el escudo de la familia Bridgerton. Corte femenino.',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['navy', 'cream', 'rose']
    },
    {
      id: 'bg-3',
      name: 'Cuaderno Lady Danbury',
      price: 26.99,
      image: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'accessories',
      collection: 'Bridgerton',
      description: 'Cuaderno de notas con diseño inspirado en Lady Danbury. Tapa dura y páginas rayadas.',
      colors: ['purple', 'gold']
    },
    {
      id: 'bg-4',
      name: 'Sudadera Queen Charlotte',
      price: 59.99,
      originalPrice: 74.99,
      image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'clothing',
      collection: 'Bridgerton',
      description: 'Sudadera de lujo inspirada en la Reina Charlotte. Bordado dorado y corte premium.',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['royal-blue', 'burgundy'],
      discount: 20
    },
    {
      id: 'bg-5',
      name: 'Vela Aromática Bridgerton',
      price: 32.99,
      image: 'https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'home',
      collection: 'Bridgerton',
      description: 'Vela aromática con fragancias de la época Regencia. Aroma a lavanda y bergamota.',
      colors: ['cream', 'lavender']
    },
    {
      id: 'bg-6',
      name: 'Bolso Tote Featherington',
      price: 42.99,
      image: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'accessories',
      collection: 'Bridgerton',
      description: 'Bolso tote con estampado inspirado en la familia Featherington. Material eco-friendly.',
      colors: ['yellow', 'pink', 'green']
    }
  ],
  'dark': [
    {
      id: 'dk-1',
      name: 'Rompevientos Amarillo Jonas',
      price: 49.89,
      originalPrice: 65.99,
      image: 'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'clothing',
      collection: 'Dark',
      description: 'Rompevientos amarillo icónico de Jonas. Resistente al agua y con capucha ajustable.',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['yellow', 'black'],
      discount: 24
    },
    {
      id: 'dk-2',
      name: 'Camiseta Triquetra',
      price: 34.99,
      image: 'https://images.pexels.com/photos/8532939/pexels-photo-8532939.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'clothing',
      collection: 'Dark',
      description: 'Camiseta con el símbolo triquetra bordado. Representa los tres mundos de Dark.',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['black', 'dark-gray', 'navy']
    },
    {
      id: 'dk-3',
      name: 'Reloj de Bolsillo Vintage',
      price: 89.99,
      image: 'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'accessories',
      collection: 'Dark',
      description: 'Reloj de bolsillo vintage inspirado en los viajes en el tiempo de Dark. Funcional.',
      colors: ['gold', 'silver']
    },
    {
      id: 'dk-4',
      name: 'Sudadera Sic Mundus',
      price: 54.99,
      originalPrice: 69.99,
      image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'clothing',
      collection: 'Dark',
      description: 'Sudadera con el lema "Sic Mundus Creatus Est". Diseño minimalista y elegante.',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['black', 'charcoal'],
      discount: 21
    },
    {
      id: 'dk-5',
      name: 'Mapa del Tiempo Dark',
      price: 29.99,
      image: 'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'home',
      collection: 'Dark',
      description: 'Póster del árbol genealógico y líneas temporales de Dark. Impresión de alta calidad.',
      colors: ['sepia', 'black-white']
    },
    {
      id: 'dk-6',
      name: 'Taza Winden Nuclear Plant',
      price: 24.99,
      image: 'https://images.pexels.com/photos/6664376/pexels-photo-6664376.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'accessories',
      collection: 'Dark',
      description: 'Taza con el logo de la planta nuclear de Winden. Cambio de color con temperatura.',
      colors: ['yellow', 'black']
    }
  ],
  'cobra-kai': [
    {
      id: 'ck-1',
      name: 'Sudadera Cobra Kai Strike First',
      price: 64.59,
      originalPrice: 79.99,
      image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'clothing',
      collection: 'Cobra Kai',
      description: 'Sudadera oficial del dojo Cobra Kai. "Strike First, Strike Hard, No Mercy".',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['black', 'yellow'],
      discount: 19
    },
    {
      id: 'ck-2',
      name: 'Kimono Miyagi-Do',
      price: 89.99,
      image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'clothing',
      collection: 'Cobra Kai',
      description: 'Kimono oficial del dojo Miyagi-Do. Material tradicional de artes marciales.',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['white', 'green']
    },
    {
      id: 'ck-3',
      name: 'Camiseta Eagle Fang',
      price: 32.99,
      image: 'https://images.pexels.com/photos/8532939/pexels-photo-8532939.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'clothing',
      collection: 'Cobra Kai',
      description: 'Camiseta del dojo Eagle Fang de Johnny Lawrence. Diseño águila bordado.',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['red', 'black', 'white']
    },
    {
      id: 'ck-4',
      name: 'Bandana All Valley Tournament',
      price: 18.99,
      image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'accessories',
      collection: 'Cobra Kai',
      description: 'Bandana oficial del torneo All Valley. Perfecta para entrenar karate.',
      colors: ['red', 'black', 'yellow']
    },
    {
      id: 'ck-5',
      name: 'Botella de Agua Cobra Kai',
      price: 26.99,
      image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'accessories',
      collection: 'Cobra Kai',
      description: 'Botella de agua de acero inoxidable con logo de Cobra Kai. 750ml.',
      colors: ['black', 'yellow']
    },
    {
      id: 'ck-6',
      name: 'Póster Karate Kid Legacy',
      price: 22.99,
      image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'home',
      collection: 'Cobra Kai',
      description: 'Póster vintage que conecta Karate Kid con Cobra Kai. Edición limitada.',
      colors: ['vintage', 'sepia']
    }
  ]
};

export const featuredProduct = products[0];