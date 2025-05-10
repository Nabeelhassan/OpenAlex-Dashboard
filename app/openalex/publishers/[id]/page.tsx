import { getPublisher, getPublisherWorks, getPublisherSources } from '@/app/lib/openalex/publishers';
import { notFound } from 'next/navigation';
import { getCountryNameFromCode } from '@/app/lib/countries';
import { formatCompactNumber } from '@/app/lib/utils';
import { getOptimalImageUrl } from '@/app/lib/image-utils';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, MapPin, Building, BookOpen, Library, FileText } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import BreadCrumbs from '@/components/breadcrumbs';


interface PublisherPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: PublisherPageProps) {
  const publisher = await getPublisher(params.id);
  
  if (!publisher) {
    return {
      title: 'Publisher Not Found',
    };
  }
  
  return {
    title: `${publisher.display_name} | Publisher | OpenAlex Dashboard`,
    description: `View publisher profile for ${publisher.display_name} including works, citations, and more.`,
  };
}

export default async function PublisherPage({ params }: PublisherPageProps) {
  const publisher = await getPublisher(params.id);
  
  if (!publisher) {
    notFound();
  }
  
  const [publisherWorks, publisherSources] = await Promise.all([
    getPublisherWorks(params.id, 5),
    getPublisherSources(params.id, 5),
  ]);
  
  const countryName = publisher.country_code 
    ? getCountryNameFromCode(publisher.country_code) 
    : null;
  
  const imageUrl = getOptimalImageUrl(publisher.image_url,
    'https://static.openalex.org/publisher-images/publisher-placeholder.png');
  
  return (
    <main className="flex-1 p-6 md:p-10">
      <BreadCrumbs
        items={[
          { label: 'Publishers', href: '/openalex/publishers' },
          { label: publisher.display_name, href: `/openalex/publishers/${params.id}` },
        ]}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Publisher Info */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md border">
                <Image
                  src={imageUrl}
                  alt={publisher.display_name}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {publisher.display_name}
                </h1>
                
                <div className="space-y-2 mt-3">
                  {publisher.type && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Building className="h-4 w-4 mr-2" />
                      <span>{publisher.type}</span>
                    </div>
                  )}
                  
                  {countryName && (
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{countryName}</span>
                    </div>
                  )}
                  
                  {publisher.homepage_url && (
                    <div className="flex items-center text-sm text-blue-600">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      <a 
                        href={publisher.homepage_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        Visit Website
                      </a>
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-sm text-gray-500">Works</div>
                    <div className="font-semibold text-lg">{formatCompactNumber(publisher.works_count)}</div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-sm text-gray-500">Citations</div>
                    <div className="font-semibold text-lg">{formatCompactNumber(publisher.cited_by_count)}</div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-sm text-gray-500">Sources</div>
                    <div className="font-semibold text-lg">{formatCompactNumber(publisher.sources_count)}</div>
                  </div>
                  
                  {publisher.summary_stats?.h_index && (
                    <div className="bg-gray-50 p-3 rounded">
                      <div className="text-sm text-gray-500">h-index</div>
                      <div className="font-semibold text-lg">{publisher.summary_stats.h_index}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Top Works */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Top Works
              </CardTitle>
            </CardHeader>
            <CardContent>
              {publisherWorks && publisherWorks.length > 0 ? (
                <ul className="space-y-4">
                  {publisherWorks.map((work: any) => (
                    <li key={work.id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                      <Link href={`/openalex/works/${work.id}`} className="hover:text-blue-600">
                        <h3 className="font-medium">{work.title}</h3>
                      </Link>
                      <div className="flex flex-wrap gap-x-4 gap-y-2 mt-1 text-sm text-gray-600">
                        {work.publication_year && (
                          <div>{work.publication_year}</div>
                        )}
                        {work.primary_location?.source?.display_name && (
                          <div className="italic">{work.primary_location.source.display_name}</div>
                        )}
                        <div className="flex items-center">
                          <FileText className="h-3 w-3 mr-1" />
                          {formatCompactNumber(work.cited_by_count)} citations
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-gray-500 text-center py-4">No works found</div>
              )}
              
              <div className="mt-4">
                <Button variant="outline" asChild>
                  <Link href={`/openalex/works?filter=primary_location.source.publisher.id:${params.id}`}>
                    View All Works
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Top Sources */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Library className="mr-2 h-5 w-5" />
                Top Sources
              </CardTitle>
            </CardHeader>
            <CardContent>
              {publisherSources && publisherSources.length > 0 ? (
                <ul className="space-y-4">
                  {publisherSources.map((source: any) => (
                    <li key={source.id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                      <Link href={`/openalex/sources/${source.id}`} className="hover:text-blue-600">
                        <h3 className="font-medium">{source.display_name}</h3>
                      </Link>
                      <div className="flex flex-wrap gap-x-4 gap-y-2 mt-1 text-sm text-gray-600">
                        {source.type && (
                          <div>{source.type}</div>
                        )}
                        <div className="flex items-center">
                          <BookOpen className="h-3 w-3 mr-1" />
                          {formatCompactNumber(source.works_count)} works
                        </div>
                        <div className="flex items-center">
                          <FileText className="h-3 w-3 mr-1" />
                          {formatCompactNumber(source.cited_by_count)} citations
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-gray-500 text-center py-4">No sources found</div>
              )}
              
              <div className="mt-4">
                <Button variant="outline" asChild>
                  <Link href={`/openalex/sources?filter=publisher.id:${params.id}`}>
                    View All Sources
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* OpenAlex Info */}
          <Card>
            <CardHeader>
              <CardTitle>OpenAlex Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">OpenAlex ID</span>
                  <span className="font-mono">{params.id}</span>
                </div>
                
                {publisher.type && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Type</span>
                    <span>{publisher.type}</span>
                  </div>
                )}
                
                {countryName && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Country</span>
                    <span>{countryName}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-500">Sources Count</span>
                  <span>{formatCompactNumber(publisher.sources_count)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-500">Works Count</span>
                  <span>{formatCompactNumber(publisher.works_count)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-500">Cited By Count</span>
                  <span>{formatCompactNumber(publisher.cited_by_count)}</span>
                </div>
                
                {publisher.summary_stats?.h_index && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">h-index</span>
                    <span>{publisher.summary_stats.h_index}</span>
                  </div>
                )}
                
                {publisher.summary_stats?.['2yr_mean_citedness'] && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">2-Year Mean Citedness</span>
                    <span>{publisher.summary_stats['2yr_mean_citedness'].toFixed(2)}</span>
                  </div>
                )}
                
                {publisher.summary_stats?.i10_index && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">i10-index</span>
                    <span>{publisher.summary_stats.i10_index}</span>
                  </div>
                )}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a 
                    href={`https://api.openalex.org/publishers/${params.id}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-3 w-3" />
                    View in OpenAlex API
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
} 