'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BeakerIcon } from '@heroicons/react/24/outline';

interface WorksByYearChartProps {
  worksByYearCount: Record<string, number>;
}

export default function WorksByYearChart({ worksByYearCount }: WorksByYearChartProps) {
  const years = Object.keys(worksByYearCount).sort();
  const maxCount = Math.max(...Object.values(worksByYearCount), 1);

  if (!years.length) {
    return null;
  }

  return (
    <Card className="col-span-full md:col-span-1">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium flex items-center">
          <BeakerIcon className="h-5 w-5 mr-2 text-gray-500" />
          Works by Year
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
                className="w-full bg-green-500 rounded-t-sm transition-all hover:bg-green-600"
                style={{
                  height: `${(worksByYearCount[year] / maxCount) * 100}%`,
                  minHeight: '1px'
                }}
                title={`${year}: ${worksByYearCount[year]} works`}
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