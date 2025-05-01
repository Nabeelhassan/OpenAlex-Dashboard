import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Library } from 'lucide-react';
import { formatCompactNumber } from '@/app/lib/utils';

interface PublisherSourcesListProps {
  sources: Array<{
    id: string;
    display_name: string;
    works_count: number;
    cited_by_count: number;
    type?: string;
  }>;
}

export function PublisherSourcesList({ sources }: PublisherSourcesListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Library className="mr-2 h-5 w-5" />
          Sources Published
        </CardTitle>
      </CardHeader>
      <CardContent>
        {sources.length > 0 ? (
          <ul className="space-y-4">
            {sources.map((source) => (
              <li key={source.id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                <Link href={`/openalex/sources/${source.id}`} className="hover:text-blue-600">
                  <h3 className="font-medium">{source.display_name}</h3>
                </Link>
                <div className="flex flex-wrap gap-x-4 gap-y-2 mt-1 text-sm text-gray-600">
                  {source.type && <div className="capitalize">{source.type}</div>}
                  <div>{formatCompactNumber(source.works_count)} works</div>
                  <div>{formatCompactNumber(source.cited_by_count)} citations</div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-500 text-center py-4">No sources found</div>
        )}
      </CardContent>
    </Card>
  );
}
