'use client';

import { WorkCard } from './WorkCard';

interface Work {
  id: string;
  title: string;
  display_name?: string;
  publication_year?: number;
  primary_location?: {
    source?: {
      display_name?: string;
    }
  };
  authorships?: {
    author: {
      display_name: string;
    }
  }[];
  type?: string;
  open_access?: {
    is_oa: boolean;
    oa_status?: string;
  };
  cited_by_count?: number;
}

interface WorksGridProps {
  works: Work[];
  loading?: boolean;
}

export function WorksGrid({ works = [], loading = false }: WorksGridProps) {
  if (loading) {
    return <WorksGridSkeleton />;
  }
  
  if (!works.length) {
    return (
      <div className="text-center py-16">
        <h3 className="text-lg font-medium text-gray-900">No works found</h3>
        <p className="text-gray-600 mt-2">Try adjusting your search criteria</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {works.map((work) => (
        <WorkCard
          key={work.id}
          id={work.id}
          title={work.title}
          display_name={work.display_name}
          publication_year={work.publication_year}
          journal={work.primary_location?.source?.display_name}
          authors={work.authorships}
          type={work.type}
          is_oa={work.open_access?.is_oa}
          cited_by_count={work.cited_by_count}
        />
      ))}
    </div>
  );
}

function WorksGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm animate-pulse">
          <div className="flex justify-between items-start mb-3">
            <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
            <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
          </div>
          <div className="h-12 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-2/3 bg-gray-200 rounded mb-4"></div>
          <div className="flex justify-between items-center">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
} 