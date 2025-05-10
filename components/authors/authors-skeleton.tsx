import { Skeleton } from "@/components/ui/skeleton"

export function AuthorsSkeleton() {
  return (
    <div className="space-y-8">
      {/* Filter Skeleton */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <Skeleton className="h-6 w-48 mb-4" />
        <div className="grid md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="flex items-end">
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </div>

      {/* Authors Grid Skeleton */}
      <div>
        <Skeleton className="h-8 w-64 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(9).fill(0).map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center mb-4">
                <Skeleton className="h-16 w-16 rounded-full mr-4" />
                <div>
                  <Skeleton className="h-5 w-40 mb-2" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-4" />
              <Skeleton className="h-3 w-20" />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Skeleton */}
      <div className="flex justify-center mt-8">
        <div className="flex space-x-4">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    </div>
  )
} 