'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart } from 'lucide-react';
import { featuredProduct } from '@/lib/data';

export function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const images = featuredProduct.images || [featuredProduct.image];

  return (
    <section className="relative bg-gradient-to-r from-black via-gray-900 to-black min-h-[70vh] flex items-center">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Product Images */}
          <div className="relative">
            <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-800">
              <Image
                src={images[currentImage]}
                alt={featuredProduct.name}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                priority
              />
            </div>
            
            {/* Image Dots */}
            {images.length > 1 && (
              <div className="flex justify-center mt-4 space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      currentImage === index ? 'bg-red-600' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="text-white space-y-6">
            <div className="space-y-2">
              <p className="text-gray-400 text-sm font-medium">{featuredProduct.collection}</p>
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                {featuredProduct.name}
              </h1>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed max-w-md">
              {featuredProduct.description}
            </p>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-white">
                ${featuredProduct.price}
              </span>
              {featuredProduct.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  ${featuredProduct.originalPrice}
                </span>
              )}
              {featuredProduct.discount && (
                <span className="bg-red-600 text-white px-2 py-1 rounded text-sm font-semibold">
                  -{featuredProduct.discount}%
                </span>
              )}
            </div>

            {/* Size Selection */}
            {featuredProduct.sizes && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-300">Talla:</p>
                <div className="flex space-x-2">
                  {featuredProduct.sizes.map((size) => (
                    <button
                      key={size}
                      className="w-10 h-10 border border-gray-600 rounded-md hover:border-red-600 hover:bg-red-600/10 transition-colors text-sm font-medium"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {featuredProduct.colors && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-300">Color:</p>
                <div className="flex space-x-2">
                  {featuredProduct.colors.map((color) => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full border-2 border-gray-600 hover:border-white transition-colors ${
                        color === 'yellow' ? 'bg-yellow-500' :
                        color === 'black' ? 'bg-black' :
                        color === 'red' ? 'bg-red-600' :
                        color === 'gray' ? 'bg-gray-500' :
                        'bg-white'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex space-x-4 pt-2">
              <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors">
                <ShoppingCart className="w-5 h-5" />
                <span>Agregar a la bolsa</span>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`border-gray-600 hover:border-red-600 ${
                  isWishlisted ? 'text-red-600 border-red-600' : 'text-white'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}