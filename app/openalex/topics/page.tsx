import { Suspense } from 'react';
import { PuzzlePieceIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';

import { getTopics, buildTopicFilterString } from '@/app/lib/openalex/topics';
import TopicCard from './components/TopicCard';
import Pagination from '@/app/ui/pagination';
import TopicSearchForm from './components/TopicSearchForm';
import TopicFilters from './components/TopicFilters';

export default async function TopicsPage({
  searchParams
}: {
  searchParams?: {
    query?: string;
    page?: string;
    level?: string;
    domain?: string;
    field?: string;
    sort?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const filter = buildTopicFilterString(new URLSearchParams(searchParams as Record<string, string>));
  const sort = searchParams?.sort || 'works_count:desc';

  // Fetch topics from API
  const topicsData = await getTopics({
    page: currentPage,
    perPage: 9,
    query,
    filter,
    sort,
  });
  
  // Featured topics IDs (using correct topic IDs from the OpenAlex API)
  const featuredTopicIds = ['T14181', 'T11881', 'T13643']; // Example topics
  
  // Fetch featured topics (in a real app, you might have a different API endpoint for this)
  const featuredTopicsPromises = featuredTopicIds.map(id => 
    getTopics({ filter: `ids.openalex:${id}` })
      .then(data => data?.results[0] || null)
  );
  
  const featuredTopics = await Promise.all(featuredTopicsPromises);

  return (
    <main className="flex-1 p-6 md:p-10">
      <div className="flex items-center gap-2 mb-8">
        <PuzzlePieceIcon className="h-6 w-6 text-blue-600" />
        <h1 className={`text-2xl md:text-3xl font-bold text-gray-900 ${lusitana.className}`}>
          Topics
        </h1>
      </div>
      
      {/* Search and Filter Section - to be implemented later */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
        <h2 className="text-lg font-semibold mb-4">Find Topics</h2>
        <TopicSearchForm />
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filters - to be implemented later */}
        <div className="md:col-span-1">
          <TopicFilters />
        </div>
        
        {/* Results */}
        <div className="md:col-span-3">
          {query || filter ? (
            <>
              <h2 className={`text-xl font-semibold mb-4 text-gray-900 ${lusitana.className}`}>
                Search Results {topicsData?.meta.count ? `(${topicsData.meta.count.toLocaleString()})` : ''}
              </h2>
              
              {!topicsData?.results.length ? (
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-center">
                  <p className="text-gray-500">No topics found matching your criteria.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {topicsData?.results.map(topic => (
                    <TopicCard
                      key={topic.id}
                      id={topic.id}
                      display_name={topic.display_name}
                      description={topic.description}
                      works_count={topic.works_count}
                      cited_by_count={topic.cited_by_count}
                      domain={topic.domain}
                      field={topic.field}
                    />
                  ))}
                </div>
              )}
              
              {topicsData && topicsData.meta.count > 9 && (
                <div className="mt-6">
                  <Pagination 
                    totalPages={Math.ceil(topicsData.meta.count / 9)}
                    currentPage={currentPage}
                  />
                </div>
              )}
            </>
          ) : (
            <>
              {/* Featured Topics */}
              <div className="mb-8">
                <h2 className={`text-xl font-semibold mb-4 text-gray-900 ${lusitana.className}`}>
                  Trending Topics
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {featuredTopics.map(topic => topic && (
                    <TopicCard
                      key={topic.id}
                      id={topic.id}
                      display_name={topic.display_name}
                      description={topic.description}
                      works_count={topic.works_count}
                      cited_by_count={topic.cited_by_count}
                      domain={topic.domain}
                      field={topic.field}
                    />
                  ))}
                </div>
              </div>
              
              {/* Browse by Categories */}
              <div>
                <h2 className={`text-xl font-semibold mb-4 text-gray-900 ${lusitana.className}`}>
                  Browse by Domain
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link
                    href="/openalex/topics?domain=computer"
                    className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 hover:bg-blue-50 transition duration-200"
                  >
                    <div>
                      <h3 className="font-medium text-gray-900">Computer Science</h3>
                      <p className="text-sm text-gray-600">AI, Machine Learning, Data Science</p>
                    </div>
                    <ArrowRightIcon className="h-5 w-5 text-blue-600" />
                  </Link>
                  
                  <Link
                    href="/openalex/topics?domain=medicine"
                    className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 hover:bg-blue-50 transition duration-200"
                  >
                    <div>
                      <h3 className="font-medium text-gray-900">Medicine</h3>
                      <p className="text-sm text-gray-600">Healthcare, Diseases, Treatments</p>
                    </div>
                    <ArrowRightIcon className="h-5 w-5 text-blue-600" />
                  </Link>
                  
                  <Link
                    href="/openalex/topics?domain=biology"
                    className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 hover:bg-blue-50 transition duration-200"
                  >
                    <div>
                      <h3 className="font-medium text-gray-900">Biology</h3>
                      <p className="text-sm text-gray-600">Genetics, Ecology, Evolution</p>
                    </div>
                    <ArrowRightIcon className="h-5 w-5 text-blue-600" />
                  </Link>
                  
                  <Link
                    href="/openalex/topics?domain=physics"
                    className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 hover:bg-blue-50 transition duration-200"
                  >
                    <div>
                      <h3 className="font-medium text-gray-900">Physics</h3>
                      <p className="text-sm text-gray-600">Quantum Physics, Astrophysics</p>
                    </div>
                    <ArrowRightIcon className="h-5 w-5 text-blue-600" />
                  </Link>
                  
                  <Link
                    href="/openalex/topics?domain=engineering"
                    className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 hover:bg-blue-50 transition duration-200"
                  >
                    <div>
                      <h3 className="font-medium text-gray-900">Engineering</h3>
                      <p className="text-sm text-gray-600">Mechanical, Electrical, Civil</p>
                    </div>
                    <ArrowRightIcon className="h-5 w-5 text-blue-600" />
                  </Link>
                  
                  <Link
                    href="/openalex/topics?sort=works_count:desc"
                    className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 hover:bg-blue-50 transition duration-200"
                  >
                    <div>
                      <h3 className="font-medium text-gray-900">All Topics</h3>
                      <p className="text-sm text-gray-600">Browse all research topics</p>
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