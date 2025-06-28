import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { collections, collectionProducts } from '@/lib/data';
import { CollectionContent } from '@/components/ui/collection-content';

export async function generateStaticParams() {
  return collections.map((collection) => ({
    slug: collection.slug,
  }));
}

interface CollectionPageProps {
  params: {
    slug: string;
  };
}

export default function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = params;
  
  const collection = collections.find(c => c.slug === slug);
  const products = collectionProducts[slug] || [];
  
  if (!collection) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Collection Banner */}
      <section className="relative h-96 overflow-hidden">
        <Image
          src={collection.bannerImage}
          alt={collection.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {collection.name}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-6 max-w-2xl mx-auto">
              {collection.description}
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-300">
              <span>{collection.productCount} productos</span>
              <span>•</span>
              <span>Productos oficiales</span>
              <span>•</span>
              <span>Envío gratis +$50</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <CollectionContent collection={collection} products={products} />

      <Footer />
    </div>
  );
}