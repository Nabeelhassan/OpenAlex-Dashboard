'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ReactNode } from 'react';

interface YearlyCount {
  year: number;
  works_count: number;
  cited_by_count: number;
}

interface SourceMetricsProps {
  counts_by_year: YearlyCount[];
  h_index: number;
  i10_index: number;
  two_year_mean_citedness: number;
}

export default function SourceMetrics({
  counts_by_year,
  h_index,
  i10_index,
  two_year_mean_citedness,
}: SourceMetricsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <MetricCard
        title="Publication and Citation Trends"
        description="Publications and citations by year"
      >
        <div className="h-80">
          {/* In a real implementation, this would be an ECharts component */}
          <div className="flex items-center justify-center h-full bg-gray-50 border border-dashed border-gray-300 rounded-md">
            <p className="text-gray-500">Publication and Citation Trend Chart</p>
          </div>
        </div>
      </MetricCard>
      
      <div className="space-y-6">
        <MetricCard title="Citation Metrics" description="Key citation indicators">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-500">h-index</p>
              <p className="mt-1 text-2xl font-semibold">{h_index}</p>
              <p className="text-xs text-gray-500 mt-1">
                {h_index} publications with at least {h_index} citations each
              </p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-500">i10-index</p>
              <p className="mt-1 text-2xl font-semibold">{i10_index}</p>
              <p className="text-xs text-gray-500 mt-1">
                Publications with at least 10 citations
              </p>
            </div>
          </div>
        </MetricCard>
        
        <MetricCard title="Impact Metrics" description="Citation impact">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-500">2-Year Mean Citedness</p>
            <p className="mt-1 text-2xl font-semibold">{two_year_mean_citedness.toFixed(2)}</p>
            <p className="text-xs text-gray-500 mt-1">
              Similar to impact factor
            </p>
          </div>
        </MetricCard>
      </div>
    </div>
  );
}

function MetricCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
} 