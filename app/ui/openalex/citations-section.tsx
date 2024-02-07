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
    <div className="flex flex-row items-center gap-2">
      <Button variant={'secondary'} className="hidden">
        <Image
          src={`/quote.svg`}
          height={12}
          width={12}
          alt={'citations icon'}
          className="mr-2"
        />
        Formatted Citation
      </Button>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="flex items-center space-x-2">
              <div className="rounded-lg bg-blue-400 p-1 md:p-2">
                <Image
                  src={`/quote.svg`}
                  height={12}
                  width={12}
                  alt={'citations icon'}
                />
              </div>
              <span className="text-black-500 text-xs font-semibold md:text-sm">
                {formatCompactNumber(cited_by_count)}
              </span>
              <span className="text-xs text-gray-500 md:text-sm">
                Citations
              </span>
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
              <div className="rounded-lg bg-blue-400 p-1 md:p-2">
                <Image
                  src={`/asterisk.svg`}
                  height={12}
                  width={12}
                  alt={'citations icon'}
                  className="text-white"
                />
              </div>
              <span className="text-black-500 text-xs font-semibold md:text-sm">
                {formatCompactNumber(referenced_works_count)}
              </span>
              <span className="text-xs text-gray-500 md:text-sm">
                References
              </span>
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
