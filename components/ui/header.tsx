'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, User, Menu, X, Heart } from 'lucide-react';
import { Button } from './button';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="bg-black/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-red-600">
            Wachify
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">
              Inicio
            </Link>
            <Link href="/collections" className="text-gray-300 hover:text-white transition-colors">
              Colecciones
            </Link>
            <Link href="/products" className="text-gray-300 hover:text-white transition-colors">
              Productos
            </Link>
            <Link href="/offers" className="text-gray-300 hover:text-white transition-colors">
              Ofertas
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
              Nosotros
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-300 hover:text-white transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            <button className="text-gray-300 hover:text-white transition-colors relative">
              <Heart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                2
              </span>
            </button>
            <button className="text-gray-300 hover:text-white transition-colors relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </button>
            <Button variant="outline" size="sm" className="border-gray-600 text-white hover:bg-red-600 hover:border-red-600">
              <User className="w-4 h-4 mr-2" />
              Cuenta
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar productos, colecciones..."
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-red-600"
              autoFocus
            />
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-800 pt-4">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                Inicio
              </Link>
              <Link href="/collections" className="text-gray-300 hover:text-white transition-colors">
                Colecciones
              </Link>
              <Link href="/products" className="text-gray-300 hover:text-white transition-colors">
                Productos
              </Link>
              <Link href="/offers" className="text-gray-300 hover:text-white transition-colors">
                Ofertas
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                Nosotros
              </Link>
            </nav>
            
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-800">
              <div className="flex items-center space-x-4">
                <button className="text-gray-300 hover:text-white transition-colors relative">
                  <Heart className="w-5 h-5" />
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    2
                  </span>
                </button>
                <button className="text-gray-300 hover:text-white transition-colors relative">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    3
                  </span>
                </button>
              </div>
              <Button variant="outline" size="sm" className="border-gray-600 text-white hover:bg-red-600 hover:border-red-600">
                <User className="w-4 h-4 mr-2" />
                Cuenta
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}