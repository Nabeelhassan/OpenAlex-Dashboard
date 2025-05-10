import { Funder } from '@/app/lib/openalex/funders';
import { FunderCard } from './FunderCard';

interface FundersGridProps {
  funders: Funder[];
}

export function FundersGrid({ funders }: FundersGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {funders.map((funder) => (
        <FunderCard key={funder.id} funder={funder} />
      ))}
    </div>
  );
}
