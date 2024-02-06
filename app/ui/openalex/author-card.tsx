import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Authorship } from '@/app/lib/work';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

export function AuthorCard({ author }: { author: Authorship }) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          variant="link"
          size={'sm'}
          className={cn('m-0 h-6 p-0', {
            'text-[#A6CE39]': author.author.orcid,
          })}
        >
          {author.raw_author_name}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-160">
        <CardContent author={author}></CardContent>
      </HoverCardContent>
    </HoverCard>
  );
}

export function CardContent({ author }: { author: Authorship }) {
  return (
    <div className="flex justify-between space-x-4">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h4 className={cn('text-md pointer-events-none font-semibold')}>
            {author.raw_author_name}
          </h4>
          {author.author.orcid && (
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href={author.author.orcid} target="_blank">
                      <Image
                        src="/orcid.svg"
                        width="15"
                        height="15"
                        alt="orcid"
                      ></Image>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-80 text-sm">
                      <span className="font-bold">ORCID</span>
                      <span className="italic">
                        &nbsp;(Open Researcher and Contributor ID)&nbsp;
                      </span>
                      is a nonproprietary alphanumeric code to uniquely identify
                      <span className="font-semibold italic">
                        &nbsp;authors&nbsp;
                      </span>
                      and
                      <span className="font-semibold italic">
                        &nbsp;contributors&nbsp;
                      </span>
                      of scholarly communication.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={
                        `https://profiles.impactstory.org/u/` +
                        author.author.orcid.split('/').pop()
                      }
                      target="_blank"
                    >
                      <Image
                        src="/impactstory.png"
                        width="15"
                        height="15"
                        alt="impactstory"
                      ></Image>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-80 text-sm">
                      <span className="font-bold">ImpactStory </span>
                      is an open-source website that helps researchers explore
                      and share the online impact of their research.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          )}
        </div>
        <Affiliation author={author} />
      </div>
    </div>
  );
}

export function Affiliation({ author }: { author: Authorship }) {
  return (
    <div>
      {author.raw_affiliation_strings.map((_affiliation, index) => {
        const currentInstitute = author.institutions[index];
        const country_name = _affiliation.split(',').slice(-1);
        const affiliation = _affiliation.split(',').slice(0, -2);

        const country = currentInstitute?.country_code.toLocaleLowerCase();

        return (
          <div key={index} className="flex flex-col py-2">
            <div className="pointer-events-none flex flex-col">
              {affiliation.map((item, index) => (
                <span
                  className={cn(
                    'text-sm',
                    // {
                    //   'font-bold': index === affiliation.length - 1,
                    // },
                    // {
                    //   italic: index !== affiliation.length - 1,
                    // },
                  )}
                  key={index}
                >
                  {item}
                </span>
              ))}
              {country && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Image
                        src={`https://flagcdn.com/${country}.svg`}
                        height={25}
                        width={25}
                        alt={country}
                        className="mt-2"
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <span className="font-bold">{country_name}</span>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* Problems in affiliation.
1. The institutions array is not 1-1 synced with raw_affiliations_strings array. 
2. raw_affiliations_strings can contain university name in native language, which causes problem as the display_name in 
institutions array is in English.
*/
