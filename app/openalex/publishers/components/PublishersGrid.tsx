import { PublisherCard, PublisherCardSkeleton } from "@/components/publishers/publisher-card";
import { Publisher } from "@/app/lib/openalex/publishers";

interface PublishersGridProps {
  publishers: Publisher[];
  loading?: boolean;
}

export function PublishersGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 9 }).map((_, index) => (
        <PublisherCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function PublishersGrid({ publishers, loading = false }: PublishersGridProps) {
  if (loading) {
    return <PublishersGridSkeleton />;
  }

  if (!publishers || publishers.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No publishers found</h3>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Try adjusting your search or filter to find what you&apos;re looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {publishers.map((publisher) => (
        <PublisherCard key={publisher.id} publisher={publisher} />
      ))}
    </div>
  );
} 