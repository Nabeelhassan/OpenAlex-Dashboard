'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Building2, ExternalLink, GraduationCap, Users } from 'lucide-react';
import Link from 'next/link';

interface Institution {
  id: string;
  display_name: string;
  country_code?: string;
  type?: string;
}

interface Author {
  author_position: string;
  is_corresponding: boolean;
  author: {
    id: string;
    display_name: string;
    orcid?: string;
  };
  institutions: Institution[];
  countries?: string[];
}

interface AuthorsListProps {
  authorships: Author[];
}

export function AuthorsList({ authorships }: AuthorsListProps) {
  if (!authorships?.length) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Users className="h-5 w-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Authors</h2>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {authorships.map((authorship, index) => (
          <HoverCard key={`${authorship.author.id}-${index}`}>
            <HoverCardTrigger asChild>
              <div 
                className={`
                  cursor-pointer rounded-full px-3 py-1 text-sm 
                  ${authorship.is_corresponding 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }
                  ${authorship.author_position === 'first' ? 'font-semibold' : ''}
                `}
              >
                {authorship.author.display_name}
                {authorship.is_corresponding && ' *'}
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex justify-between space-x-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-blue-100 text-blue-900">
                        {authorship.author.display_name
                          .split(' ')
                          .map((name) => name[0])
                          .join('')
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <h4 className="text-sm font-semibold">{authorship.author.display_name}</h4>
                  </div>
                  
                  {authorship.institutions?.length > 0 && (
                    <div className="space-y-1 pt-2">
                      <h5 className="text-xs text-gray-500 flex items-center">
                        <Building2 className="h-3 w-3 mr-1" />
                        Affiliations
                      </h5>
                      <div className="space-y-1">
                        {authorship.institutions.map((institution, idx) => (
                          <div key={`${institution.id}-${idx}`} className="text-xs flex items-start">
                            <div className="min-w-3 mt-0.5 mr-1">•</div>
                            <div>
                              <span>{institution.display_name}</span>
                              {institution.country_code && (
                                <span className="text-gray-500 ml-1">
                                  ({institution.country_code})
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-3 flex justify-end">
                <Link
                  href={`/openalex/authors/${authorship.author.id.replace('https://openalex.org/', '')}`}
                  className="text-xs text-blue-600 hover:underline flex items-center"
                >
                  <span>Details</span>
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Link>
              </div>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
      
      {authorships.some(a => a.is_corresponding) && (
        <div className="text-xs text-gray-500 mt-1">
          * Corresponding author
        </div>
      )}
    </div>
  );
} 