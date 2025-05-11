import { Suspense } from 'react';
import { ArrowLeftIcon, PuzzlePieceIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { notFound } from 'next/navigation';

import { getTopic, getTopicWorks, getTopicAuthors } from '@/app/lib/openalex/topics';
import TopicDetail from '../components/TopicDetail';
import TopicTrendChart from '../components/TopicTrendChart';

export default async function TopicDetailPage({ params }: { params: { id: string } }) {
  // Extract the clean ID from the parameter
  const rawId = params.id;
  const topicId = rawId.startsWith('@') 
    ? rawId.substring(1).split('/').pop() || rawId
    : rawId.includes('/') 
      ? rawId.split('/').pop() || rawId
      : rawId;
  
  const topic = await getTopic(topicId);
  
  if (!topic) {
    notFound();
  }
  
  // Fetch related works for this topic
  const works = await getTopicWorks(topicId, 5);
  
  // Fetch top authors for this topic
  const authors = await getTopicAuthors(topicId, 5);
  
  // Format works data
  const formattedWorks = works.map(work => ({
    id: work.id,
    title: work.title,
    publication_year: work.publication_year,
    cited_by_count: work.cited_by_count,
    doi: work.doi,
    authors: work.authorships?.map((authorship: any) => ({
      id: authorship.author.id,
      name: authorship.author.display_name
    }))
  }));
  
  // Format authors data
  const formattedAuthors = authors.map((author: { 
    id: string; 
    display_name: string; 
    works_count: number; 
    cited_by_count: number; 
    last_known_institution?: { 
      display_name: string 
    } 
  }) => ({
    id: author.id,
    name: author.display_name,
    works_count: author.works_count,
    cited_by_count: author.cited_by_count,
    institution: author.last_known_institution?.display_name
  }));
  
  return (
    <main className="flex-1">
      <Link
        href="/openalex/topics"
        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        <span>Back to Topics</span>
      </Link>
      
      {/* Topic Header */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <PuzzlePieceIcon className="h-7 w-7 text-blue-600" />
              <h1 className={`text-2xl md:text-3xl font-bold text-gray-900 ${lusitana.className}`}>
                {topic.display_name}
              </h1>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                {topic.domain.display_name}
              </Badge>
              
              <Badge variant="outline">
                {topic.field.display_name}
              </Badge>
              
              {topic.subfield && (
                <Badge variant="outline" className="bg-gray-50">
                  {topic.subfield.display_name}
                </Badge>
              )}
            </div>
            
            {topic.description && (
              <p className="text-sm text-gray-600 mt-4 max-w-4xl">
                {topic.description}
              </p>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-gray-500">Publications</p>
            <p className="mt-1 text-xl font-semibold">{topic.works_count.toLocaleString()}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-gray-500">Citations</p>
            <p className="mt-1 text-xl font-semibold">{topic.cited_by_count.toLocaleString()}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-gray-500">Citations per Publication</p>
            <p className="mt-1 text-xl font-semibold">
              {(topic.cited_by_count / topic.works_count).toFixed(1)}
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-gray-500">OpenAlex ID</p>
            <p className="mt-1 text-sm font-mono text-gray-700 truncate">
              {topic.id}
            </p>
          </div>
        </div>
      </div>
      
      {/* Tabs for Topic Details */}
      <Tabs defaultValue="overview" className="mt-8">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="works">Publications</TabsTrigger>
          <TabsTrigger value="authors">Authors</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <TopicDetail topic={topic} />
            </div>
            
            <div>
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Related Topics</h2>
                {topic.related_topics ? (
                  <ul className="space-y-2">
                    {topic.related_topics.slice(0, 5).map(relatedTopic => (
                      <li key={relatedTopic.id}>
                        <Link 
                          href={`/openalex/topics/${relatedTopic.id.split('/').pop()}`}
                          className="text-blue-600 hover:underline"
                        >
                          {relatedTopic.display_name}
                        </Link>
                        <span className="text-xs text-gray-500 ml-2">
                          ({relatedTopic.works_count.toLocaleString()} works)
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No related topics available.</p>
                )}
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="works">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Top Publications</h2>
            {formattedWorks.length > 0 ? (
              <ul className="space-y-4 divide-y divide-gray-100">
                {formattedWorks.map(work => (
                  <li key={work.id} className="pt-4 first:pt-0">
                    <Link 
                      href={`/openalex/works/${work.id.split('/').pop()}`}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      {work.title}
                    </Link>
                    <div className="text-sm text-gray-500 mt-1">
                      <span>{work.publication_year}</span>
                      <span className="mx-2">•</span>
                      <span>{work.cited_by_count.toLocaleString()} citations</span>
                    </div>
                    {work.authors && work.authors.length > 0 && (
                      <div className="text-sm text-gray-600 mt-1">
                        By: {work.authors.slice(0, 3).map((author: { name: string }) => author.name).join(', ')}
                        {work.authors.length > 3 && ' et al.'}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No publications found for this topic.</p>
            )}
            
            <div className="mt-4 text-right">
              <Link
                href={`/openalex/works?filter=topics.id:${topicId}`}
                className="text-blue-600 hover:underline text-sm"
              >
                View all publications in this topic →
              </Link>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="authors">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Top Authors</h2>
            {formattedAuthors.length > 0 ? (
              <ul className="space-y-4 divide-y divide-gray-100">
                {formattedAuthors.map(author => (
                  <li key={author.id} className="pt-4 first:pt-0">
                    <Link 
                      href={`/openalex/authors/${author.id.split('/').pop()}`}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      {author.name}
                    </Link>
                    {author.institution && (
                      <div className="text-sm text-gray-600 mt-1">
                        {author.institution}
                      </div>
                    )}
                    <div className="text-sm text-gray-500 mt-1">
                      <span>{author.works_count.toLocaleString()} publications</span>
                      <span className="mx-2">•</span>
                      <span>{author.cited_by_count.toLocaleString()} citations</span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No top authors found for this topic.</p>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="trends">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Publication Trends</h2>
            {topic.counts_by_year && topic.counts_by_year.length > 0 ? (
              <div className="h-64 w-full">
                <TopicTrendChart counts_by_year={topic.counts_by_year} />
              </div>
            ) : (
              <p className="text-gray-500">No trend data available for this topic.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
} 