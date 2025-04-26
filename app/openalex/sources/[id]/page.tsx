'use client';

import { Suspense } from 'react';
import { ArrowLeftIcon, ArrowTopRightOnSquareIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

export default function SourceDetail({ params }: { params: { id: string } }) {
  // In a real implementation, fetch the source data using the id
  const sourceId = params.id;
  
  return (
    <main className="flex-1 p-6 md:p-10">
      <Link
        href="/openalex/sources"
        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        <span>Back to Sources</span>
      </Link>
      
      <Suspense fallback={<SourceHeaderSkeleton />}>
        <SourceHeader 
          id={sourceId}
          display_name="PeerJ"
          type="journal"
          is_oa={true}
          homepage_url="http://www.peerj.com/"
          issn={["2167-8359"]}
          works_count={20184}
          cited_by_count={133702}
        />
      </Suspense>
      
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
                    <dd className="mt-1 text-sm text-gray-900">Journal</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Publisher</dt>
                    <dd className="mt-1 text-sm text-gray-900">PeerJ Inc.</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">ISSN</dt>
                    <dd className="mt-1 text-sm text-gray-900">2167-8359</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Country</dt>
                    <dd className="mt-1 text-sm text-gray-900">United States (US)</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Access</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Open Access
                      </Badge>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">In DOAJ</dt>
                    <dd className="mt-1 text-sm text-gray-900">Yes</dd>
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
                    <dd className="mt-1 text-2xl font-semibold text-gray-900">20,184</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Citations</dt>
                    <dd className="mt-1 text-2xl font-semibold text-gray-900">133,702</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">h-index</dt>
                    <dd className="mt-1 text-2xl font-semibold text-gray-900">105</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">i10-index</dt>
                    <dd className="mt-1 text-2xl font-semibold text-gray-900">5,045</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="metrics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Publication Trends</CardTitle>
                <CardDescription>Publications per year</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                {/* Publication trend chart would go here */}
                <div className="flex items-center justify-center h-full bg-gray-50 border border-dashed border-gray-300 rounded-md">
                  <p className="text-gray-500">Publications Trend Chart</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Citation Trends</CardTitle>
                <CardDescription>Citations per year</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                {/* Citation trend chart would go here */}
                <div className="flex items-center justify-center h-full bg-gray-50 border border-dashed border-gray-300 rounded-md">
                  <p className="text-gray-500">Citations Trend Chart</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="works">
          <Card>
            <CardHeader>
              <CardTitle>Recent Publications</CardTitle>
              <CardDescription>Recently published works in this source</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* This would be a list of works from the API */}
                <div className="p-4 border rounded-md hover:bg-gray-50">
                  <h3 className="font-medium text-blue-600 hover:underline">
                    <Link href="/openalex/works/W2901957504">
                      Large Language Models Encode Clinical Knowledge
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Authors:</span> Singhal K, Azizi A, Tu T, et al.
                  </p>
                  <p className="text-sm text-gray-500 mt-1">2023 • 1,245 citations</p>
                </div>
                
                <div className="p-4 border rounded-md hover:bg-gray-50">
                  <h3 className="font-medium text-blue-600 hover:underline">
                    <Link href="/openalex/works/W3128292260">
                      Generative Agents: Interactive Simulacra of Human Behavior
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Authors:</span> Park J, O'Brien J, Cai C, et al.
                  </p>
                  <p className="text-sm text-gray-500 mt-1">2023 • 987 citations</p>
                </div>
                
                <div className="p-4 border rounded-md hover:bg-gray-50">
                  <h3 className="font-medium text-blue-600 hover:underline">
                    <Link href="/openalex/works/W2772766867">
                      Hierarchical Convolutional Neural Networks for EEG-Based Emotion Recognition
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Authors:</span> Yang Y, Wu Q, Fu Y, et al.
                  </p>
                  <p className="text-sm text-gray-500 mt-1">2017 • 854 citations</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="concepts">
          <Card>
            <CardHeader>
              <CardTitle>Top Concepts</CardTitle>
              <CardDescription>Main research areas covered by this source</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-80">
                  {/* Concepts chart would go here */}
                  <div className="flex items-center justify-center h-full bg-gray-50 border border-dashed border-gray-300 rounded-md">
                    <p className="text-gray-500">Concepts Distribution Chart</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Biology</span>
                    <span className="text-sm text-gray-500">86.7%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '86.7%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Chemistry</span>
                    <span className="text-sm text-gray-500">51.4%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '51.4%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Medicine</span>
                    <span className="text-sm text-gray-500">42.8%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '42.8%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Computer Science</span>
                    <span className="text-sm text-gray-500">27.3%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '27.3%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Physics</span>
                    <span className="text-sm text-gray-500">18.9%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '18.9%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
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
}: {
  id: string;
  display_name: string;
  type: string;
  is_oa: boolean;
  homepage_url: string;
  issn: string[];
  works_count: number;
  cited_by_count: number;
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

function SourceHeaderSkeleton() {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm animate-pulse">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="h-8 w-64 bg-gray-200 rounded mb-2"></div>
          <div className="flex gap-2">
            <div className="h-6 w-20 bg-gray-200 rounded"></div>
            <div className="h-6 w-28 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="h-6 w-28 bg-gray-200 rounded"></div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
          <div className="h-6 w-16 bg-gray-200 rounded"></div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="h-4 w-20 bg-gray-200 rounded mb-2"></div>
          <div className="h-6 w-16 bg-gray-200 rounded"></div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="h-4 w-36 bg-gray-200 rounded mb-2"></div>
          <div className="h-6 w-12 bg-gray-200 rounded"></div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="h-4 w-28 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
} 