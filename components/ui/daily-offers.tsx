import { ProductCard } from '@/components/ui/product-card';
import { products } from '@/lib/data';

export function DailyOffers() {
  const offerProducts = products.filter(p => p.discount);

  return (
    <section className="bg-black py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8">Ofertas diarias</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {offerProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}