'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartBarIcon } from '@heroicons/react/24/outline';

interface CitationsByYearChartProps {
  citationsByYear: Record<string, number>;
}

export default function CitationsByYearChart({ citationsByYear }: CitationsByYearChartProps) {
  const years = Object.keys(citationsByYear).sort();
  const maxCount = Math.max(...Object.values(citationsByYear), 1);

  if (!years.length) {
    return null;
  }

  return (
    <Card className="col-span-full md:col-span-1">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium flex items-center">
          <ChartBarIcon className="h-5 w-5 mr-2 text-gray-500" />
          Citations by Year
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-end h-40 gap-1">
          {years.map(year => (
            <div
              key={year}
              className="flex flex-col items-center"
              style={{ width: `${100 / years.length}%`, maxWidth: '40px' }}
            >
              <div
                className="w-full bg-blue-500 rounded-t-sm transition-all hover:bg-blue-600"
                style={{
                  height: `${(citationsByYear[year] / maxCount) * 100}%`,
                  minHeight: '1px'
                }}
                title={`${year}: ${citationsByYear[year]} citations`}
              />
              <div className="text-xs text-gray-600 mt-1 truncate">
                {year}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 