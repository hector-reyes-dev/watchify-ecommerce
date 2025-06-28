import { products, collections } from '@/lib/data';
import ProductsPageClient from './products-page-client';

export default function ProductsPage() {
  return <ProductsPageClient products={products} collections={collections} />;
}