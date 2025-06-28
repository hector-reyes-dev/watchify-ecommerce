import Link from 'next/link';
import { categories } from '@/lib/data';

export function CategoryNav() {
  return (
    <section className="bg-black py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="bg-red-600 hover:bg-red-700 text-white py-4 px-6 rounded-lg text-center font-semibold transition-colors group"
            >
              <div className="text-sm md:text-base">
                {category.name.split(' ').map((word, index) => (
                  <div key={index} className="leading-tight">
                    {word}
                  </div>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}