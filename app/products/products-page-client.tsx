'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Star, 
  ShoppingCart, 
  Heart,
  X,
  ChevronDown,
  SlidersHorizontal,
  Check
} from 'lucide-react';
import { Product, Collection } from '@/types';
import { useCart } from '@/contexts/cart-context';

interface ProductsPageClientProps {
  products: Product[];
  collections: Collection[];
}

export default function ProductsPageClient({ products, collections }: ProductsPageClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Get initial search from URL params
  const initialSearch = searchParams.get('search') || '';
  
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [addedToCart, setAddedToCart] = useState<string[]>([]);
  
  const { addToCart } = useCart();

  // Update search term when URL params change
  useEffect(() => {
    const urlSearch = searchParams.get('search') || '';
    setSearchTerm(urlSearch);
  }, [searchParams]);

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(p => p.category))];
    return uniqueCategories.map(cat => ({
      id: cat,
      name: cat === 'clothing' ? 'Ropa' : 
            cat === 'accessories' ? 'Accesorios' : 
            cat === 'home' ? 'Hogar' : cat,
      count: products.filter(p => p.category === cat).length
    }));
  }, [products]);

  // Enhanced search function
  const searchProducts = (products: Product[], query: string) => {
    if (!query.trim()) return products;
    
    const searchTerms = query.toLowerCase().trim().split(' ');
    
    return products.filter(product => {
      const searchableText = [
        product.name,
        product.description,
        product.collection,
        product.category
      ].join(' ').toLowerCase();
      
      // Check if all search terms are found in the searchable text
      return searchTerms.every(term => searchableText.includes(term));
    });
  };

  // Filter products with enhanced search
  const filteredProducts = useMemo(() => {
    let filtered = products;
    
    // Apply search filter first
    if (searchTerm.trim()) {
      filtered = searchProducts(filtered, searchTerm);
    }
    
    // Apply other filters
    filtered = filtered.filter(product => {
      // Collection filter
      const matchesCollection = selectedCollections.length === 0 || 
                              selectedCollections.includes(product.collection);
      
      // Category filter
      const matchesCategory = selectedCategories.length === 0 || 
                            selectedCategories.includes(product.category);
      
      // Price filter
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesCollection && matchesCategory && matchesPrice;
    });
    
    // Apply sorting
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'newest':
          return a.id.localeCompare(b.id);
        case 'popular':
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
        case 'relevance':
          // If there's a search term, sort by relevance
          if (searchTerm.trim()) {
            const aRelevance = calculateRelevance(a, searchTerm);
            const bRelevance = calculateRelevance(b, searchTerm);
            return bRelevance - aRelevance;
          }
          return 0;
        default:
          return 0;
      }
    });
  }, [products, searchTerm, selectedCollections, selectedCategories, priceRange, sortBy]);

  // Calculate search relevance score
  const calculateRelevance = (product: Product, query: string) => {
    const searchTerms = query.toLowerCase().trim().split(' ');
    let score = 0;
    
    searchTerms.forEach(term => {
      // Higher score for matches in name
      if (product.name.toLowerCase().includes(term)) {
        score += 10;
      }
      // Medium score for matches in collection
      if (product.collection.toLowerCase().includes(term)) {
        score += 5;
      }
      // Lower score for matches in description
      if (product.description.toLowerCase().includes(term)) {
        score += 2;
      }
    });
    
    return score;
  };

  const toggleCollection = (collection: string) => {
    setSelectedCollections(prev => 
      prev.includes(collection) 
        ? prev.filter(c => c !== collection)
        : [...prev, collection]
    );
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    setAddedToCart(prev => [...prev, product.id]);
    
    // Remove from added state after 3 seconds
    setTimeout(() => {
      setAddedToCart(prev => prev.filter(id => id !== product.id));
    }, 3000);
  };

  const clearFilters = () => {
    setSelectedCollections([]);
    setSelectedCategories([]);
    setPriceRange([0, 200]);
    setSearchTerm('');
    // Update URL to remove search params
    router.push('/products');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Update URL with search parameter
    if (value.trim()) {
      router.push(`/products?search=${encodeURIComponent(value.trim())}`);
    } else {
      router.push('/products');
    }
  };

  const activeFiltersCount = selectedCollections.length + selectedCategories.length + 
    (priceRange[0] > 0 || priceRange[1] < 200 ? 1 : 0) + (searchTerm.trim() ? 1 : 0);

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/80 to-black/80" />
        <Image
          src="https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Productos Netflix"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {searchTerm.trim() ? `Resultados para "${searchTerm}"` : 'Todos los Productos'}
            </h1>
            <p className="text-lg text-gray-200 mb-4">
              {searchTerm.trim() 
                ? `${filteredProducts.length} productos encontrados`
                : 'Descubre merchandising oficial de tus series favoritas de Netflix'
              }
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-300">
              <span>{products.length} productos totales</span>
              <span>•</span>
              <span>Envío gratis +$50</span>
              <span>•</span>
              <span>Productos oficiales</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="w-full border-gray-600 text-white hover:bg-red-600 hover:border-red-600 mb-4"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filtros {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </Button>
          </div>

          {/* Filters Sidebar */}
          <aside className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-gray-900 rounded-lg p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filtros
                </h2>
                {activeFiltersCount > 0 && (
                  <Button
                    onClick={clearFilters}
                    variant="ghost"
                    size="sm"
                    className="text-red-400 hover:text-red-300"
                  >
                    Limpiar
                  </Button>
                )}
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Buscar productos
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Buscar por nombre o serie..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-red-600"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        router.push('/products');
                      }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-400"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Collections Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-300 mb-3">Series / Shows</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {collections.map((collection) => {
                    const productCount = products.filter(p => p.collection === collection.name).length;
                    return (
                      <label key={collection.id} className="flex items-center cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedCollections.includes(collection.name)}
                          onChange={() => toggleCollection(collection.name)}
                          className="sr-only"
                        />
                        <div className={`w-4 h-4 border-2 rounded mr-3 flex items-center justify-center transition-colors ${
                          selectedCollections.includes(collection.name)
                            ? 'bg-red-600 border-red-600'
                            : 'border-gray-600 group-hover:border-red-600'
                        }`}>
                          {selectedCollections.includes(collection.name) && (
                            <div className="w-2 h-2 bg-white rounded-sm" />
                          )}
                        </div>
                        <span className="text-sm text-gray-300 group-hover:text-white flex-1">
                          {collection.name}
                        </span>
                        <span className="text-xs text-gray-500">({productCount})</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Categories Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-300 mb-3">Categorías</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category.id} className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.id)}
                        onChange={() => toggleCategory(category.id)}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 border-2 rounded mr-3 flex items-center justify-center transition-colors ${
                        selectedCategories.includes(category.id)
                          ? 'bg-red-600 border-red-600'
                          : 'border-gray-600 group-hover:border-red-600'
                      }`}>
                        {selectedCategories.includes(category.id) && (
                          <div className="w-2 h-2 bg-white rounded-sm" />
                        )}
                      </div>
                      <span className="text-sm text-gray-300 group-hover:text-white flex-1">
                        {category.name}
                      </span>
                      <span className="text-xs text-gray-500">({category.count})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-300 mb-3">Rango de precio</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-full bg-gray-800 text-white border border-gray-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-red-600"
                    />
                    <span className="text-gray-400">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full bg-gray-800 text-white border border-gray-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-red-600"
                    />
                  </div>
                  <div className="text-xs text-gray-400">
                    ${priceRange[0]} - ${priceRange[1]}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Controls Bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">
                  {filteredProducts.length} productos encontrados
                </h2>
                {activeFiltersCount > 0 && (
                  <p className="text-sm text-gray-400">
                    {activeFiltersCount} filtro{activeFiltersCount > 1 ? 's' : ''} aplicado{activeFiltersCount > 1 ? 's' : ''}
                    {searchTerm.trim() && ` • Búsqueda: "${searchTerm}"`}
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-4">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-red-600"
                >
                  <option value="name">Nombre A-Z</option>
                  <option value="price-low">Precio: Menor a Mayor</option>
                  <option value="price-high">Precio: Mayor a Menor</option>
                  <option value="popular">Más Populares</option>
                  <option value="newest">Más Recientes</option>
                  {searchTerm.trim() && <option value="relevance">Más Relevantes</option>}
                </select>

                {/* View Mode */}
                <div className="flex bg-gray-800 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded transition-colors ${
                      viewMode === 'grid' 
                        ? 'bg-red-600 text-white' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded transition-colors ${
                      viewMode === 'list' 
                        ? 'bg-red-600 text-white' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">
                    {searchTerm.trim() ? 'No se encontraron productos' : 'No hay productos disponibles'}
                  </h3>
                  <p className="mb-4">
                    {searchTerm.trim() 
                      ? `No encontramos productos que coincidan con "${searchTerm}"`
                      : 'Intenta ajustar los filtros para ver más productos'
                    }
                  </p>
                  {activeFiltersCount > 0 && (
                    <Button
                      onClick={clearFilters}
                      variant="outline"
                      className="border-gray-600 text-white hover:bg-red-600 hover:border-red-600"
                    >
                      Limpiar filtros
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <>
                {/* Grid View */}
                {viewMode === 'grid' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                      <div key={product.id} className="group">
                        <div className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-all duration-300 hover:scale-105">
                          {/* Product Image */}
                          <div className="relative aspect-square overflow-hidden">
                            <Link href={`/product/${product.id}`}>
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            </Link>
                            
                            {/* Wishlist Button */}
                            <button
                              onClick={() => toggleWishlist(product.id)}
                              className="absolute top-3 right-3 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                            >
                              <Heart 
                                className={`w-4 h-4 ${
                                  wishlist.includes(product.id) 
                                    ? 'fill-red-600 text-red-600' 
                                    : 'text-white'
                                }`} 
                              />
                            </button>

                            {/* Discount Badge */}
                            {product.discount && (
                              <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                                -{product.discount}%
                              </div>
                            )}

                            {/* Collection Badge */}
                            <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded text-xs">
                              {product.collection}
                            </div>
                          </div>

                          {/* Product Info */}
                          <div className="p-4">
                            <div className="flex items-center space-x-1 mb-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              ))}
                              <span className="text-xs text-gray-400 ml-2">(4.8)</span>
                            </div>
                            
                            <Link href={`/product/${product.id}`}>
                              <h3 className="text-white font-semibold mb-2 line-clamp-2 group-hover:text-red-400 transition-colors">
                                {product.name}
                              </h3>
                            </Link>
                            
                            <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                              {product.description}
                            </p>

                            {/* Price */}
                            <div className="flex items-center space-x-2 mb-4">
                              <span className="text-white font-bold text-lg">
                                ${product.price}
                              </span>
                              {product.originalPrice && (
                                <span className="text-gray-500 line-through text-sm">
                                  ${product.originalPrice}
                                </span>
                              )}
                            </div>

                            {/* Add to Cart Button */}
                            <Button 
                              onClick={() => handleAddToCart(product)}
                              className={`w-full font-semibold py-2 flex items-center justify-center space-x-2 transition-all ${
                                addedToCart.includes(product.id)
                                  ? 'bg-green-600 hover:bg-green-700'
                                  : 'bg-red-600 hover:bg-red-700'
                              } text-white`}
                            >
                              {addedToCart.includes(product.id) ? (
                                <>
                                  <Check className="w-4 h-4" />
                                  <span>¡Agregado!</span>
                                </>
                              ) : (
                                <>
                                  <ShoppingCart className="w-4 h-4" />
                                  <span>Añadir al carrito</span>
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* List View */}
                {viewMode === 'list' && (
                  <div className="space-y-4">
                    {filteredProducts.map((product) => (
                      <div key={product.id} className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-colors">
                        <div className="flex flex-col sm:flex-row">
                          {/* Product Image */}
                          <div className="relative w-full sm:w-48 h-48 sm:h-32 overflow-hidden">
                            <Link href={`/product/${product.id}`}>
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-300"
                              />
                            </Link>
                            
                            {/* Discount Badge */}
                            {product.discount && (
                              <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                                -{product.discount}%
                              </div>
                            )}
                          </div>

                          {/* Product Info */}
                          <div className="flex-1 p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="text-xs text-red-400 font-medium">
                                    {product.collection}
                                  </span>
                                  <div className="flex items-center space-x-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                    ))}
                                    <span className="text-xs text-gray-400">(4.8)</span>
                                  </div>
                                </div>
                                
                                <Link href={`/product/${product.id}`}>
                                  <h3 className="text-white font-semibold mb-2 hover:text-red-400 transition-colors">
                                    {product.name}
                                  </h3>
                                </Link>
                                
                                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                                  {product.description}
                                </p>

                                <div className="flex items-center space-x-2">
                                  <span className="text-white font-bold text-lg">
                                    ${product.price}
                                  </span>
                                  {product.originalPrice && (
                                    <span className="text-gray-500 line-through text-sm">
                                      ${product.originalPrice}
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="ml-4 flex flex-col items-end space-y-2">
                                <button
                                  onClick={() => toggleWishlist(product.id)}
                                  className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                                >
                                  <Heart 
                                    className={`w-4 h-4 ${
                                      wishlist.includes(product.id) 
                                        ? 'fill-red-600 text-red-600' 
                                        : 'text-gray-400'
                                    }`} 
                                  />
                                </button>
                                
                                <Button 
                                  size="sm"
                                  onClick={() => handleAddToCart(product)}
                                  className={`transition-all ${
                                    addedToCart.includes(product.id)
                                      ? 'bg-green-600 hover:bg-green-700'
                                      : 'bg-red-600 hover:bg-red-700'
                                  } text-white`}
                                >
                                  {addedToCart.includes(product.id) ? (
                                    <>
                                      <Check className="w-4 h-4 mr-1" />
                                      ¡Agregado!
                                    </>
                                  ) : (
                                    <>
                                      <ShoppingCart className="w-4 h-4 mr-1" />
                                      Añadir
                                    </>
                                  )}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Load More Button */}
                {filteredProducts.length >= 12 && (
                  <div className="text-center mt-12">
                    <Button 
                      variant="outline" 
                      className="border-gray-600 text-white hover:bg-red-600 hover:border-red-600 px-8 py-3"
                    >
                      Cargar más productos
                    </Button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}