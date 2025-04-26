'use client';

import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

interface WorkCardProps {
  id: string;
  title: string;
  display_name?: string;
  publication_year?: number;
  journal?: string;
  authors?: {
    author: {
      display_name: string;
    }
  }[];
  type?: string;
  is_oa?: boolean;
  cited_by_count?: number;
}

export function WorkCard({
  id,
  title,
  display_name,
  publication_year,
  journal,
  authors = [],
  type = 'article',
  is_oa = false,
  cited_by_count = 0
}: WorkCardProps) {
  // Format the OpenAlex ID
  const workId = id.replace('https://openalex.org/', '');
  
  // Get first 3 authors and add "et al" if more
  const displayAuthors = authors.slice(0, 3).map(a => a.author.display_name);
  if (authors.length > 3) {
    displayAuthors.push('et al.');
  }
  
  return (
    <Link
      href={`/openalex/works/${workId}`}
      className="block bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 hover:shadow-md transition duration-200"
    >
      <div className="flex justify-between items-start mb-3">
        <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
          {type}
        </Badge>
        {is_oa && (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            Open Access
          </Badge>
        )}
      </div>
      
      <h3 className="font-medium text-lg text-blue-800 line-clamp-2 mb-2">
        {display_name || title}
      </h3>
      
      {displayAuthors.length > 0 && (
        <p className="text-sm text-gray-600 line-clamp-1 mb-2">
          {displayAuthors.join(', ')}
        </p>
      )}
      
      <div className="text-sm text-gray-600 mb-4">
        {publication_year && <span className="mr-2">{publication_year}</span>}
        {journal && <span className="italic">{journal}</span>}
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-blue-600 text-sm font-medium flex items-center">
          View details
          <ArrowRightIcon className="h-4 w-4 ml-1" />
        </div>
        
        {cited_by_count > 0 && (
          <span className="text-xs text-gray-500">
            {cited_by_count} citation{cited_by_count !== 1 ? 's' : ''}
          </span>
        )}
      </div>
    </Link>
  );
} 