'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className = '' }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className={`bg-gray-900 rounded-lg overflow-hidden group hover:bg-gray-800 transition-all duration-300 ${className}`}>
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Wishlist Button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-3 right-3 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
        >
          <Heart
            className={`w-4 h-4 ${
              isWishlisted ? 'fill-red-600 text-red-600' : 'text-white'
            }`}
          />
        </button>

        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
            -{product.discount}%
          </div>
        )}

        {/* Color Options */}
        {product.colors && product.colors.length > 1 && (
          <div className="absolute bottom-3 left-3 flex space-x-1">
            {product.colors.slice(0, 3).map((color, index) => (
              <div
                key={index}
                className={`w-4 h-4 rounded-full border border-white/50 ${
                  color === 'yellow' ? 'bg-yellow-500' :
                  color === 'black' ? 'bg-black' :
                  color === 'red' ? 'bg-red-600' :
                  color === 'gray' ? 'bg-gray-500' :
                  'bg-white'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="p-4 space-y-3">
        <div>
          <p className="text-gray-400 text-xs font-medium">{product.collection}</p>
          <Link href={`/product/${product.id}`}>
            <h3 className="text-white font-semibold hover:text-red-400 transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-white font-bold">${product.price}</span>
            {product.originalPrice && (
              <span className="text-gray-500 line-through text-sm">
                ${product.originalPrice}
              </span>
            )}
          </div>
          
          <Button
            size="sm"
            className="bg-red-600 hover:bg-red-700 text-white p-2"
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>

        {/* Sizes */}
        {product.sizes && (
          <div className="flex space-x-1">
            {product.sizes.slice(0, 4).map((size) => (
              <span
                key={size}
                className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
              >
                {size}
              </span>
            ))}
            {product.sizes.length > 4 && (
              <span className="text-xs text-gray-400">+{product.sizes.length - 4}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}