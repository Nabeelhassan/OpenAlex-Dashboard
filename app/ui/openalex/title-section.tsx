import Link from 'next/link';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

import { OA_STATUS_COLOURS, OA_STATUS_TOOLTIPS } from '@/app/lib/utils';
import { OpenAccess } from '@/app/lib/work';
import { Badge } from '@/components/ui/badge';

import { roboto_slab } from '@/app/ui/fonts';

export default function TitleSection({
  title,
  open_access,
  id,
}: {
  title: string;
  open_access: OpenAccess;
  id: string;
}) {
  return (
    <div className="flex gap-2 py-2">
      <Link
        href={`/openalex/works/${id.replace('https://openalex.org/', '')}`}
        title={title}
      >
        <h1
          className={`${roboto_slab.className} line-clamp-1 text-sm font-bold md:text-2xl`}
        >
          {title}
        </h1>
      </Link>
      {open_access?.oa_status && (
        <HoverCard>
          <HoverCardTrigger>
            {' '}
            <Badge
              className="pointer-events-none"
              style={{
                backgroundColor: `#${OA_STATUS_COLOURS[open_access.oa_status]}`,
              }}
            >
              {open_access?.oa_status}
            </Badge>
          </HoverCardTrigger>
          <HoverCardContent>
            {OA_STATUS_TOOLTIPS[open_access.oa_status]}
          </HoverCardContent>
        </HoverCard>
      )}
    </div>
  );
}
