'use client';

import { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import { BarChart, LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DataZoomComponent,
  LegendComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Register the required components
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DataZoomComponent,
  LegendComponent,
  BarChart,
  LineChart,
  CanvasRenderer,
]);

interface YearlyCount {
  year: number;
  works_count: number;
  cited_by_count: number;
}

interface TopicTrendChartProps {
  counts_by_year: YearlyCount[];
  title?: string;
}

export default function TopicTrendChart({ counts_by_year, title = 'Publication Trends' }: TopicTrendChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Return early if no data or DOM element
    if (!counts_by_year?.length || !chartRef.current) {
      return;
    }

    // Sort data chronologically
    const sortedData = [...counts_by_year].sort((a, b) => a.year - b.year);

    // Create chart
    const chart = echarts.init(chartRef.current);

    // Extract years for X-axis
    const years = sortedData.map(item => item.year);
    
    // Extract publication counts
    const publicationCounts = sortedData.map(item => item.works_count);
    
    // Extract citation counts
    const citationCounts = sortedData.map(item => item.cited_by_count);

    // Set chart options
    const option = {
      title: {
        text: title,
        left: 'center',
        textStyle: {
          fontWeight: 'normal',
          fontSize: 16,
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        formatter: function (params: any) {
          const year = params[0].axisValue;
          const publications = params[0].data;
          const citations = params[1]?.data;
          
          let html = `<div style="font-weight: bold; margin-bottom: 5px;">${year}</div>`;
          html += `<div style="display: flex; align-items: center; gap: 5px; margin-bottom: 3px;">
                    <span style="display: inline-block; width: 10px; height: 10px; background: #3b82f6; border-radius: 50%;"></span>
                    <span>Publications: ${publications.toLocaleString()}</span>
                  </div>`;
          
          if (citations !== undefined) {
            html += `<div style="display: flex; align-items: center; gap: 5px;">
                      <span style="display: inline-block; width: 10px; height: 10px; background: #f97316; border-radius: 50%;"></span>
                      <span>Citations: ${citations.toLocaleString()}</span>
                    </div>`;
          }
          
          return html;
        }
      },
      legend: {
        data: ['Publications', 'Citations'],
        bottom: 0,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        top: '15%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: years,
        name: 'Year',
        nameLocation: 'middle',
        nameGap: 30,
        axisLabel: {
          rotate: 45,
        },
      },
      yAxis: [
        {
          type: 'value',
          name: 'Publications',
          position: 'left',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#3b82f6',
            },
          },
          axisLabel: {
            formatter: (value: number) => {
              if (value >= 1000000) {
                return (value / 1000000).toFixed(1) + 'M';
              } else if (value >= 1000) {
                return (value / 1000).toFixed(1) + 'K';
              }
              return value;
            },
          },
        },
        {
          type: 'value',
          name: 'Citations',
          position: 'right',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#f97316',
            },
          },
          axisLabel: {
            formatter: (value: number) => {
              if (value >= 1000000) {
                return (value / 1000000).toFixed(1) + 'M';
              } else if (value >= 1000) {
                return (value / 1000).toFixed(1) + 'K';
              }
              return value;
            },
          },
        },
      ],
      series: [
        {
          name: 'Publications',
          type: 'bar',
          data: publicationCounts,
          yAxisIndex: 0,
          itemStyle: {
            color: '#3b82f6',
          },
        },
        {
          name: 'Citations',
          type: 'line',
          data: citationCounts,
          yAxisIndex: 1,
          itemStyle: {
            color: '#f97316',
          },
          lineStyle: {
            width: 3,
          },
          symbol: 'circle',
          symbolSize: 8,
        },
      ],
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100,
        },
        {
          start: 0,
          end: 100,
        },
      ],
    };

    // Set the chart options
    chart.setOption(option);

    // Handle resize
    const handleResize = () => {
      chart.resize();
    };
    window.addEventListener('resize', handleResize);

    // Clean up the chart and event listener on component unmount
    return () => {
      chart.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, [counts_by_year, title]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
      </CardContent>
    </Card>
  );
} 