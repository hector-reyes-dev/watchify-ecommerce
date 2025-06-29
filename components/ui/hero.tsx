'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Play, Check } from 'lucide-react';
import { featuredProduct } from '@/lib/data';
import { useCart } from '@/contexts/cart-context';

export function Hero() {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (featuredProduct) {
      addToCart(featuredProduct, 1);
      setIsAddedToCart(true);
      
      // Reset the success state after 3 seconds
      setTimeout(() => {
        setIsAddedToCart(false);
      }, 3000);
    }
  };

  return (
    <section className="relative bg-gradient-to-r from-black via-gray-900 to-black min-h-[70vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Netflix Series Background"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  NUEVO
                </span>
                <span className="text-red-400 font-medium">Producto Destacado</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Descubre el
                <span className="text-red-600 block">Merchandising</span>
                Oficial de Netflix
              </h1>
              
              <p className="text-lg md:text-xl text-gray-300 max-w-lg">
                Productos exclusivos de tus series favoritas. Calidad premium, 
                diseños únicos y envío gratis en pedidos superiores a $50.
              </p>
            </div>

            <div className="flex space-x-4 pt-2">
              <Button 
                onClick={handleAddToCart}
                className={`h-10 px-8 py-3 text-lg font-semibold flex items-center space-x-2 transition-all ${
                  isAddedToCart 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-red-600 hover:bg-red-700'
                } text-white`}
              >
                {isAddedToCart ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>¡Agregado!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    <span>Agregar al carrito</span>
                  </>
                )}
              </Button>
              
              <Button 
                variant="outline" 
                className="border-gray-600 text-white hover:bg-red-600 hover:border-red-600 h-10 px-6 py-3 text-lg font-semibold flex items-center space-x-2"
              >
                <Play className="w-5 h-5" />
                <span>Ver trailer</span>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-8 pt-4 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Productos oficiales</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Envío mundial</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>Garantía de calidad</span>
              </div>
            </div>
          </div>

          {/* Featured Product Card */}
          <div className="relative">
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-red-600 transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Destacado
                </span>
                <span className="text-yellow-400 text-sm font-medium">⭐ 4.8/5</span>
              </div>
              
              <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
                <Image
                  src={featuredProduct?.image || "https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=600"}
                  alt={featuredProduct?.name || "Producto destacado"}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                />
                {featuredProduct?.discount && (
                  <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                    -{featuredProduct.discount}%
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-red-400 text-sm font-medium">{featuredProduct?.collection}</p>
                  <h3 className="text-white font-bold text-lg">{featuredProduct?.name}</h3>
                </div>
                
                <p className="text-gray-400 text-sm line-clamp-2">
                  {featuredProduct?.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-bold text-xl">
                      ${featuredProduct?.price}
                    </span>
                    {featuredProduct?.originalPrice && (
                      <span className="text-gray-500 line-through text-sm">
                        ${featuredProduct.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  <Link href={`/product/${featuredProduct?.id}`}>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-gray-600 text-white hover:bg-red-600 hover:border-red-600"
                    >
                      Ver detalles
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}