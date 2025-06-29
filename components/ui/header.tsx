'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, User, Menu, X, Heart } from 'lucide-react';
import { Button } from './button';
import { useCart } from '@/contexts/cart-context';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { getCartItemsCount } = useCart();
  const cartItemsCount = getCartItemsCount();

  return (
    <header className="bg-black border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">W</span>
            </div>
            <span className="text-white font-bold text-xl">Wachify</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-red-400 transition-colors">
              Inicio
            </Link>
            <Link href="/products" className="text-white hover:text-red-400 transition-colors">
              Productos
            </Link>
            <Link href="/collections" className="text-white hover:text-red-400 transition-colors">
              Colecciones
            </Link>
            <Link href="#" className="text-white hover:text-red-400 transition-colors">
              Ofertas
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:text-red-400 hover:bg-gray-800"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:text-red-400 hover:bg-gray-800"
            >
              <Heart className="w-4 h-4" />
            </Button>

            <Link href="/cart">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-red-400 hover:bg-gray-800 relative"
              >
                <ShoppingCart className="w-4 h-4" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                    {cartItemsCount > 99 ? '99+' : cartItemsCount}
                  </span>
                )}
                <span className="ml-1">Carrito</span>
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:text-red-400 hover:bg-gray-800"
            >
              <User className="w-4 h-4" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="py-4 border-t border-gray-800">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar productos, series..."
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-red-600 transition-colors"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-white hover:text-red-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link 
                href="/products" 
                className="text-white hover:text-red-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Productos
              </Link>
              <Link 
                href="/collections" 
                className="text-white hover:text-red-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Colecciones
              </Link>
              <Link 
                href="#" 
                className="text-white hover:text-red-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Ofertas
              </Link>
              
              <div className="flex items-center space-x-4 pt-4 border-t border-gray-800">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-red-400"
                >
                  <Heart className="w-4 h-4" />
                </Button>

                <Link href="/cart" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:text-red-400 relative"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {cartItemsCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                        {cartItemsCount > 99 ? '99+' : cartItemsCount}
                      </span>
                    )}
                    <span className="ml-1">Carrito ({cartItemsCount})</span>
                  </Button>
                </Link>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-red-400"
                >
                  <User className="w-4 h-4" />
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}