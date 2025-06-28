'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { collections, collectionProducts } from '@/lib/data';
import { useState } from 'react';

export async function generateStaticParams() {
  return collections.map((collection) => ({
    slug: collection.slug,
  }));
}

export default function CollectionPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const collection = collections.find(c => c.slug === slug);
  const products = collectionProducts[slug] || [];
  
  const [wishlist, setWishlist] = useState<string[]>([]);

  if (!collection) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Colección no encontrada</h1>
          <p className="text-gray-400">La colección que buscas no existe.</p>
        </div>
      </div>
    );
  }

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Collection Banner */}
      <section className="relative h-96 overflow-hidden">
        <Image
          src={collection.bannerImage}
          alt={collection.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {collection.name}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-6 max-w-2xl mx-auto">
              {collection.description}
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-300">
              <span>{collection.productCount} productos</span>
              <span>•</span>
              <span>Productos oficiales</span>
              <span>•</span>
              <span>Envío gratis +$50</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">
              Productos de {collection.name}
            </h2>
            <div className="flex items-center space-x-4">
              <select className="bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 text-sm">
                <option>Ordenar por</option>
                <option>Precio: Menor a Mayor</option>
                <option>Precio: Mayor a Menor</option>
                <option>Más Populares</option>
                <option>Más Recientes</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="group">
                <div className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-all duration-300 hover:scale-105">
                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    
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
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <div className="flex items-center space-x-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-xs text-gray-400 ml-2">(4.8)</span>
                    </div>
                    
                    <h3 className="text-white font-semibold mb-2 line-clamp-2 group-hover:text-red-400 transition-colors">
                      {product.name}
                    </h3>
                    
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

                    {/* Sizes */}
                    {product.sizes && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {product.sizes.slice(0, 4).map((size) => (
                          <span key={size} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                            {size}
                          </span>
                        ))}
                        {product.sizes.length > 4 && (
                          <span className="text-xs text-gray-400">+{product.sizes.length - 4}</span>
                        )}
                      </div>
                    )}

                    {/* Add to Cart Button */}
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 flex items-center justify-center space-x-2 transition-colors">
                      <ShoppingCart className="w-4 h-4" />
                      <span>Añadir al carrito</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {products.length >= 8 && (
            <div className="text-center mt-12">
              <Button 
                variant="outline" 
                className="border-gray-600 text-white hover:bg-red-600 hover:border-red-600 px-8 py-3"
              >
                Cargar más productos
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}