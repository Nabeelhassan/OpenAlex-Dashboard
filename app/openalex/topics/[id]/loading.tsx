import { Skeleton } from "@/components/ui/skeleton";

export default function TopicDetailLoading() {
  return (
    <div className="flex-1 p-6 md:p-10">
      {/* Back navigation skeleton */}
      <div className="mb-6 w-24 h-5">
        <Skeleton className="h-5 w-full" />
      </div>

      {/* Topic header section skeleton */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="h-7 w-7 rounded-full" />
          <Skeleton className="h-8 w-64" />
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-32" />
        </div>
        
        <Skeleton className="h-16 w-full mb-6" />
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>

      {/* Tabs skeleton */}
      <div className="mb-4">
        <div className="flex gap-4 border-b border-gray-200 pb-1">
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-20" />
        </div>
      </div>

      {/* Tab content skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  );
} 