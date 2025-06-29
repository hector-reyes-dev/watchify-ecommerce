'use client';

import { ProductCard } from '@/components/ui/product-card';
import { products } from '@/lib/data';

export function FeaturedProducts() {
  const featuredProducts = products.filter(product => product.isFeatured).slice(0, 3);

  return (
    <section className="bg-black py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Productos Destacados
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Descubre los productos más populares de nuestras colecciones exclusivas de Netflix
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}