'use client';

import { AuthorCard } from '@/components/authors/author-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Author } from '@/types';

interface AuthorsGridProps {
  authors: any[];
  loading?: boolean;
}

export function AuthorsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(9).fill(0).map((_, i) => (
        <div key={i} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm animate-pulse">
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
  );
}

export function AuthorsGrid({ authors = [], loading = false }: AuthorsGridProps) {
  if (loading) {
    return <AuthorsGridSkeleton />;
  }
  
  if (!authors.length) {
    return (
      <div className="text-center py-16">
        <h3 className="text-lg font-medium text-gray-900">No authors found</h3>
        <p className="text-gray-600 mt-2">Try adjusting your search criteria</p>
      </div>
    );
  }
  
  // Transform API response to match our Author type
  const formattedAuthors: Author[] = authors.map(author => {
    const id = typeof author.id === 'string' 
      ? author.id.replace('https://openalex.org/', '') 
      : author.id;
      
    // Format last known institution if available
    let lastKnownInstitution = undefined;
    if (author.last_known_institution) {
      const instId = typeof author.last_known_institution.id === 'string'
        ? author.last_known_institution.id.replace('https://openalex.org/', '')
        : author.last_known_institution.id;
        
      lastKnownInstitution = {
        id: instId || '',
        display_name: author.last_known_institution.display_name || '',
        country_code: author.last_known_institution.country_code,
        type: author.last_known_institution.type || '',
        works_count: 0,
        cited_by_count: 0
      };
    }
    
    return {
      id,
      display_name: author.display_name,
      orcid: author.orcid,
      works_count: author.works_count || 0,
      cited_by_count: author.cited_by_count || 0,
      last_known_institution: lastKnownInstitution,
      image_url: author.image_url
    };
  });
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {formattedAuthors.map((author) => (
        <AuthorCard
          key={author.id}
          author={author}
        />
      ))}
    </div>
  );
} 