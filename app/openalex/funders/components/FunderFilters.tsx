'use client';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';

interface FunderFiltersProps {
  onFilterChange: (key: string, value: string) => void;
}

export function FunderFilters({ onFilterChange }: FunderFiltersProps) {
  const countryOptions = [
    { label: 'All Countries', value: 'any' },
    { label: 'United States', value: 'US' },
    { label: 'United Kingdom', value: 'GB' },
    // Add more countries as needed
  ];

  const typeOptions = [
    { label: 'All Types', value: 'any' },
    { label: 'Government', value: 'government' },
    { label: 'Nonprofit', value: 'nonprofit' },
  ];

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Country</label>
        <Select onValueChange={(v) => onFilterChange('country_code', v)}>
          <SelectTrigger>
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            {countryOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Type</label>
        <Select onValueChange={(v) => onFilterChange('type', v)}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {typeOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
