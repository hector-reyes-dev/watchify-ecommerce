'use client';

import Link from 'next/link';
import { ShoppingBag, Shirt, Home, Gamepad2 } from 'lucide-react';

const quickLinks = [
  {
    name: 'Todos los Productos',
    href: '/products',
    icon: ShoppingBag,
    description: 'Explora todo nuestro catálogo'
  },
  {
    name: 'Ropa',
    href: '/products?category=clothing',
    icon: Shirt,
    description: 'Camisetas, sudaderas y más'
  },
  {
    name: 'Hogar',
    href: '/products?category=home',
    icon: Home,
    description: 'Decoración y accesorios'
  },
  {
    name: 'Accesorios',
    href: '/products?category=accessories',
    icon: Gamepad2,
    description: 'Tazas, bolsos y más'
  }
];

export function CategoryNav() {
  return (
    <section className="py-12 px-4 bg-gray-900/50">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Explora por Categoría
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Encuentra exactamente lo que buscas navegando por nuestras categorías principales
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className="group bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-red-600/30 transition-colors">
                    <Icon className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-red-400 transition-colors">
                    {link.name}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {link.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}