'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft, 
  Truck, 
  Shield, 
  RotateCcw,
  Tag,
  CreditCard
} from 'lucide-react';
import { useCart } from '@/contexts/cart-context';

export default function CartPageClient() {
  const { state, removeFromCart, updateQuantity, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);

  const shipping = state.totalPrice >= 50 ? 0 : 9.99;
  const discount = isPromoApplied ? state.totalPrice * 0.1 : 0;
  const finalTotal = state.totalPrice + shipping - discount;

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'wachify10') {
      setIsPromoApplied(true);
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        
        <main className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <div className="mb-8">
              <ShoppingCart className="w-24 h-24 text-gray-600 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-white mb-4">
                Tu carrito está vacío
              </h1>
              <p className="text-gray-400 mb-8">
                Parece que aún no has agregado ningún producto a tu carrito. 
                ¡Explora nuestras colecciones y encuentra algo increíble!
              </p>
            </div>
            
            <div className="space-y-4">
              <Link href="/products">
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 font-semibold">
                  Explorar productos
                </Button>
              </Link>
              
              <Link href="/collections">
                <Button 
                  variant="outline" 
                  className="w-full border-gray-600 text-white hover:bg-red-600 hover:border-red-600"
                >
                  Ver colecciones
                </Button>
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/products">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-white hover:text-red-400 hover:bg-gray-800"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Seguir comprando
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Carrito de compras</h1>
              <p className="text-gray-400">{state.totalItems} producto{state.totalItems !== 1 ? 's' : ''}</p>
            </div>
          </div>
          
          {state.items.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearCart}
              className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Vaciar carrito
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <div key={item.id} className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition-colors">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Product Image */}
                  <div className="relative w-full sm:w-32 h-32 overflow-hidden rounded-lg bg-gray-800 flex-shrink-0">
                    <Link href={`/product/${item.product.id}`}>
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <p className="text-red-400 text-sm font-medium">
                        {item.product.collection}
                      </p>
                      <Link href={`/product/${item.product.id}`}>
                        <h3 className="text-white font-semibold text-lg hover:text-red-400 transition-colors">
                          {item.product.name}
                        </h3>
                      </Link>
                    </div>

                    {/* Variants */}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                      {item.size && (
                        <span>Talla: <span className="text-white">{item.size}</span></span>
                      )}
                      {item.color && (
                        <span>Color: <span className="text-white capitalize">{item.color}</span></span>
                      )}
                    </div>

                    {/* Price and Quantity Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-bold text-lg">
                          ${item.product.price}
                        </span>
                        {item.product.originalPrice && (
                          <span className="text-gray-500 line-through text-sm">
                            ${item.product.originalPrice}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-3">
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2 bg-gray-800 rounded-lg">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-white hover:text-red-400 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center text-white font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-white hover:text-red-400 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <span className="text-white font-bold">
                        Subtotal: ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Promo Code */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center">
                <Tag className="w-4 h-4 mr-2" />
                Código promocional
              </h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Ingresa tu código"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600"
                />
                <Button
                  onClick={applyPromoCode}
                  disabled={!promoCode || isPromoApplied}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white disabled:opacity-50"
                >
                  {isPromoApplied ? 'Código aplicado' : 'Aplicar código'}
                </Button>
                {isPromoApplied && (
                  <p className="text-green-400 text-sm">
                    ¡Código WACHIFY10 aplicado! 10% de descuento
                  </p>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-white font-semibold mb-4">Resumen del pedido</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal ({state.totalItems} productos)</span>
                  <span>${state.totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-gray-300">
                  <span>Envío</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-400">Gratis</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                
                {isPromoApplied && (
                  <div className="flex justify-between text-green-400">
                    <span>Descuento (WACHIFY10)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="border-t border-gray-700 pt-3">
                  <div className="flex justify-between text-white font-bold text-lg">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {shipping > 0 && (
                <div className="mt-4 p-3 bg-blue-900/20 border border-blue-700 rounded-lg">
                  <p className="text-blue-300 text-sm">
                    <Truck className="w-4 h-4 inline mr-1" />
                    Agrega ${(50 - state.totalPrice).toFixed(2)} más para envío gratis
                  </p>
                </div>
              )}

              <Button className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white py-3 font-semibold flex items-center justify-center space-x-2">
                <CreditCard className="w-4 h-4" />
                <span>Proceder al pago</span>
              </Button>
            </div>

            {/* Features */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-white font-semibold mb-4">¿Por qué elegir Wachify?</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm">
                  <Truck className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <span className="text-gray-300">Envío gratis en pedidos +$50</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <RotateCcw className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <span className="text-gray-300">Devoluciones gratuitas 30 días</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Shield className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <span className="text-gray-300">Productos oficiales garantizados</span>
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