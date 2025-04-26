'use client';

import { Link2Icon } from 'lucide-react';
import Link from 'next/link';

interface RelatedWork {
  id: string;
  display_name?: string;
  publication_year?: number;
  primary_location?: {
    source?: {
      display_name?: string;
    }
  };
}

interface RelatedWorksProps {
  related_works: string[];
  referenced_works?: string[];
  relatedWorksData?: RelatedWork[];
}

export function RelatedWorks({ 
  related_works = [], 
  referenced_works = [],
  relatedWorksData = [] 
}: RelatedWorksProps) {
  if ((!related_works.length && !referenced_works.length) || !relatedWorksData.length) {
    return (
      <div className="flex items-center gap-2">
        <Link2Icon className="h-5 w-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Related Works</h2>
        <div className="text-sm text-gray-600 mt-2">No related works available</div>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Link2Icon className="h-5 w-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Related Works</h2>
      </div>
      
      <div className="space-y-4 overflow-auto max-h-[500px] pr-2">
        {relatedWorksData.map((work) => (
          <Link
            key={work.id}
            href={`/openalex/works/${work.id.replace('https://openalex.org/', '')}`}
            className="block p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition duration-200"
          >
            <h3 className="font-medium text-blue-800 hover:text-blue-600 mb-1">
              {work.display_name || 'Untitled Work'}
            </h3>
            <div className="text-sm text-gray-600">
              {work.publication_year && (
                <span className="mr-2">{work.publication_year}</span>
              )}
              {work.primary_location?.source?.display_name && (
                <span className="italic">{work.primary_location.source.display_name}</span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 