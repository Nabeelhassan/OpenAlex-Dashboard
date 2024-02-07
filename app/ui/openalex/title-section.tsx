import Link from 'next/link';

import {
  OA_STATUS_COLOURS,
  OA_STATUS_TOOLTIPS,
  capitalize,
} from '@/app/lib/utils';
import { OpenAccess } from '@/app/lib/work';
import { roboto_slab } from '@/app/ui/fonts';
import { Badge } from '@/components/ui/badge';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

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
    <div className="flex items-center gap-2 pb-2">
      <Link
        href={`/openalex/works/${id.replace('https://openalex.org/', '')}`}
        title={title}
      >
        <h1
          className={`${roboto_slab.className} text-md font-bold md:line-clamp-1 md:text-2xl`}
        >
          {title}
        </h1>
      </Link>
      {open_access?.oa_status && (
        <HoverCard>
          <HoverCardTrigger>
            {' '}
            <Badge
              className="pointer-events-none text-black"
              style={{
                backgroundColor: `#${OA_STATUS_COLOURS[open_access.oa_status]}`,
              }}
            >
              {capitalize(open_access?.oa_status)}
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
