'use client';

import { DocumentTextIcon } from '@heroicons/react/24/outline';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

interface Venue {
  id: string;
  display_name: string;
  publisher?: string;
  works_count?: number;
  is_oa?: boolean;
  is_in_doaj?: boolean;
}

interface PublicationVenuesSectionProps {
  venues: Venue[];
}

export default function PublicationVenuesSection({ venues }: PublicationVenuesSectionProps) {
  if (!venues || venues.length === 0) {
    return null;
  }

  // Sort venues by works count if available
  const sortedVenues = [...venues].sort((a, b) => 
    (b.works_count || 0) - (a.works_count || 0)
  );

  return (
    <Card className="col-span-full md:col-span-1">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium flex items-center">
          <DocumentTextIcon className="h-5 w-5 mr-2 text-gray-500" />
          Publication Venues
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ul className="space-y-3">
          {sortedVenues.map((venue, index) => {
            // Extract ID from URL if needed
            const id = typeof venue.id === 'string'
              ? venue.id.replace('https://openalex.org/', '')
              : venue.id;
              
            return (
              <li key={id || index} className="flex items-start">
                <div className="text-sm">
                  <Link 
                    href={`/openalex/venues/${id}`} 
                    className="font-medium text-blue-600 hover:underline"
                  >
                    {venue.display_name}
                  </Link>
                  
                  <div className="flex gap-2 text-xs text-gray-500 mt-0.5">
                    {venue.publisher && (
                      <span>{venue.publisher}</span>
                    )}
                    
                    {venue.works_count !== undefined && (
                      <span>{venue.works_count} works</span>
                    )}
                    
                    {venue.is_oa && (
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Open Access
                      </span>
                    )}
                    
                    {venue.is_in_doaj && (
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        DOAJ
                      </span>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
} 