'use client';
import { useEffect, useState } from 'react';
import { registerMap } from 'echarts';

import ReactECharts from 'echarts-for-react';
import { getGeoRegions } from '@/app/lib/openalex/geo';
import worldGeoJSON from '@/public/world.json';

registerMap('world', worldGeoJSON as any);

interface GeoData {
  key: string; // Country code (e.g., "US")
  key_display_name: string;
  count: number; // Research output count
}

export function WorldMap() {
  const [geoData, setGeoData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getGeoRegions();
      const formattedData = data.group_by.map((item: GeoData) => ({
        name: item.key_display_name,
        value: item.count,
      }));
      setGeoData(formattedData);
    };
    fetchData();
  }, []);

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} publications',
    },
    visualMap: {
      min: 0,
      max: Math.max(...geoData.map((item) => item.value) , 1) || 1000,
      text: ['High', 'Low'],
      inRange: {
        color: ['#e0f2fe', '#0369a1'],
      },
      calculable: true, // Add this for better gradient handling

    },
    series: [
      {
        name: 'Research Output',
        type: 'map',
        map: 'world',
        data: geoData,
        emphasis: {
          label: { show: true },
        },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: '500px', width: '100%' }} />;
}
