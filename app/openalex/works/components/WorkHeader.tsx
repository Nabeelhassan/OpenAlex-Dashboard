'use client';

import { Calendar, ExternalLink, FileText, Search, BookOpenText, NotebookText, Tag, NotebookPen } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import { Biblio, Location, OpenAccess } from '@/app/lib/work';
import { OA_STATUS_COLOURS, OA_STATUS_TOOLTIPS, capitalize } from '@/app/lib/utils';
import { lusitana } from '@/app/ui/fonts';

import { Badge } from '@/components/ui/badge';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

interface WorkHeaderProps {
  id: string;
  title: string;
  display_name: string;
  publication_year: number;
  publication_date: string;
  doi?: string;
  type?: string;
  open_access: OpenAccess;
  biblio?: Biblio;
  primary_location?: Location
}

export function WorkHeader({
  id,
  title,
  display_name,
  publication_year,
  publication_date,
  doi,
  type = 'article',
  open_access,
  biblio,
  primary_location
}: WorkHeaderProps) {
  const formattedDate = new Date(publication_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="space-y-4">
      {/* Work Type and Open Access Section */}
      <div className="flex flex-wrap gap-2 items-center">
        <Badge className="bg-blue-600 hover:bg-blue-700">{type}</Badge>
        {open_access.is_oa && (
          <>
            <Image
              src="/open-access.svg"
              width={96}
              height={48}
              className="md:block"
              alt="open access icon"
            />
            {open_access?.oa_status && (
              <HoverCard>
                <HoverCardTrigger>
                  {' '}
                  <Badge
                    className="cursor-pointer text-black"
                    style={{
                      backgroundColor: `#${OA_STATUS_COLOURS[open_access?.oa_status]}`,
                    }}
                  >
                    {capitalize(open_access?.oa_status)}
                  </Badge>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <p className="text-sm text-gray-500">
                    {OA_STATUS_TOOLTIPS[open_access?.oa_status]}
                  </p>
                </HoverCardContent>
              </HoverCard>
            )}
          </>
        )}
      </div>

      {/*  Title Section */}
      <h1 className={`text-3xl md:text-4xl font-bold text-gray-900 ${lusitana.className}`}>
        {display_name || title}
      </h1>

      {/* Meta Data Section */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          <span>{formattedDate}</span>
        </div>

        {primary_location?.source?.display_name && (
          <div className="flex items-center gap-1" title="Journal">
            <NotebookPen className="h-4 w-4" />
            <span>{primary_location.source.display_name}</span>
          </div>
        )}

        {biblio?.volume && (
          <div className="flex items-center gap-1" title="Volume">
            <Tag className="h-4 w-4" />
            <span>{biblio.volume}</span>
          </div>
        )}

        {biblio?.issue && (
          <div className="flex items-center gap-1" title="Issue">
            <NotebookText className="h-4 w-4" />
            <span>{biblio.issue}</span>
          </div>
        )}

        {biblio?.first_page && (
          <div className="flex items-center gap-1" title="Pages">
            <BookOpenText className="h-4 w-4" />
            <span>
              {biblio.first_page}
              {biblio.last_page &&
                biblio.last_page !== biblio.first_page &&
                '-' + biblio.last_page}
            </span>
          </div>
        )}

        {/* View DOI */}
        {doi && (
          <Link
            href={doi.startsWith('https://') ? doi : `https://doi.org/${doi.replace('https://doi.org/', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-600 hover:underline"
          >
            <ExternalLink className="h-4 w-4" />
            <span title="View DOI">DOI: {doi.replace('https://doi.org/', '')}</span>
          </Link>
        )}

        {/*  View on OpenAlex */}
        <Link
          href={`https://openalex.org/${id.replace('https://openalex.org/', '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-blue-600 hover:underline"
        >
          <ExternalLink className="h-4 w-4" />
          <span title="View on OpenAlex">OpenAlex</span>
        </Link>

        {/*  Search on Google Scholar */}
        <Link
          href={`https://scholar.google.com/scholar?q=${encodeURIComponent(display_name)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-blue-600 hover:underline"
        >
          <Search className="h-4 w-4" />
          <span title="Search on Google Scholar">Google Scholar</span>
        </Link>

        {/*  Download PDF */}
        {primary_location?.pdf_url && (
          <Link
            href={primary_location.pdf_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-600 hover:underline"
          >
            <FileText className="h-4 w-4" />
            <span title="Dowmload PDF">PDF</span>
          </Link>
        )}
      </div>
    </div>
  );
} 