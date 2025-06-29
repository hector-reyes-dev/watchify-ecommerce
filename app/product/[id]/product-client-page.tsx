'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Star, Truck, Shield, RotateCcw, Check } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/contexts/cart-context';

interface ProductClientPageProps {
  product: Product | undefined;
}

export default function ProductClientPage({ product }: ProductClientPageProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
          <p className="text-gray-400">El producto que buscas no existe.</p>
        </div>
      </div>
    );
  }

  const images = product.images || [product.image];

  const handleAddToCart = () => {
    // Validate required selections
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert('Por favor selecciona una talla');
      return;
    }
    
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      alert('Por favor selecciona un color');
      return;
    }

    addToCart(product, quantity, selectedSize, selectedColor);
    setIsAddedToCart(true);
    
    // Reset the success state after 3 seconds
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-800">
              <Image
                src={images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 relative overflow-hidden rounded-lg border-2 ${
                      selectedImage === index ? 'border-red-600' : 'border-gray-700'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="text-white space-y-6">
            <div>
              <p className="text-gray-400 text-sm font-medium mb-2">{product.collection}</p>
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight mb-4">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-400">(128 reseñas)</span>
              </div>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed">
              {product.description}
            </p>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-white">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
              {product.discount && (
                <span className="bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold">
                  -{product.discount}% OFF
                </span>
              )}
            </div>

            {/* Size Selection */}
            {product.sizes && (
              <div className="space-y-3">
                <p className="font-medium text-gray-300">
                  Talla: {selectedSize && <span className="text-white">{selectedSize}</span>}
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 border rounded-md font-medium transition-colors ${
                        selectedSize === size
                          ? 'border-red-600 bg-red-600 text-white'
                          : 'border-gray-600 hover:border-red-600 hover:bg-red-600/10'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && (
              <div className="space-y-3">
                <p className="font-medium text-gray-300">
                  Color: {selectedColor && <span className="text-white capitalize">{selectedColor}</span>}
                </p>
                <div className="flex space-x-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 transition-colors ${
                        selectedColor === color ? 'border-white' : 'border-gray-600'
                      } ${
                        color === 'yellow' ? 'bg-yellow-500' :
                        color === 'black' ? 'bg-black' :
                        color === 'red' ? 'bg-red-600' :
                        color === 'gray' ? 'bg-gray-500' :
                        color === 'white' ? 'bg-white' :
                        color === 'blue' ? 'bg-blue-600' :
                        color === 'green' ? 'bg-green-600' :
                        color === 'navy' ? 'bg-blue-900' :
                        color === 'dark-red' ? 'bg-red-800' :
                        color === 'dark-gray' ? 'bg-gray-700' :
                        color === 'charcoal' ? 'bg-gray-800' :
                        'bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="space-y-3">
              <p className="font-medium text-gray-300">Cantidad:</p>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-600 rounded-md hover:border-red-600 transition-colors"
                >
                  -
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-600 rounded-md hover:border-red-600 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-4 pt-4">
              <Button 
                onClick={handleAddToCart}
                className={`flex-1 py-3 font-semibold flex items-center justify-center space-x-2 transition-all ${
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

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-800">
              <div className="flex items-center space-x-3">
                <Truck className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-sm font-medium">Envío gratis</p>
                  <p className="text-xs text-gray-400">En pedidos +$50</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-sm font-medium">Devoluciones</p>
                  <p className="text-xs text-gray-400">30 días</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-sm font-medium">Garantía</p>
                  <p className="text-xs text-gray-400">Producto oficial</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}