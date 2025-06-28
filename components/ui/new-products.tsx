import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { featuredProduct } from '@/lib/data';

export function NewProducts() {
  return (
    <section className="bg-black py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8">Nuevos productos</h2>
        
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Product Images */}
            <div className="flex space-x-4">
              <div className="flex-1 aspect-square relative overflow-hidden rounded-lg">
                <Image
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 aspect-square relative overflow-hidden rounded-lg">
                <Image
                  src={featuredProduct.images?.[1] || featuredProduct.image}
                  alt={featuredProduct.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="text-white space-y-4">
              <div>
                <p className="text-gray-400 text-sm font-medium">{featuredProduct.collection}</p>
                <h3 className="text-2xl font-bold">{featuredProduct.name}</h3>
              </div>

              <p className="text-gray-300 leading-relaxed">
                {featuredProduct.description}
              </p>

              <div className="flex items-center space-x-4">
                <span className="text-2xl font-bold">${featuredProduct.price}</span>
                {featuredProduct.originalPrice && (
                  <span className="text-gray-500 line-through">
                    ${featuredProduct.originalPrice}
                  </span>
                )}
              </div>

              <div className="flex space-x-4">
                <Button className="bg-red-600 hover:bg-red-700 text-white px-6">
                  Agregar a la bolsa
                </Button>
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:border-red-600 hover:text-white">
                  Ver colección
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}