'use client';

import Image from 'next/image';
import Link from 'next/link';
import { collections } from '@/lib/data';

export function CollectionsShowcase() {
  return (
    <section className="bg-black py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Colecciones
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explora productos exclusivos de tus series favoritas de Netflix
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <Link 
              key={collection.id} 
              href={`/collection/${collection.slug}`}
              className="group relative overflow-hidden rounded-lg aspect-[4/3] hover:scale-105 transition-transform duration-300"
            >
              <Image
                src={collection.image}
                alt={collection.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white text-2xl font-bold mb-2">
                  {collection.name}
                </h3>
                <p className="text-red-400 font-medium hover:text-red-300 transition-colors">
                  Ver Colección
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}