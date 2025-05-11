import { Suspense } from 'react';
import { ArrowLeftIcon, ArrowTopRightOnSquareIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { notFound } from 'next/navigation';

import { getSource, getSourceWorks } from '@/app/lib/openalex/sources';
import SourceMetrics from '../components/SourceMetrics';
import SourceConcepts from '../components/SourceConcepts';
import SourceWorks from '../components/SourceWorks';

export default async function SourceDetail({ params }: { params: { id: string } }) {
  const sourceId = params.id;
  const source = await getSource(sourceId);
  
  if (!source) {
    notFound();
  }
  
  // Fetch works for this source
  const works = await getSourceWorks(sourceId, 5);
  
  // Format and prepare data
  const formattedWorks = works.map(work => ({
    id: work.id,
    display_name: work.display_name,
    publication_year: work.publication_year,
    cited_by_count: work.cited_by_count,
    open_access: work.open_access?.is_oa || false,
    authors: work.authorships?.map((authorship: any) => ({
      id: authorship.author.id,
      display_name: authorship.author.display_name,
      orcid: authorship.author.orcid
    })) || []
  }));
  
  return (
    <main className="flex-1">
      <Link
        href="/openalex/sources"
        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        <span>Back to Sources</span>
      </Link>
      
      <SourceHeader 
        id={source.id}
        display_name={source.display_name}
        type={source.type}
        is_oa={source.is_oa}
        homepage_url={source.homepage_url}
        issn={source.issn || []}
        works_count={source.works_count}
        cited_by_count={source.cited_by_count}
        host_organization_name={source.host_organization_name}
        country_code={source.country_code}
      />
      
      <Tabs defaultValue="overview" className="mt-8">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="works">Works</TabsTrigger>
          <TabsTrigger value="concepts">Concepts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Type</dt>
                    <dd className="mt-1 text-sm text-gray-900">{source.type}</dd>
                  </div>
                  {source.host_organization_name && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Publisher</dt>
                      <dd className="mt-1 text-sm text-gray-900">{source.host_organization_name}</dd>
                    </div>
                  )}
                  {source.issn_l && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">ISSN-L</dt>
                      <dd className="mt-1 text-sm text-gray-900">{source.issn_l}</dd>
                    </div>
                  )}
                  {source.country_code && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Country</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {getCountryName(source.country_code)} ({source.country_code})
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Access</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      <Badge variant="outline" className={source.is_oa ? "bg-green-50 text-green-700 border-green-200" : "bg-gray-50 text-gray-700 border-gray-200"}>
                        {source.is_oa ? 'Open Access' : 'Closed Access'}
                      </Badge>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">In DOAJ</dt>
                    <dd className="mt-1 text-sm text-gray-900">{source.is_in_doaj ? 'Yes' : 'No'}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Key Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Publications</dt>
                    <dd className="mt-1 text-2xl font-semibold text-gray-900">
                      {source.works_count.toLocaleString()}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Citations</dt>
                    <dd className="mt-1 text-2xl font-semibold text-gray-900">
                      {source.cited_by_count.toLocaleString()}
                    </dd>
                  </div>
                  {source.summary_stats?.h_index && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">h-index</dt>
                      <dd className="mt-1 text-2xl font-semibold text-gray-900">
                        {source.summary_stats.h_index}
                      </dd>
                    </div>
                  )}
                  {source.summary_stats?.i10_index && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">i10-index</dt>
                      <dd className="mt-1 text-2xl font-semibold text-gray-900">
                        {source.summary_stats.i10_index.toLocaleString()}
                      </dd>
                    </div>
                  )}
                </dl>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="metrics">
          <Suspense fallback={<div>Loading metrics...</div>}>
            <SourceMetrics 
              counts_by_year={source.counts_by_year || []}
              h_index={source.summary_stats?.h_index || 0}
              i10_index={source.summary_stats?.i10_index || 0}
              two_year_mean_citedness={source.summary_stats?.two_year_mean_citedness || 0}
            />
          </Suspense>
        </TabsContent>
        
        <TabsContent value="works">
          <Suspense fallback={<div>Loading works...</div>}>
            <SourceWorks 
              works={formattedWorks}
              source_id={sourceId}
            />
          </Suspense>
        </TabsContent>
        
        <TabsContent value="concepts">
          <Suspense fallback={<div>Loading concepts...</div>}>
            <SourceConcepts 
              concepts={(source.x_concepts || []).map(concept => ({
                id: concept.id,
                display_name: concept.display_name,
                level: concept.level,
                score: concept.score
              }))}
            />
          </Suspense>
        </TabsContent>
      </Tabs>
    </main>
  );
}

function SourceHeader({
  id,
  display_name,
  type,
  is_oa,
  homepage_url,
  issn,
  works_count,
  cited_by_count,
  host_organization_name,
  country_code,
}: {
  id: string;
  display_name: string;
  type: string;
  is_oa: boolean;
  homepage_url?: string;
  issn: string[];
  works_count: number;
  cited_by_count: number;
  host_organization_name?: string;
  country_code?: string;
}) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <DocumentTextIcon className="h-7 w-7 text-blue-600" />
            <h1 className={`text-2xl md:text-3xl font-bold text-gray-900 ${lusitana.className}`}>
              {display_name}
            </h1>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
              {type}
            </Badge>
            
            {is_oa && (
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                Open Access
              </Badge>
            )}
            
            {host_organization_name && (
              <span className="text-sm text-gray-500">
                Publisher: {host_organization_name}
              </span>
            )}
            
            {issn && issn.length > 0 && (
              <span className="text-sm text-gray-500">
                ISSN: {issn.join(", ")}
              </span>
            )}
          </div>
        </div>
        
        {homepage_url && (
          <a 
            href={homepage_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800"
          >
            Visit Website
            <ArrowTopRightOnSquareIcon className="h-4 w-4" />
          </a>
        )}
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm font-medium text-gray-500">Publications</p>
          <p className="mt-1 text-xl font-semibold">{works_count.toLocaleString()}</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm font-medium text-gray-500">Citations</p>
          <p className="mt-1 text-xl font-semibold">{cited_by_count.toLocaleString()}</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm font-medium text-gray-500">Citations per Publication</p>
          <p className="mt-1 text-xl font-semibold">
            {(cited_by_count / works_count).toFixed(1)}
          </p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm font-medium text-gray-500">OpenAlex ID</p>
          <p className="mt-1 text-sm font-mono text-gray-700 truncate">
            {id}
          </p>
        </div>
      </div>
    </div>
  );
}

// Helper function to get country name from country code
function getCountryName(code: string): string {
  const countries: Record<string, string> = {
    'US': 'United States',
    'GB': 'United Kingdom',
    'DE': 'Germany',
    'CN': 'China',
    'JP': 'Japan',
    'FR': 'France',
    'CA': 'Canada',
    'IT': 'Italy',
    'ES': 'Spain',
    'NL': 'Netherlands',
    'AU': 'Australia',
    'CH': 'Switzerland',
    'SE': 'Sweden',
    'KR': 'South Korea',
    'BR': 'Brazil',
    'IN': 'India',
    'RU': 'Russia'
  };
  
  return countries[code] || code;
} 