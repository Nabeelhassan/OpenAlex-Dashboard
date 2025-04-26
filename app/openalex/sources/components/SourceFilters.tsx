'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SourceFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [type, setType] = useState(searchParams.get('type') || '');
  const [isOA, setIsOA] = useState(searchParams.get('is_oa') === 'true');
  const [isInDOAJ, setIsInDOAJ] = useState(searchParams.get('is_in_doaj') === 'true');
  const [country, setCountry] = useState(searchParams.get('country_code') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'works_count:desc');
  
  const applyFilters = () => {
    const params = new URLSearchParams();
    
    if (type) params.set('type', type);
    if (isOA) params.set('is_oa', 'true');
    if (isInDOAJ) params.set('is_in_doaj', 'true');
    if (country) params.set('country_code', country);
    params.set('sort', sortBy);
    
    router.push(`/openalex/sources?${params.toString()}`);
  };
  
  const resetFilters = () => {
    setType('');
    setIsOA(false);
    setIsInDOAJ(false);
    setCountry('');
    setSortBy('works_count:desc');
    router.push('/openalex/sources');
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Filter Sources</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="type">Type</Label>
            <Select
              value={type}
              onValueChange={setType}
            >
              <SelectTrigger id="type" className="mt-1">
                <SelectValue placeholder="Any type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any type</SelectItem>
                <SelectItem value="journal">Journal</SelectItem>
                <SelectItem value="repository">Repository</SelectItem>
                <SelectItem value="conference">Conference</SelectItem>
                <SelectItem value="ebook_platform">Ebook Platform</SelectItem>
                <SelectItem value="book_series">Book Series</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="country">Country</Label>
            <Select
              value={country}
              onValueChange={setCountry}
            >
              <SelectTrigger id="country" className="mt-1">
                <SelectValue placeholder="Any country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any country</SelectItem>
                <SelectItem value="US">United States</SelectItem>
                <SelectItem value="GB">United Kingdom</SelectItem>
                <SelectItem value="DE">Germany</SelectItem>
                <SelectItem value="CN">China</SelectItem>
                <SelectItem value="JP">Japan</SelectItem>
                <SelectItem value="FR">France</SelectItem>
                <SelectItem value="CA">Canada</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="sort">Sort by</Label>
            <Select
              value={sortBy}
              onValueChange={setSortBy}
            >
              <SelectTrigger id="sort" className="mt-1">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="works_count:desc">Most publications</SelectItem>
                <SelectItem value="cited_by_count:desc">Most cited</SelectItem>
                <SelectItem value="display_name:asc">Name (A-Z)</SelectItem>
                <SelectItem value="display_name:desc">Name (Z-A)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="isOA" 
              checked={isOA}
              onCheckedChange={(checked) => setIsOA(checked as boolean)}
            />
            <Label htmlFor="isOA">Open Access only</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="isInDOAJ" 
              checked={isInDOAJ}
              onCheckedChange={(checked) => setIsInDOAJ(checked as boolean)}
            />
            <Label htmlFor="isInDOAJ">In DOAJ only</Label>
          </div>
          
          <div className="flex gap-2 pt-2">
            <Button onClick={applyFilters} className="flex-1">
              Apply Filters
            </Button>
            <Button variant="outline" onClick={resetFilters}>
              Reset
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 