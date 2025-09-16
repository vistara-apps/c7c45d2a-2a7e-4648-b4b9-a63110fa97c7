import { Suspense } from 'react';
import { Header } from '../components/Header';
import { PortfolioSummary } from '../components/PortfolioSummary';
import { NewsSection } from '../components/NewsSection';
import { AssetList } from '../components/AssetList';
import { RecommendedSection } from '../components/RecommendedSection';
import { Navigation } from '../components/Navigation';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      
      <div className="flex-1 px-4 pb-20">
        <Suspense fallback={<LoadingSpinner />}>
          <div className="space-y-6">
            <NewsSection />
            <PortfolioSummary />
            <AssetList />
            <RecommendedSection />
          </div>
        </Suspense>
      </div>
      
      <Navigation />
    </div>
  );
}
