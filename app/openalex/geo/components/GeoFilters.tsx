'use client';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CONTINENTS = [
  { id: 'africa', name: 'Africa' },
  { id: 'asia', name: 'Asia' },
  { id: 'europe', name: 'Europe' },
  { id: 'north_america', name: 'North America' },
  { id: 'south_america', name: 'South America' },
  { id: 'oceania', name: 'Oceania' },
];

export function GeoFilters() {
  return (
    <div className="mb-4 p-4 border rounded-lg space-y-4">
      <h2 className="font-semibold">Filters</h2>
      
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select continent" />
        </SelectTrigger>
        <SelectContent>
          {CONTINENTS.map((continent) => (
            <SelectItem key={continent.id} value={continent.id}>
              {continent.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button variant="outline" className="w-full">
        Toggle Global South
      </Button>
    </div>
  );
} 