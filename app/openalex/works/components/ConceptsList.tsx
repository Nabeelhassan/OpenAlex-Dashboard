'use client';

import { Badge } from '@/components/ui/badge';
import { HashIcon, TagIcon } from 'lucide-react';
import Link from 'next/link';

interface Concept {
  id: string;
  wikidata?: string;
  display_name: string;
  level: number;
  score: number;
}

interface Keyword {
  id: string;
  display_name: string;
  score: number;
}

interface ConceptsListProps {
  concepts?: Concept[];
  keywords?: Keyword[];
}

function getLevelColor(level: number) {
  switch (level) {
    case 0: return 'bg-red-100 text-red-800 hover:bg-red-200 border-red-200';
    case 1: return 'bg-orange-100 text-orange-800 hover:bg-orange-200 border-orange-200';
    case 2: return 'bg-green-100 text-green-800 hover:bg-green-200 border-green-200';
    case 3: return 'bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200';
    default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200';
  }
}

export function ConceptsList({ concepts = [], keywords = [] }: ConceptsListProps) {
  if (!concepts.length && !keywords.length) return null;

  const sortedConcepts = [...concepts].sort((a, b) => b.score - a.score);

  return (
    <div className="space-y-4">
      {sortedConcepts.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <HashIcon className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Concepts</h2>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {sortedConcepts.map((concept) => (
              <Link 
                key={concept.id} 
                href={`/openalex/concepts/${concept.id.replace('https://openalex.org/', '')}`}
              >
                <Badge
                  variant="outline"
                  className={`cursor-pointer ${getLevelColor(concept.level)}`}
                >
                  {concept.display_name}
                  <span className="ml-1 opacity-70">
                    ({Math.round(concept.score * 100)}%)
                  </span>
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      )}
      
      {keywords.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TagIcon className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Keywords</h2>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {keywords.map((keyword) => (
              <Badge
                key={keyword.id}
                variant="outline"
                className="bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200"
              >
                {keyword.display_name}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 