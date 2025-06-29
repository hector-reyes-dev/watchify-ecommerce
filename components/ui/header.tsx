'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, ShoppingCart, User, Menu, X, Heart } from 'lucide-react';
import { Button } from './button';
import { useCart } from '@/contexts/cart-context';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const router = useRouter();
  const { getCartItemsCount } = useCart();

  const cartItemsCount = getCartItemsCount();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redirect to products page with search query
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchFocused(false);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearchFocused(false);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="bg-black border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Main Header */}
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
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">
              Inicio
            </Link>
            <Link href="/products" className="text-gray-300 hover:text-white transition-colors">
              Productos
            </Link>
            <Link href="/collections" className="text-gray-300 hover:text-white transition-colors">
              Colecciones
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar productos, series..."
                value={searchQuery}
                onChange={handleSearchInputChange}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="w-64 bg-gray-800 text-white border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-colors"
              />
              {searchQuery && isSearchFocused && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-400 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>

            {/* Wishlist */}
            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
              <Heart className="w-5 h-5" />
            </Button>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white relative">
                <ShoppingCart className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {cartItemsCount > 99 ? '99+' : cartItemsCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* User */}
            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
              <User className="w-5 h-5" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
            className="md:hidden text-white p-2"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Search Bar */}
        <div className="py-4 border-t border-gray-800 md:hidden">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar productos, series..."
              value={searchQuery}
              onChange={handleSearchInputChange}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg pl-10 pr-10 py-3 focus:outline-none focus:border-red-600"
            />
            {searchQuery && isSearchFocused && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-400 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </form>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-gray-300 hover:text-white transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link 
                href="/products" 
                className="text-gray-300 hover:text-white transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Productos
              </Link>
              <Link 
                href="/collections" 
                className="text-gray-300 hover:text-white transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Colecciones
              </Link>
              
              {/* Mobile Actions */}
              <div className="flex items-center space-x-4 pt-4 border-t border-gray-700">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                  <Heart className="w-5 h-5 mr-2" />
                  Favoritos
                </Button>
                
                <Link href="/cart" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white relative">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Carrito
                    {cartItemsCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                        {cartItemsCount > 99 ? '99+' : cartItemsCount}
                      </span>
                    )}
                  </Button>
                </Link>
                
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                  <User className="w-5 h-5 mr-2" />
                  Perfil
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}