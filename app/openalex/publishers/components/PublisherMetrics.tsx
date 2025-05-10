import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PublisherMetricsProps {
  metrics: {
    year: number;
    works_count: number;
    cited_by_count: number;
    h_index?: number;
  }[];
}

export function PublisherMetrics({ metrics }: PublisherMetricsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Metrics Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={metrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="works_count" stroke="#8884d8" name="Works" />
              <Line type="monotone" dataKey="cited_by_count" stroke="#82ca9d" name="Citations" />
              {metrics.some(m => m.h_index) && (
                <Line type="monotone" dataKey="h_index" stroke="#ffc658" name="h-index" />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}