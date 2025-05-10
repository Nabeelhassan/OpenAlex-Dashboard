'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import Link from 'next/link';
import { fetchWorksByAuthor } from '@/app/lib/openalex';
import { BeakerIcon } from '@heroicons/react/24/outline';

interface Work {
  id: string;
  display_name: string;
  title: string;
  publication_year: number;
  publication_date: string;
  cited_by_count: number;
  primary_location?: {
    source?: {
      display_name: string;
      id?: string;
    };
  };
  type: string;
  open_access?: {
    is_oa: boolean;
    oa_status?: string;
  };
  authorships: Array<{
    author: {
      id: string;
      display_name: string;
    };
    institutions: Array<{
      id: string;
      display_name: string;
    }>;
  }>;
}

interface WorksSectionProps {
  authorId: string;
  initialWorks?: Work[];
  initialCount?: number;
}

export default function WorksSection({ 
  authorId,
  initialWorks,
  initialCount = 0
}: WorksSectionProps) {
  const [works, setWorks] = useState<Work[]>(initialWorks || []);
  const [loading, setLoading] = useState(!initialWorks);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialCount ? Math.ceil(initialCount / 10) : 1);
  const [worksFilter, setWorksFilter] = useState('recent');
  const [activeTab, setActiveTab] = useState('list');

  useEffect(() => {
    if (initialWorks && currentPage === 1) {
      // Use initial works for first page if provided
      return;
    }

    async function loadWorks() {
      try {
        setLoading(true);

        // Determine sort order based on filter
        let sort = 'publication_date:desc';
        if (worksFilter === 'cited') {
          sort = 'cited_by_count:desc';
        }

        const data = await fetchWorksByAuthor(authorId, currentPage, 10, sort);
        setWorks(data.results || []);
        setTotalPages(Math.ceil((data.meta?.count || 0) / 10));
      } catch (error) {
        console.error('Error loading works:', error);
        setError('Failed to load publications');
      } finally {
        setLoading(false);
      }
    }

    if (authorId) {
      loadWorks();
    }
  }, [authorId, currentPage, worksFilter, initialWorks]);

  function handlePageChange(newPage: number) {
    setCurrentPage(newPage);
  }

  function handleFilterChange(filter: string) {
    if (filter !== worksFilter) {
      setWorksFilter(filter);
      setCurrentPage(1);
    }
  }

  return (
    <Card className="col-span-full">
      <CardHeader className="pb-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <CardTitle className="text-base font-medium flex items-center">
            <BeakerIcon className="h-5 w-5 mr-2 text-gray-500" />
            Publications
          </CardTitle>
          
          <div className="flex space-x-2 mt-2 sm:mt-0">
            <Button 
              variant={worksFilter === 'recent' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleFilterChange('recent')}
            >
              Recent
            </Button>
            <Button 
              variant={worksFilter === 'cited' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleFilterChange('cited')}
            >
              Most Cited
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4 mt-4">
            {Array(5).fill(0).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-100 rounded w-1/2 mb-1"></div>
                <div className="h-4 bg-gray-100 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-red-500 mt-4">{error}</div>
        ) : works.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No publications found</p>
          </div>
        ) : (
          <>
            <ul className="divide-y divide-gray-200 mt-4">
              {works.map((work) => {
                // Extract ID from URL if needed
                const id = typeof work.id === 'string'
                  ? work.id.replace('https://openalex.org/', '')
                  : work.id;
                
                // Format publication date
                const date = work.publication_date 
                  ? new Date(work.publication_date).getFullYear() 
                  : work.publication_year;
                
                return (
                  <li key={id} className="py-4">
                    <div className="space-y-1">
                      <Link 
                        href={`/openalex/works/${id}`}
                        className="text-base font-medium text-blue-600 hover:underline"
                      >
                        {work.title || work.display_name}
                      </Link>
                      
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                        {date && (
                          <span>{date}</span>
                        )}
                        
                        {work.primary_location?.source?.display_name && (
                          <span>{work.primary_location.source.display_name}</span>
                        )}
                        
                        {work.type && (
                          <span className="capitalize">{work.type.toLowerCase()}</span>
                        )}
                        
                        {work.open_access?.is_oa && (
                          <span className="text-green-600">
                            {work.open_access.oa_status 
                              ? `OA (${work.open_access.oa_status})`
                              : 'Open Access'
                            }
                          </span>
                        )}
                        
                        {work.cited_by_count > 0 && (
                          <span>{work.cited_by_count} citations</span>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            
            {totalPages > 1 && (
              <div className="mt-6 flex justify-center">
                <Pagination 
                  currentPage={currentPage} 
                  totalPages={totalPages} 
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
} 