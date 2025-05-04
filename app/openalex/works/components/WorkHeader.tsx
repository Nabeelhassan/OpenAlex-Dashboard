'use client';

import { Calendar, ExternalLink, FileText } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import { lusitana } from '@/app/ui/fonts';

import { Badge } from '@/components/ui/badge';

interface WorkHeaderProps {
  id: string;
  title: string;
  display_name: string;
  publication_year: number;
  publication_date: string;
  doi?: string;
  type?: string;
  is_oa?: boolean;
}

export function WorkHeader({
  id,
  title,
  display_name,
  publication_year,
  publication_date,
  doi,
  type = 'article',
  is_oa = false,
}: WorkHeaderProps) {
  const formattedDate = new Date(publication_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center">
        <Badge className="bg-blue-600 hover:bg-blue-700">{type}</Badge>
        {is_oa && (
          <>
            <Badge variant="outline" className="border-green-600 text-green-600">
              Open Access
            </Badge>

            <Image
              src="/open-access.svg"
              width={96}
              height={48}
              className="md:block"
              alt="open access icon"
            />
          </>
        )}
      </div>

      <h1 className={`text-3xl md:text-4xl font-bold text-gray-900 ${lusitana.className}`}>
        {display_name || title}
      </h1>

      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          <span>{formattedDate}</span>
        </div>

        {doi && (
          <Link
            href={doi.startsWith('https://') ? doi : `https://doi.org/${doi.replace('https://doi.org/', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-600 hover:underline"
          >
            <ExternalLink className="h-4 w-4" />
            <span>DOI: {doi.replace('https://doi.org/', '')}</span>
          </Link>
        )}

        <Link
          href={`https://openalex.org/${id.replace('https://openalex.org/', '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-blue-600 hover:underline"
        >
          <ExternalLink className="h-4 w-4" />
          <span>View on OpenAlex</span>
        </Link>
      </div>
    </div>
  );
} 