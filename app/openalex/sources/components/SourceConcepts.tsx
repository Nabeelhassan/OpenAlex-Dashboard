'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

interface Concept {
  id: string;
  display_name: string;
  level: number;
  score: number;
}

interface SourceConceptsProps {
  concepts: Concept[];
}

export default function SourceConcepts({ concepts }: SourceConceptsProps) {
  const sortedConcepts = [...concepts].sort((a, b) => b.score - a.score);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Research Areas</CardTitle>
        <CardDescription>Main research areas covered by this source</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-80">
            {/* In a real implementation, this would be an ECharts pie or radar chart */}
            <div className="flex items-center justify-center h-full bg-gray-50 border border-dashed border-gray-300 rounded-md">
              <p className="text-gray-500">Concepts Distribution Chart</p>
            </div>
          </div>
          
          <div className="space-y-3">
            {sortedConcepts.slice(0, 5).map(concept => (
              <div key={concept.id}>
                <div className="flex justify-between items-center">
                  <Link 
                    href={`/openalex/concepts/${concept.id}`}
                    className="text-sm font-medium text-blue-600 hover:underline"
                  >
                    {concept.display_name}
                  </Link>
                  <span className="text-sm text-gray-500">{concept.score.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${concept.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
            
            {sortedConcepts.length > 5 && (
              <Link 
                href="#"
                className="block text-sm text-blue-600 hover:underline mt-2"
              >
                View all {sortedConcepts.length} concepts
              </Link>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 