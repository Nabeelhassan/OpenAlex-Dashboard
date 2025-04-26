'use client';

import { useState } from 'react';
import { BuildingLibraryIcon, MapPinIcon, TagIcon, CalendarIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface Institution {
  id: string;
  display_name: string;
  type?: string;
  country_code?: string;
  works_count?: number;
}

interface Affiliation {
  institution: Institution;
  years: string[];
}

interface AffiliationsSectionProps {
  affiliations: Affiliation[];
}

export default function AffiliationsSection({ affiliations }: AffiliationsSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!affiliations || affiliations.length === 0) {
    return null;
  }

  return (
    <Card className="col-span-full md:col-span-1">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold">
              Affiliations
            </CardTitle>
            <CollapsibleTrigger asChild>
              <button className="rounded-full p-1 hover:bg-gray-100">
                <ChevronDownIcon
                  className={`h-5 w-5 text-gray-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
                />
              </button>
            </CollapsibleTrigger>
          </div>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className="pt-0">
            <ul className="space-y-3">
              {affiliations.map((affiliation, index) => {
                // Extract ID from URL if needed
                const { institution, years } = affiliation;
                const id = typeof institution.id === 'string'
                  ? institution.id.replace('https://openalex.org/', '')
                  : institution.id;

                return (
                  <div
                    key={index}
                    className="flex items-start p-3 border border-gray-100 rounded-lg hover:bg-gray-50"
                  >
                    <BuildingLibraryIcon className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium">
                        {institution?.display_name || 'Unknown Institution'}
                      </h3>
                      <div className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                        {institution?.country_code && (
                          <div className="flex items-center">
                            <MapPinIcon className="h-4 w-4 mr-1" />
                            {institution.country_code}
                          </div>
                        )}

                        {institution?.type && (
                          <div className="flex items-center">
                            <TagIcon className="h-4 w-4 mr-1" />
                            {institution.type}
                          </div>
                        )}
                      </div>
                      {years && (
                        <div className="text-sm text-gray-600 mt-1 flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          {Array.isArray(years) ? years.join(', ') : years}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </ul>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
} 