import { Suspense } from 'react';
import { ArrowRightIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';

import { getSources, buildSourceFilterString } from '@/app/lib/openalex/sources';
import SourceCard from './components/SourceCard';
import SourceSearchForm from './components/SourceSearchForm';
import SourceFilters from './components/SourceFilters';
import Pagination from '@/app/ui/pagination';

export default async function SourcesPage({
  searchParams
}: {
  searchParams?: {
    query?: string;
    page?: string;
    type?: string;
    is_oa?: string;
    is_in_doaj?: string;
    country_code?: string;
    sort?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const filter = buildSourceFilterString(new URLSearchParams(searchParams as Record<string, string>));
  const sort = searchParams?.sort || 'works_count:desc';

  // Fetch sources from API
  const sourcesData = await getSources({
    page: currentPage,
    perPage: 9,
    query,
    filter,
    sort,
  });
  
  // Featured sources IDs
  const featuredSourceIds = ['S1983995261', 'S137773608', 'S2764455111'];
  
  // Fetch featured sources (in a real app, you might have a different API endpoint for this)
  const featuredSourcesPromises = featuredSourceIds.map(id => 
    getSources({ filter: `ids.openalex:${id}` })
      .then(data => data?.results[0] || null)
  );
  
  const featuredSources = await Promise.all(featuredSourcesPromises);

  return (
    <main className="flex-1 p-6 md:p-10">
      <div className="flex items-center gap-2 mb-8">
        <DocumentTextIcon className="h-6 w-6 text-blue-600" />
        <h1 className={`text-2xl md:text-3xl font-bold text-gray-900 ${lusitana.className}`}>
          Sources
        </h1>
      </div>
      
      {/* Search and Filter Section */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
        <h2 className="text-lg font-semibold mb-4">Find Sources</h2>
        <SourceSearchForm />
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filters */}
        <div className="md:col-span-1">
          <Suspense>
            <SourceFilters />
          </Suspense>
        </div>
        
        {/* Results */}
        <div className="md:col-span-3">
          {query || filter ? (
            <>
              <h2 className={`text-xl font-semibold mb-4 text-gray-900 ${lusitana.className}`}>
                Search Results {sourcesData?.meta.count ? `(${sourcesData.meta.count.toLocaleString()})` : ''}
              </h2>
              
              {sourcesData?.results.length === 0 ? (
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-center">
                  <p className="text-gray-500">No sources found matching your criteria.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sourcesData?.results.map(source => (
                    <SourceCard
                      key={source.id}
                      id={source.id}
                      display_name={source.display_name}
                      type={source.type}
                      is_oa={source.is_oa}
                      works_count={source.works_count}
                      cited_by_count={source.cited_by_count}
                      publisher={source.host_organization_name}
                      country_code={source.country_code}
                    />
                  ))}
                </div>
              )}
              
              {sourcesData && sourcesData.meta.count > 9 && (
                <div className="mt-6">
                  <Pagination 
                    totalPages={Math.ceil(sourcesData.meta.count / 9)}
                    currentPage={currentPage}
                  />
                </div>
              )}
            </>
          ) : (
            <>
              {/* Featured Sources */}
              <div className="mb-8">
                <h2 className={`text-xl font-semibold mb-4 text-gray-900 ${lusitana.className}`}>
                  Featured Sources
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {featuredSources.map(source => source && (
                    <SourceCard
                      key={source.id}
                      id={source.id}
                      display_name={source.display_name}
                      type={source.type}
                      is_oa={source.is_oa}
                      works_count={source.works_count}
                      cited_by_count={source.cited_by_count}
                      publisher={source.host_organization_name}
                      country_code={source.country_code}
                    />
                  ))}
                </div>
              </div>
              
              {/* Browse by Categories */}
              <div>
                <h2 className={`text-xl font-semibold mb-4 text-gray-900 ${lusitana.className}`}>
                  Browse by Type
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link
                    href="/openalex/sources?type=journal"
                    className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 hover:bg-blue-50 transition duration-200"
                  >
                    <div>
                      <h3 className="font-medium text-gray-900">Journals</h3>
                      <p className="text-sm text-gray-600">Academic journals and periodicals</p>
                    </div>
                    <ArrowRightIcon className="h-5 w-5 text-blue-600" />
                  </Link>
                  
                  <Link
                    href="/openalex/sources?type=repository"
                    className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 hover:bg-blue-50 transition duration-200"
                  >
                    <div>
                      <h3 className="font-medium text-gray-900">Repositories</h3>
                      <p className="text-sm text-gray-600">Preprint and institutional repositories</p>
                    </div>
                    <ArrowRightIcon className="h-5 w-5 text-blue-600" />
                  </Link>
                  
                  <Link
                    href="/openalex/sources?type=conference"
                    className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 hover:bg-blue-50 transition duration-200"
                  >
                    <div>
                      <h3 className="font-medium text-gray-900">Conferences</h3>
                      <p className="text-sm text-gray-600">Conference proceedings and presentations</p>
                    </div>
                    <ArrowRightIcon className="h-5 w-5 text-blue-600" />
                  </Link>
                  
                  <Link
                    href="/openalex/sources?type=ebook_platform"
                    className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 hover:bg-blue-50 transition duration-200"
                  >
                    <div>
                      <h3 className="font-medium text-gray-900">Ebook Platforms</h3>
                      <p className="text-sm text-gray-600">Digital book platforms and libraries</p>
                    </div>
                    <ArrowRightIcon className="h-5 w-5 text-blue-600" />
                  </Link>
                  
                  <Link
                    href="/openalex/sources?type=book_series"
                    className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 hover:bg-blue-50 transition duration-200"
                  >
                    <div>
                      <h3 className="font-medium text-gray-900">Book Series</h3>
                      <p className="text-sm text-gray-600">Collections of related books</p>
                    </div>
                    <ArrowRightIcon className="h-5 w-5 text-blue-600" />
                  </Link>
                  
                  <Link
                    href="/openalex/sources?sort=works_count:desc"
                    className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 hover:bg-blue-50 transition duration-200"
                  >
                    <div>
                      <h3 className="font-medium text-gray-900">All Sources</h3>
                      <p className="text-sm text-gray-600">Browse all publication sources</p>
                    </div>
                    <ArrowRightIcon className="h-5 w-5 text-blue-600" />
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
} 