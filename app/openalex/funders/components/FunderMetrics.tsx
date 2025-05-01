// app/openalex/funders/components/FunderMetrics.tsx
'use client';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface FunderMetricsProps {
  metrics: Array<{
    year: number;
    works_count: number;
    cited_by_count: number;
    grants_count?: number;
  }>;
}

export function FunderMetrics({ metrics }: FunderMetricsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Funding Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={metrics}>
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="works_count" stroke="#8884d8" name="Works Funded" />
              <Line type="monotone" dataKey="cited_by_count" stroke="#82ca9d" name="Citations" />
              {metrics[0]?.grants_count && (
                <Line type="monotone" dataKey="grants_count" stroke="#ffc658" name="Grants" />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}