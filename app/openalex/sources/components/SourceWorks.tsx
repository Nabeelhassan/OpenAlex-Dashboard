'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

interface Author {
  id: string;
  display_name: string;
  orcid?: string;
}

interface Work {
  id: string;
  display_name: string;
  publication_year: number;
  cited_by_count: number;
  open_access: boolean;
  authors: Author[];
}

interface SourceWorksProps {
  works: Work[];
  source_id: string;
}

export default function SourceWorks({ works, source_id }: SourceWorksProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Publications</CardTitle>
          <CardDescription>Recent works published in this source</CardDescription>
        </div>
        <Link 
          href={`/openalex/works?filter=primary_location.source.id:${source_id}`}
          className="text-sm text-blue-600 hover:underline"
        >
          View all
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {works.map(work => (
            <div key={work.id} className="p-4 border rounded-md hover:bg-gray-50">
              <h3 className="font-medium text-blue-600 hover:underline">
                <Link href={`/openalex/works/${work.id}`}>
                  {work.display_name}
                </Link>
              </h3>
              
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="text-sm text-gray-600">
                  {work.publication_year}
                </span>
                
                <span className="text-sm text-gray-500">•</span>
                
                <span className="text-sm text-gray-600">
                  {work.cited_by_count.toLocaleString()} citations
                </span>
                
                {work.open_access && (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Open Access
                  </Badge>
                )}
              </div>
              
              <p className="text-sm text-gray-600 mt-2">
                <span className="font-medium">Authors: </span>
                {work.authors.map((author, index) => (
                  <span key={author.id}>
                    <Link 
                      href={`/openalex/authors/${author.id}`}
                      className="hover:underline"
                    >
                      {author.display_name}
                    </Link>
                    {index < work.authors.length - 1 ? ', ' : ''}
                  </span>
                ))}
                {work.authors.length > 3 && ' et al.'}
              </p>
            </div>
          ))}
          
          {works.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <p>No works found for this source.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 