'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { fetchAuthorById, fetchWorksByAuthor } from '@/app/lib/openalex';
import { 
  UserIcon, 
  BuildingLibraryIcon, 
  DocumentTextIcon, 
  ArrowTopRightOnSquareIcon,
  AcademicCapIcon,
  IdentificationIcon,
  ChartBarIcon,
  MapPinIcon,
  CalendarIcon,
  BeakerIcon
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Pagination } from '@/components/ui/pagination';

// Include a simple bar chart for citations by year
function CitationsByYearChart({ citationsByYear }: { citationsByYear: Record<string, number> }) {
  const years = Object.keys(citationsByYear).sort();
  const maxCount = Math.max(...Object.values(citationsByYear));
  
  if (!years.length) return null;
  
  return (
    <div className="mt-4">
      <div className="mb-2 text-sm text-gray-500 font-medium">Citations by Year</div>
      <div className="flex items-end h-40 gap-1">
        {years.map(year => (
          <div 
            key={year} 
            className="flex flex-col items-center"
            style={{ width: `${100 / years.length}%`, maxWidth: '40px' }}
          >
            <div 
              className="w-full bg-blue-500 rounded-t-sm transition-all hover:bg-blue-600"
              style={{ 
                height: `${(citationsByYear[year] / maxCount) * 100}%`,
                minHeight: '1px'
              }}
              title={`${year}: ${citationsByYear[year]} citations`}
            />
            <div className="text-xs text-gray-600 mt-1 truncate">
              {year}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Display works count by year
function WorksByYearChart({ worksByYearCount }: { worksByYearCount: Record<string, number> }) {
  const years = Object.keys(worksByYearCount).sort();
  const maxCount = Math.max(...Object.values(worksByYearCount));
  
  if (!years.length) return null;
  
  return (
    <div className="mt-4">
      <div className="mb-2 text-sm text-gray-500 font-medium">Works by Year</div>
      <div className="flex items-end h-40 gap-1">
        {years.map(year => (
          <div 
            key={year} 
            className="flex flex-col items-center"
            style={{ width: `${100 / years.length}%`, maxWidth: '40px' }}
          >
            <div 
              className="w-full bg-green-500 rounded-t-sm transition-all hover:bg-green-600"
              style={{ 
                height: `${(worksByYearCount[year] / maxCount) * 100}%`,
                minHeight: '1px'
              }}
              title={`${year}: ${worksByYearCount[year]} works`}
            />
            <div className="text-xs text-gray-600 mt-1 truncate">
              {year}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AuthorPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [author, setAuthor] = useState<any>(null);
  const [works, setWorks] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [worksLoading, setWorksLoading] = useState(true);
  const [worksFilter, setWorksFilter] = useState('recent');
  const [activeTab, setActiveTab] = useState('list');
  const [citationsByYear, setCitationsByYear] = useState<Record<string, number>>({});
  const [worksByYearCount, setWorksByYearCount] = useState<Record<string, number>>({});
  
  useEffect(() => {
    async function loadAuthor() {
      try {
        setLoading(true);
        // Add fields param to get all related information
        const data = await fetchAuthorById(id);
        setAuthor(data);
        
        // Process citation counts by year
        if (data.counts_by_year) {
          const citationData: Record<string, number> = {};
          data.counts_by_year.forEach((item: any) => {
            if (item.year && item.cited_by_count) {
              citationData[item.year] = item.cited_by_count;
            }
          });
          setCitationsByYear(citationData);
        }
        
        // Process works by year
        if (data.counts_by_year) {
          const worksData: Record<string, number> = {};
          data.counts_by_year.forEach((item: any) => {
            if (item.year && item.works_count) {
              worksData[item.year] = item.works_count;
            }
          });
          setWorksByYearCount(worksData);
        }
      } catch (error) {
        console.error('Error loading author:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadAuthor();
  }, [id]);
  
  useEffect(() => {
    async function loadWorks() {
      try {
        setWorksLoading(true);
        
        // Determine sort order based on filter
        let sort = 'publication_date:desc';
        if (worksFilter === 'cited') {
          sort = 'cited_by_count:desc';
        }
        
        const data = await fetchWorksByAuthor(id, currentPage, 10, sort);
        setWorks(data.results || []);
        setTotalPages(Math.ceil((data.meta?.count || 0) / 10));
      } catch (error) {
        console.error('Error loading works:', error);
      } finally {
        setWorksLoading(false);
      }
    }
    
    if (author) {
      loadWorks();
    }
  }, [id, currentPage, author, worksFilter]);
  
  async function handlePageChange(newPage: number) {
    setCurrentPage(newPage);
  }

  if (loading) {
    return <AuthorDetailSkeleton />;
  }
  
  if (!author) {
    return (
      <div className="flex-1 p-6 md:p-10">
        <div className="text-center py-16">
          <h3 className="text-lg font-medium text-gray-900">Author not found</h3>
          <p className="text-gray-600 mt-2">
            The author you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/openalex/authors">
            <Button className="mt-4">Back to Authors</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  const lastKnownInstitution = author.last_known_institution;
  const topConcepts = author.x_concepts
    ?.sort((a: any, b: any) => b.score - a.score)
    .slice(0, 8) || [];
  
  // Get all affiliations (not just the last known one)
  const affiliations = author.affiliations || [];
  
  // Format counts to compact form with K, M suffix
  const formatCompactNumber = (num: number) => {
    if (!num && num !== 0) return '0';
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };
  
  // Get publication venues
  const venues = author.x_venues || [];
  
  // Calculate years active
  const yearsActive = author.works_count ? 
    `${author.earliest_publication_date ? new Date(author.earliest_publication_date).getFullYear() : 'N/A'} - ${author.latest_publication_date ? new Date(author.latest_publication_date).getFullYear() : 'Present'}` : 
    'N/A';
  
  // Parse and secure h-index
  const hIndex = typeof author.summary_stats?.h_index === 'number' 
    ? author.summary_stats.h_index 
    : (typeof author.h_index === 'number' ? author.h_index : 'N/A');
  
  // Parse i10 index (if available)
  const i10Index = author.summary_stats?.i10_index || 'N/A';
  
  // Group concepts by broader categories
  const conceptGroups = topConcepts.reduce((groups: any, concept: any) => {
    const level = concept.level || 0;
    if (!groups[level]) {
      groups[level] = [];
    }
    groups[level].push(concept);
    return groups;
  }, {});
  
  // Group works by year
  const worksByYear = works.reduce((acc: { [key: string]: any[] }, work: any) => {
    const year = work.publication_year || 'Unknown';
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(work);
    return acc;
  }, {});
  
  return (
    <main className="flex-1 p-6 md:p-10">
      <div className="mx-auto">
        {/* Author Header */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              {author.image_url ? (
                <div className="relative h-32 w-32 overflow-hidden rounded-full">
                  <Image
                    src={author.image_url}
                    alt={author.display_name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-32 w-32 items-center justify-center rounded-full bg-blue-100">
                  <UserIcon className="h-16 w-16 text-blue-600" />
                </div>
              )}
            </div>
            
            <div className="flex-grow">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h1 className={`text-2xl md:text-3xl font-bold text-gray-900 ${lusitana.className}`}>
                  {author.display_name}
                </h1>
                
                {author.orcid && (
                  <a 
                    href={`https://orcid.org/${author.orcid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-green-600 hover:text-green-700 text-sm"
                  >
                    <IdentificationIcon className="h-4 w-4" />
                    <span>ORCID</span>
                    <ArrowTopRightOnSquareIcon className="h-3 w-3" />
                  </a>
                )}
              </div>
              
              {/* Primary Institution */}
              {lastKnownInstitution && (
                <div className="flex items-center text-gray-700 mb-2">
                  <BuildingLibraryIcon className="h-5 w-5 mr-1 flex-shrink-0" />
                  <Link 
                    href={`/openalex/institutions/${lastKnownInstitution.id.replace('https://openalex.org/', '')}`}
                    className="hover:underline hover:text-blue-600"
                  >
                    {lastKnownInstitution.display_name}
                    {lastKnownInstitution.country_code && ` (${lastKnownInstitution.country_code})`}
                  </Link>
                </div>
              )}
              
              {/* Years Active */}
              <div className="flex items-center text-gray-700 mb-2">
                <CalendarIcon className="h-5 w-5 mr-1 flex-shrink-0" />
                <span>Active: {yearsActive}</span>
              </div>
              
              {/* External profiles */}
              <div className="flex flex-wrap gap-3 mb-4">
                {author.ids?.scopus && (
                  <a 
                    href={`https://www.scopus.com/authid/detail.uri?authorId=${author.ids.scopus}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 bg-orange-50 text-orange-700 px-2 py-1 rounded-full text-xs"
                  >
                    <span>Scopus</span>
                    <ArrowTopRightOnSquareIcon className="h-3 w-3" />
                  </a>
                )}
                
                {author.ids?.mag && (
                  <a 
                    href={`https://academic.microsoft.com/author/${author.ids.mag}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs"
                  >
                    <span>Microsoft Academic</span>
                    <ArrowTopRightOnSquareIcon className="h-3 w-3" />
                  </a>
                )}
                
                {author.ids?.twitter && (
                  <a 
                    href={`https://twitter.com/${author.ids.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 bg-sky-50 text-sky-700 px-2 py-1 rounded-full text-xs"
                  >
                    <span>Twitter</span>
                    <ArrowTopRightOnSquareIcon className="h-3 w-3" />
                  </a>
                )}
                
                {author.ids?.wikipedia && (
                  <a 
                    href={author.ids.wikipedia}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 bg-neutral-50 text-neutral-700 px-2 py-1 rounded-full text-xs"
                  >
                    <span>Wikipedia</span>
                    <ArrowTopRightOnSquareIcon className="h-3 w-3" />
                  </a>
                )}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-4">
                <div className="text-center bg-gray-50 p-2 rounded-md">
                  <div className="text-xl font-bold text-blue-600">
                    {formatCompactNumber(author.works_count || 0)}
                  </div>
                  <div className="text-xs text-gray-600">Works</div>
                </div>
                
                <div className="text-center bg-gray-50 p-2 rounded-md">
                  <div className="text-xl font-bold text-blue-600">
                    {formatCompactNumber(author.cited_by_count || 0)}
                  </div>
                  <div className="text-xs text-gray-600">Citations</div>
                </div>
                
                <div className="text-center bg-gray-50 p-2 rounded-md">
                  <div className="text-xl font-bold text-blue-600">
                    {hIndex}
                  </div>
                  <div className="text-xs text-gray-600">h-index</div>
                </div>
                
                <div className="text-center bg-gray-50 p-2 rounded-md">
                  <div className="text-xl font-bold text-blue-600">
                    {i10Index}
                  </div>
                  <div className="text-xs text-gray-600">i10-index</div>
                </div>
                
                <div className="text-center bg-gray-50 p-2 rounded-md">
                  <div className="text-xl font-bold text-blue-600">
                    {formatCompactNumber(author.summary_stats?.["2yr_mean_citedness"] || 0)}
                  </div>
                  <div className="text-xs text-gray-600">2-yr Mean Cites</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Charts for works and citations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <WorksByYearChart worksByYearCount={worksByYearCount} />
            <CitationsByYearChart citationsByYear={citationsByYear} />
          </div>
        </div>
        
        {/* Affiliations Section */}
        {affiliations.length > 0 && (
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
            <h2 className={`text-xl font-semibold mb-4 ${lusitana.className}`}>
              Affiliations
            </h2>
            
            <div className="space-y-4">
              {affiliations.map((affiliation: any, index: number) => (
                <div 
                  key={index} 
                  className="flex items-start p-3 border border-gray-100 rounded-lg hover:bg-gray-50"
                >
                  <BuildingLibraryIcon className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">
                      {affiliation.institution?.display_name || 'Unknown Institution'}
                    </h3>
                    <div className="text-sm text-gray-600 mt-1">
                      {affiliation.institution?.country_code && (
                        <div className="flex items-center">
                          <MapPinIcon className="h-4 w-4 mr-1" />
                          {affiliation.institution.country_code}
                        </div>
                      )}
                      {affiliation.years && (
                        <div className="flex items-center mt-1">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          {Array.isArray(affiliation.years) ? affiliation.years.join(', ') : affiliation.years}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Research Areas Section */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
          <h2 className={`text-xl font-semibold mb-4 ${lusitana.className}`}>
            Research Areas
          </h2>
          
          {topConcepts.length > 0 ? (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {topConcepts.map((concept: any) => (
                  <div 
                    key={concept.id}
                    className="group relative bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm hover:bg-blue-100 transition-colors"
                  >
                    <Link href={`/openalex/concepts/${concept.id.replace('https://openalex.org/', '')}`}>
                      {concept.display_name}
                      <span className="ml-1 text-blue-500 text-xs">
                        ({Math.round(concept.score * 100)}%)
                      </span>
                    </Link>
                    <div className="absolute hidden group-hover:block top-full left-1/2 transform -translate-x-1/2 mt-2 p-2 bg-white rounded-md shadow-lg z-10 text-xs text-gray-600 w-48">
                      <strong>Level {concept.level || 0} concept</strong><br />
                      {concept.works_count?.toLocaleString() || 0} works<br />
                      {concept.cited_by_count?.toLocaleString() || 0} citations
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Top Concepts Distribution</h3>
                <div className="h-8 bg-gray-100 rounded-full overflow-hidden flex">
                  {topConcepts.map((concept: any, index: number) => (
                    <div 
                      key={concept.id}
                      title={`${concept.display_name}: ${Math.round(concept.score * 100)}%`}
                      className="h-full transition-all hover:opacity-80"
                      style={{ 
                        width: `${concept.score * 100}%`, 
                        backgroundColor: `hsl(${210 + index * 30}, 70%, 60%)`,
                        minWidth: '1px'
                      }}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{topConcepts[0]?.display_name}</span>
                  <span>{topConcepts[topConcepts.length-1]?.display_name}</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-600">No research areas available</p>
          )}
        </div>
        
        {/* Publication Venues */}
        {venues && venues.length > 0 && (
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
            <h2 className={`text-xl font-semibold mb-4 ${lusitana.className}`}>
              Publication Venues
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {venues.slice(0, 6).map((venue: any) => (
                <div 
                  key={venue.id}
                  className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50"
                >
                  <h3 className="font-medium text-blue-700">{venue.display_name}</h3>
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>{venue.works_count || 0} works</span>
                    <span>{venue.cited_by_count || 0} citations</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Co-authors section */}
        {author.x_authors && author.x_authors.length > 0 && (
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
            <h2 className={`text-xl font-semibold mb-4 ${lusitana.className}`}>
              Co-Authors
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(author.x_authors || []).slice(0, 6).map((coAuthor: any) => (
                <Link 
                  key={coAuthor.id} 
                  href={`/openalex/authors/${coAuthor.id.replace('https://openalex.org/', '')}`}
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <AcademicCapIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">{coAuthor.display_name}</div>
                    <div className="text-xs text-gray-500">
                      {coAuthor.works_count || 0} shared works
                    </div>
                    {coAuthor.institution?.display_name && (
                      <div className="text-xs text-gray-500">
                        {coAuthor.institution.display_name}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
        
        {/* Works Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className={`text-xl font-semibold ${lusitana.className}`}>
              Works ({author.works_count?.toLocaleString() || 0})
            </h2>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select 
                className="text-sm border border-gray-300 rounded-md px-2 py-1"
                value={worksFilter}
                onChange={(e) => {
                  setWorksFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="recent">Recent</option>
                <option value="cited">Most Cited</option>
              </select>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
              <button
                onClick={() => setActiveTab('list')}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all ${activeTab === 'list' ? 'bg-white text-foreground shadow-sm' : ''}`}
              >
                List
              </button>
              <button
                onClick={() => setActiveTab('year')}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all ${activeTab === 'year' ? 'bg-white text-foreground shadow-sm' : ''}`}
              >
                By Year
              </button>
            </div>
          </div>
          
          {activeTab === 'list' && (
            worksLoading ? (
              <div className="space-y-4">
                {Array(3).fill(0).map((_, i) => (
                  <div key={i} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm animate-pulse">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            ) : works.length > 0 ? (
              <div className="space-y-4">
                {works.map((work: any) => (
                  <Card key={work.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">
                        <Link 
                          href={`/openalex/works/${work.id.replace('https://openalex.org/', '')}`}
                          className="text-blue-600 hover:underline"
                        >
                          {work.title}
                        </Link>
                      </CardTitle>
                      <CardDescription>
                        {work.publication_year} • {work.primary_location?.source?.display_name || 'Unknown Source'}
                        {work.primary_location?.source?.is_in_doaj && (
                          <span className="ml-2 inline-flex items-center bg-green-50 text-green-700 px-2 py-0.5 rounded-full text-xs">
                            DOAJ
                          </span>
                        )}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap justify-between text-sm text-gray-600">
                        <div className="flex items-center">
                          <DocumentTextIcon className="h-4 w-4 inline mr-1" />
                          {work.type || 'Unknown Type'}
                          {work.is_retracted && (
                            <span className="ml-2 inline-flex items-center bg-red-50 text-red-700 px-2 py-0.5 rounded-full text-xs">
                              Retracted
                            </span>
                          )}
                        </div>
                        <div className="flex items-center">
                          <ChartBarIcon className="h-4 w-4 inline mr-1" />
                          {work.cited_by_count?.toLocaleString() || 0} citations
                        </div>
                        
                        <div className="w-full mt-2 flex flex-wrap gap-2">
                          {work.open_access?.is_oa && (
                            <span className="inline-flex items-center bg-green-50 text-green-700 px-2 py-0.5 rounded-full text-xs">
                              Open Access
                            </span>
                          )}
                          
                          {work.doi && (
                            <a 
                              href={`https://doi.org/${work.doi.replace('https://doi.org/', '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs"
                            >
                              <span>DOI</span>
                              <ArrowTopRightOnSquareIcon className="h-3 w-3" />
                            </a>
                          )}
                          
                          {/* Authors list */}
                          <div className="inline-flex items-center bg-gray-50 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                            <AcademicCapIcon className="h-3 w-3 mr-1" />
                            <span>
                              {work.authorships?.length ? 
                                `${work.authorships.length} author${work.authorships.length > 1 ? 's' : ''}` : 
                                'No authors'}
                            </span>
                          </div>
                          
                          {/* Concepts tags */}
                          {work.concepts?.length > 0 && work.concepts[0]?.display_name && (
                            <div className="inline-flex items-center bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full text-xs">
                              <BeakerIcon className="h-3 w-3 mr-1" />
                              <span>{work.concepts[0].display_name}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    loading={worksLoading}
                  />
                )}
              </div>
            ) : (
              <div className="text-center py-8 bg-white p-6 rounded-lg border border-gray-200">
                <p className="text-gray-600">No works found for this author</p>
              </div>
            )
          )}
          
          {activeTab === 'year' && (
            worksLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-8 w-24 mb-2" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-8 w-24 mb-2" />
                <Skeleton className="h-24 w-full" />
              </div>
            ) : works.length > 0 ? (
              <div className="space-y-6">
                {Object.entries(worksByYear)
                  .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
                  .map(([year, yearWorks]) => (
                    <div key={year} className="border-l-4 border-blue-200 pl-4">
                      <h3 className="text-lg font-semibold mb-3">{year}</h3>
                      <div className="space-y-3">
                        {yearWorks.map((work: any) => (
                          <div key={work.id} className="bg-white p-3 rounded-lg border border-gray-100 hover:border-blue-200">
                            <Link 
                              href={`/openalex/works/${work.id.replace('https://openalex.org/', '')}`}
                              className="text-blue-600 hover:underline font-medium block mb-1"
                            >
                              {work.title}
                            </Link>
                            <div className="flex justify-between text-sm text-gray-600">
                              <div>{work.primary_location?.source?.display_name || 'Unknown Source'}</div>
                              <div className="flex items-center">
                                <ChartBarIcon className="h-3 w-3 inline mr-1" />
                                {work.cited_by_count?.toLocaleString() || 0}
                              </div>
                            </div>
                            
                            {/* Type and access */}
                            <div className="mt-1 flex flex-wrap gap-1">
                              <span className="text-xs text-gray-500">{work.type}</span>
                              {work.open_access?.is_oa && (
                                <span className="inline-block bg-green-50 text-green-700 px-1 py-0.5 rounded text-xs">OA</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    loading={worksLoading}
                  />
                )}
              </div>
            ) : (
              <div className="text-center py-8 bg-white p-6 rounded-lg border border-gray-200">
                <p className="text-gray-600">No works found for this author</p>
              </div>
            )
          )}
        </div>
      </div>
    </main>
  );
}

function AuthorDetailSkeleton() {
  return (
    <main className="flex-1 p-6 md:p-10">
      <div className="mx-auto">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8 animate-pulse">
          <div className="flex flex-col md:flex-row gap-6">
            <Skeleton className="h-32 w-32 rounded-full" />
            
            <div className="flex-grow">
              <Skeleton className="h-10 w-3/4 mb-4" />
              <Skeleton className="h-5 w-1/2 mb-3" />
              <Skeleton className="h-5 w-1/3 mb-6" />
              
              <div className="flex flex-wrap gap-2 mb-4">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-4">
                <Skeleton className="h-16 w-full rounded-md" />
                <Skeleton className="h-16 w-full rounded-md" />
                <Skeleton className="h-16 w-full rounded-md" />
                <Skeleton className="h-16 w-full rounded-md" />
                <Skeleton className="h-16 w-full rounded-md" />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <Skeleton className="h-40 w-full rounded-md" />
            <Skeleton className="h-40 w-full rounded-md" />
          </div>
        </div>
        
        {/* Affiliations Skeleton */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
          <Skeleton className="h-8 w-48 mb-4" />
          <div className="space-y-4">
            <Skeleton className="h-20 w-full rounded-md" />
            <Skeleton className="h-20 w-full rounded-md" />
          </div>
        </div>
        
        {/* Research Areas Skeleton */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
          <Skeleton className="h-8 w-48 mb-4" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-8 w-24 rounded-full" />
            <Skeleton className="h-8 w-32 rounded-full" />
            <Skeleton className="h-8 w-28 rounded-full" />
            <Skeleton className="h-8 w-36 rounded-full" />
          </div>
          <Skeleton className="h-8 w-full mt-6 rounded-full" />
        </div>
        
        {/* Publication Venues Skeleton */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
          <Skeleton className="h-8 w-48 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton className="h-16 w-full rounded-md" />
            <Skeleton className="h-16 w-full rounded-md" />
            <Skeleton className="h-16 w-full rounded-md" />
            <Skeleton className="h-16 w-full rounded-md" />
          </div>
        </div>
        
        {/* Co-Authors Skeleton */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
          <Skeleton className="h-8 w-48 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Skeleton className="h-20 w-full rounded-md" />
            <Skeleton className="h-20 w-full rounded-md" />
            <Skeleton className="h-20 w-full rounded-md" />
            <Skeleton className="h-20 w-full rounded-md" />
            <Skeleton className="h-20 w-full rounded-md" />
            <Skeleton className="h-20 w-full rounded-md" />
          </div>
        </div>
        
        {/* Works Skeleton */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-8 w-32" />
          </div>
          
          <Skeleton className="h-10 w-48 mb-6" />
          
          <div className="space-y-4">
            <Skeleton className="h-32 w-full rounded-lg" />
            <Skeleton className="h-32 w-full rounded-lg" />
            <Skeleton className="h-32 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </main>
  );
} 