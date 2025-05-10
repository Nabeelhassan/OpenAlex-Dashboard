import { Topic } from '@/app/lib/openalex/topics';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PuzzlePieceIcon } from '@heroicons/react/24/outline';

interface TopicDetailProps {
  topic: Topic;
}

export default function TopicDetail({ topic }: TopicDetailProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About This Topic</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topic.description && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
              <p className="text-sm text-gray-900">{topic.description}</p>
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Domain</h3>
              <div className="flex items-center gap-2">
                <PuzzlePieceIcon className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-gray-900">{topic.domain.display_name}</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Field</h3>
              <Badge variant="outline" className="font-normal">
                {topic.field.display_name}
              </Badge>
            </div>
            
            {topic.subfield && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Subfield</h3>
                <Badge variant="outline" className="font-normal">
                  {topic.subfield.display_name}
                </Badge>
              </div>
            )}
            
            {topic.wikidata_id && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Wikidata</h3>
                <a 
                  href={`https://www.wikidata.org/wiki/${topic.wikidata_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  {topic.wikidata_id}
                </a>
              </div>
            )}
          </div>
          
          {topic.summary_stats && (
            <div className="pt-2 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Impact Metrics</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-500">h-index</p>
                  <p className="font-semibold">{topic.summary_stats.h_index}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">i10-index</p>
                  <p className="font-semibold">{topic.summary_stats.i10_index}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">2y Mean Cited</p>
                  <p className="font-semibold">
                    {topic.summary_stats.two_yr_mean_citedness?.toFixed(2) || '0.00'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 