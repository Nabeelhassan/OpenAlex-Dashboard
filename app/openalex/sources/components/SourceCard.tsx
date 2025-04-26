import Link from 'next/link';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import { Badge } from '@/components/ui/badge';

interface SourceCardProps {
  id: string;
  display_name: string;
  type: string;
  is_oa: boolean;
  works_count: number;
  cited_by_count: number;
  publisher?: string;
  country_code?: string;
}

export default function SourceCard({
  id,
  display_name,
  type,
  is_oa,
  works_count,
  cited_by_count,
  publisher,
  country_code,
}: SourceCardProps) {
  return (
    <Link
      href={`/openalex/sources/${id}`}
      className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 hover:shadow-md transition duration-200"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <DocumentTextIcon className="h-5 w-5 text-blue-600" />
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            {type}
          </span>
        </div>
        {is_oa && (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Open Access
          </Badge>
        )}
      </div>
      
      <h3 className="text-lg font-semibold mb-2 text-gray-900">{display_name}</h3>
      
      {publisher && (
        <p className="text-sm text-gray-600 mb-2">
          Published by: {publisher}
          {country_code && ` (${country_code})`}
        </p>
      )}
      
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="text-center p-2 bg-gray-50 rounded">
          <p className="text-xs text-gray-500">Publications</p>
          <p className="font-semibold">{works_count.toLocaleString()}</p>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded">
          <p className="text-xs text-gray-500">Citations</p>
          <p className="font-semibold">{cited_by_count.toLocaleString()}</p>
        </div>
      </div>
    </Link>
  );
} 