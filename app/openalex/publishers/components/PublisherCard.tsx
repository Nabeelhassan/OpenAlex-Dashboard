import Link from 'next/link';
import Image from 'next/image';
import { BuildingLibraryIcon } from '@heroicons/react/24/outline';
import { getCountryNameFromCode } from '@/app/lib/countries';

interface PublisherCardProps {
  id: string;
  display_name: string;
  country_code?: string;
  works_count: number;
  cited_by_count: number;
  type?: string;
  sources_count?: number;
  image_url?: string;
}

export default function PublisherCard({
  id,
  display_name,
  country_code,
  works_count,
  cited_by_count,
  type,
  sources_count,
  image_url
}: PublisherCardProps) {
  // Extract OpenAlex ID from the full ID
  const openAlexId = id.split('/').pop() || '';
  
  // Format numbers with commas
  const formattedWorksCount = works_count.toLocaleString();
  const formattedCitedByCount = cited_by_count.toLocaleString();
  const formattedSourcesCount = sources_count ? sources_count.toLocaleString() : 'N/A';
  
  // Get country name from country code
  const countryName = country_code ? getCountryNameFromCode(country_code) : null;
  
  // Format publisher type for display
  const formattedType = type ? type.charAt(0).toUpperCase() + type.slice(1) : 'Publisher';

  return (
    <Link 
      href={`/openalex/publishers/${openAlexId}`}
      className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition duration-200 flex flex-col h-full"
    >
      <div className="flex items-center gap-3 mb-3">
        {image_url ? (
          <div className="relative h-12 w-12 flex-shrink-0">
            <Image
              src={image_url}
              alt={display_name}
              fill
              className="object-contain rounded-md"
            />
          </div>
        ) : (
          <div className="h-12 w-12 flex-shrink-0 bg-blue-100 rounded-md flex items-center justify-center">
            <BuildingLibraryIcon className="h-6 w-6 text-blue-600" />
          </div>
        )}
        
        <div>
          <h3 className="font-medium text-lg text-gray-900 line-clamp-2 leading-tight">
            {display_name}
          </h3>
          <p className="text-sm text-gray-500">
            {formattedType}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mt-auto pt-3 border-t border-gray-100">
        <div>
          <p className="text-xs text-gray-500">Works</p>
          <p className="font-medium text-gray-900">{formattedWorksCount}</p>
        </div>
        
        <div>
          <p className="text-xs text-gray-500">Citations</p>
          <p className="font-medium text-gray-900">{formattedCitedByCount}</p>
        </div>
        
        <div>
          <p className="text-xs text-gray-500">Sources</p>
          <p className="font-medium text-gray-900">{formattedSourcesCount}</p>
        </div>
        
        <div>
          <p className="text-xs text-gray-500">Country</p>
          <p className="font-medium text-gray-900">{countryName || 'Unknown'}</p>
        </div>
      </div>
    </Link>
  );
} 