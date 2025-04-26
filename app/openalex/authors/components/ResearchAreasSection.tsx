'use client';

import { AcademicCapIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Link from 'next/link';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';
import { useState } from 'react';

interface Concept {
  id: string;
  display_name: string;
  level?: number;
  score?: number;
  wikidata?: string;
}

interface ResearchAreasSectionProps {
  concepts: Concept[];
}

export default function ResearchAreasSection({ concepts }: ResearchAreasSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!concepts || concepts.length === 0) {
    return null;
  }

  // Group concepts by level
  const conceptsByLevel = concepts.reduce((groups: { [key: string]: Concept[] }, concept) => {
    let level = concept.level?.toString() || 'unknown';
    if (parseInt(level) > 2) {
      level = '2';
    }
    if (!groups[level]) {
      groups[level] = [];
    }
    groups[level].push(concept);
    return groups;
  }, {});

  // Prepare data for pie chart - take top concepts and ensure they have valid scores
  const topConcepts = [...concepts]
    .filter(concept => concept.score !== undefined && concept.score > 0) // Only include concepts with valid scores
    .sort((a, b) => (b.score || 0) - (a.score || 0))
    .slice(0, 6); // Limit to top 6 for better visualization

  // Format data for echarts pie chart
  const pieChartData = topConcepts.map(concept => ({
    name: concept.display_name,
    value: concept.score || 0,
    id: concept.id
  }));

  // Colors for pie chart segments
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#A5D8D6'];

  // ECharts option configuration
  const echartsOption: EChartsOption = {
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        const { name, value } = params;
        return `<div style="font-size:12px">
                  <div style="font-weight:bold">${name}</div>
                  <div>Score: ${value.toFixed(3)}</div>
                </div>`;
      }
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center',
      textStyle: {
        fontSize: 12
      }
    },
    series: [
      {
        name: 'Concepts',
        type: 'pie',
        radius: '65%',
        center: ['40%', '50%'],
        data: pieChartData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        label: {
          show: true
        },
        labelLine: {
          show: false
        },
        itemStyle: {
          color: (params: any) => {
            return COLORS[params.dataIndex % COLORS.length];
          }
        }
      }
    ]
  };

  return (
    <Card className="col-span-full md:col-span-1">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-medium flex items-center">
              <AcademicCapIcon className="h-5 w-5 mr-2 text-gray-500" />
              Research Areas
            </CardTitle>
            <CollapsibleTrigger asChild>
              <button className="rounded-full p-1 hover:bg-gray-100">
                <ChevronDownIcon
                  className={`h-5 w-5 text-gray-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
                />
              </button>
            </CollapsibleTrigger>
          </div>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className="pt-0">
            {Object.entries(conceptsByLevel).map(([level, levelConcepts]) => (
              <div key={level} className="mb-4 last:mb-0">
                {level !== 'unknown' && (
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    {level === '0' ? 'Domains' : level === '1' ? 'Fields' : 'Subfields'}
                  </h4>
                )}
                <div className="flex flex-wrap gap-2">
                  {levelConcepts.map(concept => {
                    // Extract ID from URL if needed
                    const id = typeof concept.id === 'string'
                      ? concept.id.replace('https://openalex.org/', '')
                      : concept.id;

                    const opacity = concept.score
                      ? Math.max(0.5, Math.min(1, concept.score))
                      : 0.8;

                    return (
                      <Link
                        key={id}
                        href={`/openalex/concepts/${id}`}
                        className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200"
                        style={{ opacity }}
                      >
                        {concept.display_name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Pie chart for top concepts distribution */}
            {pieChartData.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Top Concepts Distribution</h4>
                <div className="h-72 w-full">
                  <ReactECharts
                    option={echartsOption}
                    style={{ height: '100%', width: '100%' }}
                    opts={{ renderer: 'svg' }}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
} 