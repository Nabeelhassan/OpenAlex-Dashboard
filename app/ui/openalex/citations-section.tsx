import Image from 'next/image';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { formatCompactNumber } from '@/app/lib/utils';
import { Button } from '@/components/ui/button';

export default function CitationsSection({
  cited_by_count,
  referenced_works_count,
}: {
  cited_by_count: number;
  referenced_works_count: number;
}) {
  return (
    <div className="flex flex-col items-center md:flex-row md:gap-2">
      <Button variant={'secondary'}>
        <Image
          src={`/quote.svg`}
          height={16}
          width={16}
          alt={'citations icon'}
          className="mr-2"
        />
        Formatted Citation
      </Button>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="flex items-center space-x-2">
              <div className="rounded-lg bg-blue-400 p-2">
                <Image
                  src={`/quote.svg`}
                  height={16}
                  width={16}
                  alt={'citations icon'}
                />
              </div>
              <span className="text-black-500 text-sm font-semibold">
                {formatCompactNumber(cited_by_count)}
              </span>
              <span className="text-sm text-gray-500">Citations</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <span className="text-sm">{cited_by_count}</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="flex items-center space-x-2">
              <div className="rounded-lg bg-blue-400 p-2">
                <Image
                  src={`/asterisk.svg`}
                  height={16}
                  width={16}
                  alt={'citations icon'}
                  className="text-white"
                />
              </div>
              <span className="text-black-500 text-sm font-semibold">
                {formatCompactNumber(referenced_works_count)}
              </span>
              <span className="text-sm text-gray-500">References</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <span className="text-sm">{referenced_works_count}</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
