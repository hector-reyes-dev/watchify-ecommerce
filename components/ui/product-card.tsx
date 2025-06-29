'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Star, Check } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/contexts/cart-context';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className = '' }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, 1);
    setIsAddedToCart(true);
    
    // Reset the success state after 3 seconds
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 3000);
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className={`group ${className}`}>
      <div className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-all duration-300 hover:scale-105">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden">
          <Link href={`/product/${product.id}`}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300 cursor-pointer"
            />
          </Link>
          
          {/* Wishlist Button */}
          <button
            onClick={toggleWishlist}
            className="absolute top-3 right-3 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors z-10"
          >
            <Heart 
              className={`w-4 h-4 ${
                isWishlisted 
                  ? 'fill-red-600 text-red-600' 
                  : 'text-white'
              }`} 
            />
          </button>

          {/* Discount Badge */}
          {product.discount && (
            <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold z-10">
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
            <h3 className="text-white font-semibold mb-2 line-clamp-2 group-hover:text-red-400 transition-colors cursor-pointer">
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
          <Button 
            onClick={handleAddToCart}
            className={`w-full font-semibold py-2 flex items-center justify-center space-x-2 transition-all ${
              isAddedToCart
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-red-600 hover:bg-red-700'
            } text-white`}
          >
            {isAddedToCart ? (
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
  );
}