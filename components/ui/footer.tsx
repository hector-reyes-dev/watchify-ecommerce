import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="text-2xl font-bold text-white">
              Wachify
              <span className="text-red-600">.</span>
            </div>
            <p className="text-gray-400 text-sm">
              La tienda oficial de merchandising de Netflix. Encuentra productos exclusivos de tus series favoritas.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h3 className="text-white font-semibold mb-4">Colecciones</h3>
            <div className="space-y-2">
              <Link href="/collection/stranger-things" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Stranger Things
              </Link>
              <Link href="/collection/la-casa-de-papel" className="block text-gray-400 hover:text-white transition-colors text-sm">
                La Casa de Papel
              </Link>
              <Link href="/collection/bridgerton" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Bridgerton
              </Link>
              <Link href="/collection/dark" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Dark
              </Link>
              <Link href="/collection/cobra-kai" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Cobra Kai
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-semibold mb-4">Atención al cliente</h3>
            <div className="space-y-2">
              <Link href="/contact" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Contacto
              </Link>
              <Link href="/shipping" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Política de envíos y devoluciones
              </Link>
              <Link href="/privacy" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Aviso de Privacidad
              </Link>
              <Link href="/terms" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Términos y Condiciones
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Suscríbete para recibir ofertas exclusivas y novedades.
            </p>
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Tu email"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-red-600 focus:outline-none"
              />
              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition-colors">
                Suscribirse
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Wachify. Todos los derechos reservados. Netflix y todos los logos relacionados son marcas registradas de Netflix, Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}