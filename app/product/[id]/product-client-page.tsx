'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  ShoppingCart, 
  Star, 
  Truck, 
  Shield, 
  RotateCcw, 
  Check, 
  ChevronLeft, 
  ChevronRight,
  Plus,
  Minus,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
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
  const [showDescription, setShowDescription] = useState(false);
  const [showShipping, setShowShipping] = useState(false);
  const [showCare, setShowCare] = useState(false);
  
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

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-8">
          <Link href="/collections" className="hover:text-white transition-colors">
            Colecciones
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/collection/${product.collection.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-white transition-colors">
            {product.collection}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column - Product Info */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <div className="sticky top-24">
              {/* Product Title */}
              <div className="mb-6">
                <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 leading-tight">
                  {product.name}
                </h1>
                <p className="text-red-400 text-sm font-medium uppercase tracking-wide">
                  {product.collection}
                </p>
              </div>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline space-x-3">
                  <span className="text-4xl font-bold text-white">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                {product.discount && (
                  <div className="mt-2">
                    <span className="inline-block bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {product.discount}% OFF
                    </span>
                  </div>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-8">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-400">(128 reseñas)</span>
              </div>

              {/* Collapsible Sections */}
              <div className="space-y-4 mb-8">
                {/* Description */}
                <div className="border-b border-gray-800">
                  <button
                    onClick={() => setShowDescription(!showDescription)}
                    className="w-full flex items-center justify-between py-4 text-left"
                  >
                    <span className="text-white font-medium">Descripción</span>
                    {showDescription ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  {showDescription && (
                    <div className="pb-4">
                      <p className="text-gray-300 leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                  )}
                </div>

                {/* Shipping & Returns */}
                <div className="border-b border-gray-800">
                  <button
                    onClick={() => setShowShipping(!showShipping)}
                    className="w-full flex items-center justify-between py-4 text-left"
                  >
                    <span className="text-white font-medium">Envío y Devoluciones</span>
                    {showShipping ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  {showShipping && (
                    <div className="pb-4 space-y-3">
                      <div className="flex items-center space-x-3">
                        <Truck className="w-5 h-5 text-red-600" />
                        <div>
                          <p className="text-white font-medium">Envío gratis</p>
                          <p className="text-gray-400 text-sm">En pedidos superiores a $50</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RotateCcw className="w-5 h-5 text-red-600" />
                        <div>
                          <p className="text-white font-medium">Devoluciones gratuitas</p>
                          <p className="text-gray-400 text-sm">30 días para devolver tu pedido</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Care Instructions */}
                <div className="border-b border-gray-800">
                  <button
                    onClick={() => setShowCare(!showCare)}
                    className="w-full flex items-center justify-between py-4 text-left"
                  >
                    <span className="text-white font-medium">Cuidado</span>
                    {showCare ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  {showCare && (
                    <div className="pb-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <Shield className="w-5 h-5 text-red-600" />
                        <div>
                          <p className="text-white font-medium">Producto oficial</p>
                          <p className="text-gray-400 text-sm">Garantía de calidad Netflix</p>
                        </div>
                      </div>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Lavar a máquina en agua fría</li>
                        <li>• No usar blanqueador</li>
                        <li>• Secar a temperatura baja</li>
                        <li>• Planchar a temperatura media</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Center Column - Product Image Slider */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="relative">
              {/* Main Image Slider Container */}
              <div className="relative aspect-[4/5] bg-gray-900 rounded-lg overflow-hidden mb-4">
                {/* Image Slider */}
                <div 
                  className="flex transition-transform duration-500 ease-in-out h-full"
                  style={{ transform: `translateX(-${selectedImage * 100}%)` }}
                >
                  {images.map((image, index) => (
                    <div key={index} className="w-full h-full flex-shrink-0 relative">
                      <Image
                        src={image}
                        alt={`${product.name} - Vista ${index + 1}`}
                        fill
                        className="object-cover"
                        priority={index === 0}
                      />
                    </div>
                  ))}
                </div>
                
                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40 group"
                      aria-label="Imagen anterior"
                    >
                      <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40 group"
                      aria-label="Imagen siguiente"
                    >
                      <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                    </button>
                  </>
                )}

                {/* Image Indicators */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          selectedImage === index 
                            ? 'bg-white scale-125' 
                            : 'bg-white/50 hover:bg-white/75'
                        }`}
                        aria-label={`Ir a imagen ${index + 1}`}
                      />
                    ))}
                  </div>
                )}

                {/* Discount Badge */}
                {product.discount && (
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                    -{product.discount}%
                  </div>
                )}

                {/* Wishlist Button */}
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="absolute top-4 right-4 w-12 h-12 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40 group"
                  aria-label={isWishlisted ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                >
                  <Heart className={`w-6 h-6 transition-all duration-300 group-hover:scale-110 ${
                    isWishlisted ? 'fill-red-600 text-red-600' : 'text-white'
                  }`} />
                </button>

                {/* Image Counter */}
                {images.length > 1 && (
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                    {selectedImage + 1} / {images.length}
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              {images.length > 1 && (
                <div className="flex space-x-3 overflow-x-auto pb-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 relative overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                        selectedImage === index 
                          ? 'border-red-600 scale-105 shadow-lg shadow-red-600/25' 
                          : 'border-gray-700 hover:border-gray-500 hover:scale-102'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} - Miniatura ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      {/* Active Overlay */}
                      {selectedImage === index && (
                        <div className="absolute inset-0 bg-red-600/20" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Product Options */}
          <div className="lg:col-span-3 order-3">
            <div className="bg-gray-900 rounded-lg p-6 sticky top-24">
              <h3 className="text-white font-semibold mb-6 text-lg">Nuevo Lanzamiento</h3>

              {/* Size Selection */}
              {product.sizes && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-300 font-medium">Talla</span>
                    {selectedSize && (
                      <span className="text-white text-sm">{selectedSize}</span>
                    )}
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`aspect-square border rounded-md font-medium transition-colors text-sm ${
                          selectedSize === size
                            ? 'border-red-600 bg-red-600 text-white'
                            : 'border-gray-600 text-gray-300 hover:border-red-600 hover:text-white'
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
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-300 font-medium">Colores</span>
                    {selectedColor && (
                      <span className="text-white text-sm capitalize">{selectedColor}</span>
                    )}
                  </div>
                  <div className="flex space-x-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 rounded-full border-2 transition-colors ${
                          selectedColor === color ? 'border-white' : 'border-gray-600 hover:border-gray-400'
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
                          color === 'beige' ? 'bg-amber-100' :
                          color === 'cream' ? 'bg-amber-50' :
                          color === 'rose' ? 'bg-rose-400' :
                          color === 'royal-blue' ? 'bg-blue-700' :
                          color === 'burgundy' ? 'bg-red-900' :
                          color === 'lavender' ? 'bg-purple-300' :
                          color === 'pink' ? 'bg-pink-500' :
                          color === 'gold' ? 'bg-yellow-400' :
                          color === 'silver' ? 'bg-gray-400' :
                          color === 'multicolor' ? 'bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500' :
                          color === 'vintage' ? 'bg-amber-700' :
                          color === 'sepia' ? 'bg-amber-800' :
                          color === 'black-white' ? 'bg-gradient-to-r from-black to-white' :
                          'bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <span className="text-gray-300 font-medium mb-3 block">QTY</span>
                <div className="flex items-center justify-center bg-gray-800 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center text-white hover:text-red-400 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center text-white font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center text-white hover:text-red-400 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button 
                onClick={handleAddToCart}
                className={`w-full py-4 font-semibold text-lg transition-all ${
                  isAddedToCart 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-red-600 hover:bg-red-700'
                } text-white`}
              >
                {isAddedToCart ? 'Agregado al Carrito' : 'Add To Bag'}
              </Button>

              {/* Discount Notice */}
              <div className="mt-4 text-center">
                <p className="text-gray-400 text-sm">
                  30% Descuento en productos seleccionados
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}