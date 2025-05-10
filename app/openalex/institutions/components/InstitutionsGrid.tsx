'use client';

import { Skeleton } from "@/components/ui/skeleton";
import { InstitutionCard } from '@/components/institutions/institution-card';
import { Institution } from '@/types';

interface InstitutionsGridProps {
  institutions: any[]; // Using any[] for API response
  loading: boolean;
}

export function InstitutionsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(6).fill(0).map((_, i) => (
        <div key={i} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm animate-pulse">
          <div className="flex items-center mb-4">
            <Skeleton className="h-16 w-16 rounded-md mr-4" />
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
  );
}

export function InstitutionsGrid({ institutions, loading }: InstitutionsGridProps) {
  if (loading) {
    return <InstitutionsGridSkeleton />;
  }

  if (!institutions || institutions.length === 0) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-medium text-gray-900">No institutions found</h3>
        <p className="text-sm text-gray-600 mt-1">
          Try adjusting your search criteria or browse by region below.
        </p>
      </div>
    );
  }

  // Transform API response to match our Institution type
  const formattedInstitutions: Institution[] = institutions.map(institution => {
    const id = typeof institution.id === 'string' 
      ? institution.id.replace('https://openalex.org/', '') 
      : institution.id;
      
    return {
      id,
      display_name: institution.display_name,
      type: institution.type || '',
      country_code: institution.country_code || (institution.geo && institution.geo.country_code) || '',
      image_url: institution.image_url,
      works_count: institution.works_count || 0,
      cited_by_count: institution.cited_by_count || 0,
      homepage_url: institution.homepage_url
    };
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {formattedInstitutions.map((institution) => (
        <InstitutionCard 
          key={institution.id} 
          institution={institution} 
        />
      ))}
    </div>
  );
} 