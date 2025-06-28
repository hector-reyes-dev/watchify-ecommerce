import { collections, collectionProducts } from '@/lib/data';
import CollectionClientPage from './collection-client-page';

export async function generateStaticParams() {
  return collections.map((collection) => ({
    slug: collection.slug,
  }));
}

export default function CollectionPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  const collection = collections.find(c => c.slug === slug);
  const products = collectionProducts[slug] || [];

  return (
    <>
      <CollectionClientPage 
        collection={collection} 
        products={products} 
        slug={slug}
      />
    </>
  );
}