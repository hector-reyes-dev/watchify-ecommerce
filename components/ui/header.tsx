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
            <Link href="/products" className="text-gray-300 hover:text-white transition-colors">
              Productos
            </Link>
            <Link href="/collections" className="text-gray-300 hover:text-white transition-colors">
              Colecciones
            </Link>
            <Link href="/categories" className="text-gray-300 hover:text-white transition-colors">
              Categorías
            </Link>
            <Link href="/offers" className="text-gray-300 hover:text-white transition-colors">
              Ofertas
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Buscar productos..."
                    className="bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 w-64 focus:outline-none focus:border-red-600"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsSearchOpen(false)}
                    className="ml-2 text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSearchOpen(true)}
                  className="text-gray-400 hover:text-white"
                >
                  <Search className="w-5 h-5" />
                </Button>
              )}
            </div>

            {/* Wishlist */}
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white relative">
              <Heart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </Button>

            {/* User */}
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <User className="w-5 h-5" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-800">
            <nav className="flex flex-col space-y-4 mt-4">
              <Link 
                href="/" 
                className="text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link 
                href="/products" 
                className="text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Productos
              </Link>
              <Link 
                href="/collections" 
                className="text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Colecciones
              </Link>
              <Link 
                href="/categories" 
                className="text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Categorías
              </Link>
              <Link 
                href="/offers" 
                className="text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Ofertas
              </Link>
            </nav>

            {/* Mobile Search */}
            <div className="mt-4">
              <input
                type="text"
                placeholder="Buscar productos..."
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-red-600"
              />
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center justify-around mt-4 pt-4 border-t border-gray-800">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white flex flex-col items-center">
                <Heart className="w-5 h-5 mb-1" />
                <span className="text-xs">Favoritos</span>
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white flex flex-col items-center">
                <ShoppingCart className="w-5 h-5 mb-1" />
                <span className="text-xs">Carrito</span>
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white flex flex-col items-center">
                <User className="w-5 h-5 mb-1" />
                <span className="text-xs">Cuenta</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}