import { Suspense } from 'react';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { WorldMap } from './components/WorldMap';
import { GeoFilters } from './components/GeoFilters';
import Loading from './loading';

export default function GeoExplorerPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Research by Geography</h1>
      <GeoFilters />
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <WorldMap />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
