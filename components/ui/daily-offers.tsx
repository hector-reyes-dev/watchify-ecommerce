'use client';

import { ProductCard } from '@/components/ui/product-card';
import { products } from '@/lib/data';

export function DailyOffers() {
  // Get products with discounts for daily offers
  const discountedProducts = products.filter(product => product.discount).slice(0, 4);

  return (
    <section className="bg-gradient-to-r from-red-900/20 to-black py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            ⚡ OFERTAS DEL DÍA
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Descuentos Especiales
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Aprovecha estos descuentos exclusivos por tiempo limitado en productos seleccionados
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {discountedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-red-400 font-semibold mb-2">
            ⏰ Ofertas válidas hasta agotar stock
          </p>
          <p className="text-gray-400 text-sm">
            Los precios y descuentos pueden cambiar sin previo aviso
          </p>
        </div>
      </div>
    </section>
  );
}