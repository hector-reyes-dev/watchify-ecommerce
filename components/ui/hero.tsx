'use client';

import Image from 'next/image';
import { Button } from './button';
import { ShoppingCart, Heart, Star, Play } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-black via-gray-900 to-black min-h-[70vh] flex items-center">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-red-400">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-medium">PRODUCTO DESTACADO</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Rompevientos
                <span className="block text-yellow-400">Amarillo</span>
              </h1>
              
              <p className="text-xl text-gray-300 max-w-lg">
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. 
                Velit officia consequat duis enim velit mollit.
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-gray-400">(4.8)</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-400">128 reseñas</span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-4xl font-bold">$49.89</span>
              <span className="text-2xl text-gray-500 line-through">$65.99</span>
              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                -24% OFF
              </span>
            </div>

            {/* Sizes */}
            <div className="space-y-3">
              <p className="font-medium text-gray-300">Tallas disponibles:</p>
              <div className="flex space-x-2">
                {['S', 'M', 'L', 'XL'].map((size) => (
                  <button
                    key={size}
                    className="w-12 h-12 border border-gray-600 rounded-md hover:border-red-600 hover:bg-red-600/10 transition-colors font-medium"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-4 pt-2">
              <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg font-semibold flex items-center space-x-2">
                <ShoppingCart className="w-5 h-5" />
                <span>Agregar al carrito</span>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-gray-600 hover:border-red-600 text-white"
              >
                <Heart className="w-5 h-5 text-red-500" />
              </Button>
            </div>

            {/* Features */}
            <div className="flex items-center space-x-6 pt-4 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>En stock</span>
              </div>
              <span>Envío gratis +$50</span>
              <span>Devoluciones 30 días</span>
            </div>
          </div>

          {/* Product Image */}
          <div className="relative">
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-2xl"></div>
              <Image
                src="https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Rompevientos Amarillo"
                fill
                className="object-cover rounded-2xl"
                priority
              />
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                ¡Oferta!
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-black/80 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                  <Play className="w-4 h-4" />
                  <span>Ver en acción</span>
                </div>
              </div>
            </div>

            {/* Background decoration */}
            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}