'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star, Check } from 'lucide-react';
import { featuredProduct } from '@/lib/data';
import { useCart } from '@/contexts/cart-context';

export function Hero() {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(featuredProduct, 1);
    setIsAddedToCart(true);
    
    // Reset the success state after 3 seconds
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 3000);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Netflix Merchandise Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-white space-y-8">
            <div className="space-y-4">
              <div className="inline-block bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                🔥 PRODUCTO DESTACADO
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Merchandising
                <span className="text-red-600"> Oficial</span>
                <br />
                de Netflix
              </h1>
              <p className="text-xl text-gray-300 max-w-lg">
                Descubre productos exclusivos de tus series favoritas. 
                Calidad premium, diseños únicos y envío gratis en pedidos superiores a $50.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleAddToCart}
                className={`px-8 py-4 text-lg font-semibold flex items-center space-x-2 transition-all ${
                  isAddedToCart 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-red-600 hover:bg-red-700'
                } text-white`}
              >
                {isAddedToCart ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>¡Agregado al carrito!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    <span>Agregar al carrito</span>
                  </>
                )}
              </Button>
              
              <Link href="/collections">
                <Button 
                  variant="outline" 
                  className="px-8 py-4 text-lg font-semibold border-white text-white hover:bg-white hover:text-black"
                >
                  Ver colecciones
                </Button>
              </Link>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>4.8/5 valoración</span>
              </div>
              <span>•</span>
              <span>Envío gratis +$50</span>
              <span>•</span>
              <span>Productos oficiales</span>
            </div>
          </div>

          {/* Featured Product Card */}
          <div className="relative">
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
              <div className="text-center mb-6">
                <div className="inline-block bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
                  PRODUCTO DESTACADO
                </div>
                <h3 className="text-white text-2xl font-bold mb-2">
                  {featuredProduct.name}
                </h3>
                <p className="text-gray-300 mb-4">
                  {featuredProduct.description}
                </p>
              </div>

              <div className="relative aspect-square mb-6 overflow-hidden rounded-lg">
                <Image
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  fill
                  className="object-cover"
                />
                {featuredProduct.discount && (
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    -{featuredProduct.discount}% OFF
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-gray-400 ml-2">(4.8)</span>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    <span className="text-white font-bold text-3xl">
                      ${featuredProduct.price}
                    </span>
                    {featuredProduct.originalPrice && (
                      <span className="text-gray-500 line-through text-xl">
                        ${featuredProduct.originalPrice}
                      </span>
                    )}
                  </div>

                  {featuredProduct.sizes && (
                    <div className="flex justify-center gap-2 mb-4">
                      {featuredProduct.sizes.slice(0, 4).map((size) => (
                        <span key={size} className="text-xs bg-gray-800 text-gray-300 px-3 py-1 rounded">
                          {size}
                        </span>
                      ))}
                    </div>
                  )}

                  <Link href={`/product/${featuredProduct.id}`}>
                    <Button 
                      variant="outline" 
                      className="w-full border-gray-600 text-white hover:bg-red-600 hover:border-red-600"
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

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}