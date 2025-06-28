import { ProductCard } from '@/components/ui/product-card';
import { products } from '@/lib/data';

export function FeaturedProducts() {
  const featuredProducts = products.filter(p => p.isFeatured);

  return (
    <section className="bg-black py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8">Destacados</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}