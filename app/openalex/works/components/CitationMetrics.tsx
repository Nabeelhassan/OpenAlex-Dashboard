'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUpIcon } from 'lucide-react';

interface YearCount {
  year: number;
  cited_by_count: number;
}

interface CitationMetricsProps {
  counts_by_year: YearCount[];
  total_citations?: number;
}

export function CitationMetrics({ counts_by_year = [], total_citations = 0 }: CitationMetricsProps) {
  if (!counts_by_year.length) return null;
  
  // Sort by year ascending for the chart
  const chartData = [...counts_by_year]
    .sort((a, b) => a.year - b.year)
    .map(item => ({
      year: item.year,
      citations: item.cited_by_count
    }));
  
  // Calculate total if not provided
  const calculatedTotal = counts_by_year.reduce((sum, item) => sum + item.cited_by_count, 0);
  const displayTotal = total_citations || calculatedTotal;
  
  // Calculate yearly stats
  const currentYear = new Date().getFullYear();
  const lastYearData = counts_by_year.find(item => item.year === currentYear - 1);
  const thisYearData = counts_by_year.find(item => item.year === currentYear);
  
  const citationsLastYear = lastYearData?.cited_by_count || 0;
  const citationsThisYear = thisYearData?.cited_by_count || 0;
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <TrendingUpIcon className="h-5 w-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Citation Metrics</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">Total Citations</div>
          <div className="text-3xl font-bold text-gray-900">{displayTotal}</div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">Citations in {currentYear - 1}</div>
          <div className="text-3xl font-bold text-gray-900">{citationsLastYear}</div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">Citations in {currentYear}</div>
          <div className="text-3xl font-bold text-gray-900">{citationsThisYear}</div>
        </div>
      </div>
      
      <div className="h-60 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 5, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="year" 
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: '#f0f0f0' }}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: '#f0f0f0' }}
            />
            <Tooltip 
              formatter={(value) => [`${value} citations`, 'Citations']}
              labelFormatter={(label) => `Year: ${label}`}
            />
            <Line
              type="monotone"
              dataKey="citations"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: '#3b82f6', r: 4 }}
              activeDot={{ r: 6, fill: '#1d4ed8' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 