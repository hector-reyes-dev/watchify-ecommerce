import { products, collectionProducts } from '@/lib/data';
import ProductClientPage from './product-client-page';

export async function generateStaticParams() {
  // Get all product IDs from main products array
  const mainProductIds = products.map((product) => ({
    id: product.id,
  }));

  // Get all product IDs from collection products
  const collectionProductIds = Object.values(collectionProducts)
    .flat()
    .map((product) => ({
      id: product.id,
    }));

  // Combine and return all unique product IDs
  const allProductIds = [...mainProductIds, ...collectionProductIds];
  const uniqueProductIds = allProductIds.filter(
    (product, index, self) => 
      index === self.findIndex((p) => p.id === product.id)
  );

  return uniqueProductIds;
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  
  // Find product in main products array
  let product = products.find(p => p.id === id);
  
  // If not found in main products, search in collection products
  if (!product) {
    for (const collectionProductList of Object.values(collectionProducts)) {
      product = collectionProductList.find(p => p.id === id);
      if (product) break;
    }
  }

  return <ProductClientPage product={product} />;
}