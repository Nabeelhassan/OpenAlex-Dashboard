import Link from 'next/link';
import { Funder } from '@/app/lib/openalex/funders';
import { Building, MapPin } from 'lucide-react';

interface FunderCardProps {
  funder: Funder;
}

export function FunderCard({ funder }: FunderCardProps) {
  return (
    <Link href={`/openalex/funders/${funder.id}`} className="block border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        {/* Placeholder for logo (replace with actual image logic) */}
        <div className="bg-gray-100 rounded-md p-2">
          <Building className="h-6 w-6 text-gray-500" />
        </div>
        <div>
          <h3 className="font-semibold">{funder.display_name}</h3>
          <div className="text-sm text-gray-600 mt-1">
            {funder.country_code && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {funder.country_code}
              </span>
            )}
            <span> · {funder.works_count.toLocaleString()} works funded</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
