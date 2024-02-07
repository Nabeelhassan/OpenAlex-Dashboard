import Link from 'next/link';
import Image from 'next/image';

import { extractIdentifier } from '@/app/lib/utils';
import { IDS } from '@/app/lib/work';

export default function IdentifiersSection({
  identifiers,
  iconSize = 16,
}: {
  identifiers: IDS;
  iconSize?: number;
}) {
  const sources = Object.entries(identifiers).map((identifier) => {
    const [source, url] = identifier;
    const id: string = extractIdentifier(source, url);

    return {
      source,
      id,
      url,
    };
  });

  return (
    /* identifiers */
    <div className="flex flex-row flex-wrap pb-2 md:items-center">
      <span className="mr-2 text-xs font-semibold underline md:text-sm">
        Identifiers:
      </span>

      {sources.map((source, index) => (
        <Link
          href={source.url}
          target="_blank"
          key={index}
          className="flex items-center gap-2"
        >
          <Image
            src={`/${source.source}.svg`}
            width={iconSize}
            height={iconSize}
            alt={`${source.source} logo`}
          />
          <span className="mr-2 text-center text-xs md:text-sm">
            {source.id}
          </span>
        </Link>
      ))}
    </div>
  );
}
