'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Search, Filter, Grid, List, Star, ArrowRight, X } from 'lucide-react';
import { Collection } from '@/types';

interface CollectionsPageClientProps {
  collections: Collection[];
}

export default function CollectionsPageClient({ collections }: CollectionsPageClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Get initial search from URL params
  const initialSearch = searchParams.get('search') || '';
  
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Update search term when URL params change
  useEffect(() => {
    const urlSearch = searchParams.get('search') || '';
    setSearchTerm(urlSearch);
  }, [searchParams]);

  // Enhanced search function for collections
  const searchCollections = (collections: Collection[], query: string) => {
    if (!query.trim()) return collections;
    
    const searchTerms = query.toLowerCase().trim().split(' ');
    
    return collections.filter(collection => {
      const searchableText = [
        collection.name,
        collection.showTitle,
        collection.description
      ].join(' ').toLowerCase();
      
      // Check if all search terms are found in the searchable text
      return searchTerms.every(term => searchableText.includes(term));
    });
  };

  // Calculate search relevance score for collections
  const calculateRelevance = (collection: Collection, query: string) => {
    const searchTerms = query.toLowerCase().trim().split(' ');
    let score = 0;
    
    searchTerms.forEach(term => {
      // Higher score for matches in name
      if (collection.name.toLowerCase().includes(term)) {
        score += 10;
      }
      // Higher score for matches in show title
      if (collection.showTitle.toLowerCase().includes(term)) {
        score += 8;
      }
      // Lower score for matches in description
      if (collection.description.toLowerCase().includes(term)) {
        score += 2;
      }
    });
    
    return score;
  };

  const filteredCollections = useMemo(() => {
    let filtered = collections;
    
    // Apply search filter
    if (searchTerm.trim()) {
      filtered = searchCollections(filtered, searchTerm);
    }
    
    // Apply sorting
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'products':
          return b.productCount - a.productCount;
        case 'newest':
          return a.id.localeCompare(b.id);
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
  }, [collections, searchTerm, sortBy]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Update URL with search parameter
    if (value.trim()) {
      router.push(`/collections?search=${encodeURIComponent(value.trim())}`);
    } else {
      router.push('/collections');
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    router.push('/collections');
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-80 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/80 to-black/80" />
        <Image
          src="https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Colecciones Netflix"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {searchTerm.trim() ? `Resultados para "${searchTerm}"` : 'Todas las Colecciones'}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-6 max-w-2xl mx-auto">
              {searchTerm.trim() 
                ? `${filteredCollections.length} colecciones encontradas`
                : 'Explora productos exclusivos de tus series favoritas de Netflix. Encuentra merchandising oficial de las mejores producciones.'
              }
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>Productos oficiales</span>
              </div>
              <span>•</span>
              <span>Envío gratis +$50</span>
              <span>•</span>
              <span>{collections.length} colecciones</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 px-4 border-b border-gray-800">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar colecciones o series..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg pl-10 pr-10 py-3 focus:outline-none focus:border-red-600 transition-colors"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-400 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-red-600"
              >
                <option value="name">Ordenar por nombre</option>
                <option value="products">Más productos</option>
                <option value="newest">Más recientes</option>
                {searchTerm.trim() && <option value="relevance">Más relevantes</option>}
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
        </div>
      </section>

      {/* Collections Grid/List */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          {filteredCollections.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">
                  {searchTerm.trim() ? 'No se encontraron colecciones' : 'No hay colecciones disponibles'}
                </h3>
                <p className="mb-4">
                  {searchTerm.trim() 
                    ? `No encontramos colecciones que coincidan con "${searchTerm}"`
                    : 'Intenta con otros términos de búsqueda'
                  }
                </p>
                {searchTerm.trim() && (
                  <Button
                    onClick={clearSearch}
                    variant="outline"
                    className="border-gray-600 text-white hover:bg-red-600 hover:border-red-600"
                  >
                    Limpiar búsqueda
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Results count */}
              <div className="mb-8">
                <p className="text-gray-400">
                  Mostrando {filteredCollections.length} de {collections.length} colecciones
                  {searchTerm.trim() && ` para "${searchTerm}"`}
                </p>
              </div>

              {/* Grid View */}
              {viewMode === 'grid' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredCollections.map((collection) => (
                    <Link 
                      key={collection.id} 
                      href={`/collection/${collection.slug}`}
                      className="group"
                    >
                      <div className="bg-gray-900 rounded-xl overflow-hidden hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                        {/* Collection Image */}
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <Image
                            src={collection.image}
                            alt={collection.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                          
                          {/* Product Count Badge */}
                          <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            {collection.productCount} productos
                          </div>
                        </div>

                        {/* Collection Info */}
                        <div className="p-6">
                          <div className="mb-3">
                            <p className="text-red-400 text-sm font-medium mb-1">
                              {collection.showTitle}
                            </p>
                            <h3 className="text-white text-xl font-bold group-hover:text-red-400 transition-colors">
                              {collection.name}
                            </h3>
                          </div>
                          
                          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                            {collection.description}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              ))}
                              <span className="text-xs text-gray-400 ml-2">(4.8)</span>
                            </div>
                            
                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-red-400 group-hover:translate-x-1 transition-all" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* List View */}
              {viewMode === 'list' && (
                <div className="space-y-6">
                  {filteredCollections.map((collection) => (
                    <Link 
                      key={collection.id} 
                      href={`/collection/${collection.slug}`}
                      className="group"
                    >
                      <div className="bg-gray-900 rounded-xl overflow-hidden hover:bg-gray-800 transition-all duration-300 hover:shadow-xl">
                        <div className="flex flex-col md:flex-row">
                          {/* Collection Image */}
                          <div className="relative w-full md:w-80 h-48 md:h-32 overflow-hidden">
                            <Image
                              src={collection.image}
                              alt={collection.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>

                          {/* Collection Info */}
                          <div className="flex-1 p-6">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="mb-2">
                                  <p className="text-red-400 text-sm font-medium">
                                    {collection.showTitle}
                                  </p>
                                  <h3 className="text-white text-xl font-bold group-hover:text-red-400 transition-colors">
                                    {collection.name}
                                  </h3>
                                </div>
                                
                                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                                  {collection.description}
                                </p>

                                <div className="flex items-center space-x-4 text-sm text-gray-400">
                                  <span>{collection.productCount} productos</span>
                                  <div className="flex items-center space-x-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                    ))}
                                    <span className="ml-1">(4.8)</span>
                                  </div>
                                </div>
                              </div>

                              <div className="ml-4 flex items-center">
                                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-red-400 group-hover:translate-x-1 transition-all" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-red-900/20 to-black/20 border-t border-gray-800">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Suscríbete a nuestro newsletter para ser el primero en conocer nuevas colecciones 
            y productos exclusivos de tus series favoritas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Tu email"
              className="flex-1 bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600"
            />
            <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 font-semibold">
              Suscribirse
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}