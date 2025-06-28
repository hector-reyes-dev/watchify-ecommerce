import { collections } from '@/lib/data';
import CollectionsPageClient from './collections-page-client';

export default function CollectionsPage() {
  return <CollectionsPageClient collections={collections} />;
}