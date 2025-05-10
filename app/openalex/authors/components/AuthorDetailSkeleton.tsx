'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  UserIcon,
  BuildingLibraryIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  BeakerIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

export default function AuthorDetailSkeleton() {
  return (
    <div className="flex-1 p-6 md:p-10">
      <div className="animate-pulse">
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-6 items-start mb-8">
          <Skeleton className="h-24 w-24 rounded-full" />
          <div className="flex-1">
            <Skeleton className="h-8 w-64 mb-4" />
            <div className="flex flex-wrap gap-4">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-36" />
            </div>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Affiliations */}
          <Card className="col-span-full md:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium flex items-center">
                <BuildingLibraryIcon className="h-5 w-5 mr-2 text-gray-500" />
                Affiliations
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {Array(3).fill(0).map((_, i) => (
                  <div key={i} className="flex flex-col">
                    <Skeleton className="h-4 w-40 mb-1" />
                    <Skeleton className="h-3 w-28" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Research Areas */}
          <Card className="col-span-full md:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium flex items-center">
                <AcademicCapIcon className="h-5 w-5 mr-2 text-gray-500" />
                Research Areas
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="mb-4">
                <Skeleton className="h-4 w-24 mb-2" />
                <div className="flex flex-wrap gap-2">
                  {Array(4).fill(0).map((_, i) => (
                    <Skeleton key={i} className="h-6 w-20 rounded-full" />
                  ))}
                </div>
              </div>
              <div>
                <Skeleton className="h-4 w-24 mb-2" />
                <div className="flex flex-wrap gap-2">
                  {Array(3).fill(0).map((_, i) => (
                    <Skeleton key={i} className="h-6 w-24 rounded-full" />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Publication Venues */}
          <Card className="col-span-full md:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium flex items-center">
                <DocumentTextIcon className="h-5 w-5 mr-2 text-gray-500" />
                Publication Venues
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {Array(3).fill(0).map((_, i) => (
                  <div key={i} className="flex flex-col">
                    <Skeleton className="h-4 w-48 mb-1" />
                    <Skeleton className="h-3 w-36" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Citations Chart */}
          <Card className="col-span-full md:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium flex items-center">
                <ChartBarIcon className="h-5 w-5 mr-2 text-gray-500" />
                Citations by Year
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-end h-40 gap-1">
                {Array(10).fill(0).map((_, i) => (
                  <div key={i} className="flex flex-col items-center" style={{ width: '10%', maxWidth: '40px' }}>
                    <Skeleton 
                      className="w-full rounded-t-sm" 
                      style={{ height: `${Math.random() * 100}%`, minHeight: '4px' }} 
                    />
                    <Skeleton className="w-full h-3 mt-1" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Works Chart */}
          <Card className="col-span-full md:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium flex items-center">
                <BeakerIcon className="h-5 w-5 mr-2 text-gray-500" />
                Works by Year
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-end h-40 gap-1">
                {Array(10).fill(0).map((_, i) => (
                  <div key={i} className="flex flex-col items-center" style={{ width: '10%', maxWidth: '40px' }}>
                    <Skeleton 
                      className="w-full rounded-t-sm" 
                      style={{ height: `${Math.random() * 100}%`, minHeight: '4px' }} 
                    />
                    <Skeleton className="w-full h-3 mt-1" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Co-Authors */}
          <Card className="col-span-full md:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium flex items-center">
                <UserIcon className="h-5 w-5 mr-2 text-gray-500" />
                Co-Authors
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {Array(4).fill(0).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-32 mb-1" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Works */}
          <Card className="col-span-full">
            <CardHeader className="pb-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <CardTitle className="text-base font-medium flex items-center">
                  <BeakerIcon className="h-5 w-5 mr-2 text-gray-500" />
                  Publications
                </CardTitle>
                <div className="flex space-x-2 mt-2 sm:mt-0">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-24" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mt-4">
                {Array(5).fill(0).map((_, i) => (
                  <div key={i}>
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-1" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-center">
                <div className="flex space-x-2">
                  <Skeleton className="h-10 w-24" />
                  <Skeleton className="h-10 w-20" />
                  <Skeleton className="h-10 w-24" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 