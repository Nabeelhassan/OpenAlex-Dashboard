import Link from 'next/link';
import { PuzzlePieceIcon } from '@heroicons/react/24/outline';
import { Badge } from '@/components/ui/badge';

interface TopicCardProps {
  id: string;
  display_name: string;
  description?: string;
  works_count: number;
  cited_by_count: number;
  domain?: {
    id: string;
    display_name: string;
  };
  field?: {
    id: string;
    display_name: string;
  };
}

export default function TopicCard({
  id,
  display_name,
  description,
  works_count,
  cited_by_count,
  domain,
  field,
}: TopicCardProps) {
  // Extract the ID part from the full ID string
  const topicId = id.startsWith('@') 
    ? id.substring(1).split('/').pop() 
    : id.includes('/') 
      ? id.split('/').pop() 
      : id;
  
  // Truncate description if too long
  const truncatedDescription = description 
    ? description.length > 150 
      ? description.substring(0, 150) + '...' 
      : description
    : '';
  
  return (
    <Link
      href={`/openalex/topics/${topicId}`}
      className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 hover:shadow-md transition duration-200"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <PuzzlePieceIcon className="h-5 w-5 text-blue-600" />
          {domain && (
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
              {domain.display_name}
            </Badge>
          )}
        </div>
        {field && (
          <Badge variant="outline" className="text-xs">
            {field.display_name}
          </Badge>
        )}
      </div>
      
      <h3 className="text-lg font-semibold mb-2 text-gray-900">{display_name}</h3>
      
      {truncatedDescription && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {truncatedDescription}
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