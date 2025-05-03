import ReactECharts from 'echarts-for-react';

export function FundingTrendChart({ data }: { data: any[] }) {
  const option = {
    xAxis: { type: 'category', data: data.map((d) => d.year) },
    yAxis: { type: 'value' },
    series: [{ data: data.map((d) => d.amount), type: 'line' }],
  };
  return <ReactECharts option={option} />;
} 