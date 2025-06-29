'use client';

import { ProductCard } from '@/components/ui/product-card';
import { products } from '@/lib/data';

export function NewProducts() {
  // Get the newest products (last 4 products in the array)
  const newProducts = products.slice(-4);

  return (
    <section className="bg-black py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            🆕 NUEVOS LANZAMIENTOS
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Productos Nuevos
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Sé el primero en conseguir los últimos productos de tus series favoritas de Netflix
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-purple-400 font-semibold mb-2">
            ✨ Recién llegados a nuestra tienda
          </p>
          <p className="text-gray-400 text-sm">
            Mantente al día con las últimas novedades de merchandising oficial
          </p>
        </div>
      </div>
    </section>
  );
}