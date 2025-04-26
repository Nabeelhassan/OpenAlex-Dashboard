'use client';

import { UserIcon } from '@heroicons/react/24/outline';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface CoAuthor {
  id: string;
  display_name: string;
  works_count?: number;
  cited_by_count?: number;
  orcid?: string;
  image_url?: string;
  last_known_institution?: {
    id: string;
    display_name: string;
    country_code?: string;
  };
}

interface CoAuthorsSectionProps {
  authorId: string;
  initialCoAuthors?: CoAuthor[];
  limit?: number;
}

export default function CoAuthorsSection({ 
  authorId, 
  initialCoAuthors,
  limit = 10
}: CoAuthorsSectionProps) {
  const [coAuthors, setCoAuthors] = useState<CoAuthor[]>(initialCoAuthors || []);
  const [loading, setLoading] = useState(!initialCoAuthors);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If we have initial co-authors, don't fetch them
    if (initialCoAuthors) {
      return;
    }

    async function fetchCoAuthors() {
      try {
        setLoading(true);
        
        // Construct the URL to fetch related authors
        const url = `https://api.openalex.org/authors?filter=has_coauthors.id:${authorId}&per-page=${limit}&sort=works_count:desc`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Failed to fetch co-authors');
        }
        
        const data = await response.json();
        setCoAuthors(data.results || []);
      } catch (error) {
        console.error('Error fetching co-authors:', error);
        setError('Failed to load co-authors');
      } finally {
        setLoading(false);
      }
    }

    if (authorId) {
      fetchCoAuthors();
    }
  }, [authorId, initialCoAuthors, limit]);

  if (loading) {
    return (
      <Card className="col-span-full md:col-span-1">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium flex items-center">
            <UserIcon className="h-5 w-5 mr-2 text-gray-500" />
            Co-Authors
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {Array(3).fill(0).map((_, index) => (
              <div key={index} className="flex items-center gap-3 animate-pulse">
                <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                <div className="flex-1">
                  <div className="h-4 w-32 bg-gray-200 rounded mb-1"></div>
                  <div className="h-3 w-24 bg-gray-100 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="col-span-full md:col-span-1">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium flex items-center">
            <UserIcon className="h-5 w-5 mr-2 text-gray-500" />
            Co-Authors
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-sm text-red-500">{error}</div>
        </CardContent>
      </Card>
    );
  }

  if (!coAuthors || coAuthors.length === 0) {
    return null;
  }

  return (
    <Card className="col-span-full md:col-span-1">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium flex items-center">
          <UserIcon className="h-5 w-5 mr-2 text-gray-500" />
          Co-Authors
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ul className="space-y-3">
          {coAuthors.map((author) => {
            // Extract ID from URL if needed
            const id = typeof author.id === 'string'
              ? author.id.replace('https://openalex.org/', '')
              : author.id;
              
            return (
              <li key={id} className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  {author.image_url ? (
                    <Image 
                      src={author.image_url} 
                      alt={author.display_name} 
                      width={32} 
                      height={32} 
                      className="rounded-full"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <UserIcon className="h-4 w-4 text-blue-600" />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <Link 
                    href={`/openalex/authors/${id}`} 
                    className="text-sm font-medium text-blue-600 hover:underline truncate block"
                  >
                    {author.display_name}
                  </Link>
                  {author.last_known_institution && (
                    <div className="text-xs text-gray-500 truncate">
                      {author.last_known_institution.display_name}
                    </div>
                  )}
                </div>
                {author.works_count !== undefined && (
                  <div className="text-xs text-gray-500 whitespace-nowrap">
                    {author.works_count} works
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
} 