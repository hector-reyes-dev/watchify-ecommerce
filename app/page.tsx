import { Header } from '@/components/ui/header';
import { Hero } from '@/components/ui/hero';
import { CategoryNav } from '@/components/ui/category-nav';
import { FeaturedProducts } from '@/components/ui/featured-products';
import { CollectionsShowcase } from '@/components/ui/collections-showcase';
import { DailyOffers } from '@/components/ui/daily-offers';
import { NewProducts } from '@/components/ui/new-products';
import { Footer } from '@/components/ui/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <Hero />
      <CategoryNav />
      <FeaturedProducts />
      <CollectionsShowcase />
      <DailyOffers />
      <NewProducts />
      <Footer />
    </div>
  );
}