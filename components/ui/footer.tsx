'use client';

import Link from 'next/link';
import { Heart, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Wachify</h3>
            <p className="text-gray-400 text-sm mb-4">
              Tu tienda oficial de merchandising Netflix. Productos exclusivos de tus series favoritas.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/collections" className="text-gray-400 hover:text-red-600 transition-colors text-sm">
                  Colecciones
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-red-600 transition-colors text-sm">
                  Productos
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-600 transition-colors text-sm">
                  Ofertas
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-600 transition-colors text-sm">
                  Nuevos Productos
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-semibold mb-4">Atención al Cliente</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-red-600 transition-colors text-sm">
                  Contacto
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-600 transition-colors text-sm">
                  Envíos y Devoluciones
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-600 transition-colors text-sm">
                  Guía de Tallas
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-600 transition-colors text-sm">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-red-600" />
                <span className="text-gray-400 text-sm">info@wachify.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-red-600" />
                <span className="text-gray-400 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-red-600" />
                <span className="text-gray-400 text-sm">Los Angeles, CA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 text-sm mb-4">
            © 2024 Wachify. Todos los derechos reservados. Netflix y todas las marcas relacionadas son marcas registradas de Netflix, Inc.
          </p>
          <p className="text-gray-400 text-sm flex items-center justify-center space-x-1">
            <span>Hecho con</span>
            <Heart className="w-4 h-4 text-red-600 fill-current" />
            <span>por</span>
            <a 
              href="https://hectorcreative.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-red-600 hover:text-red-400 transition-colors font-medium"
            >
              Héctor Reyes
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}