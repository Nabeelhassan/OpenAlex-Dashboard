'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter, useSearchParams } from 'next/navigation';

export default function TopicFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [domain, setDomain] = useState(searchParams.get('domain') || 'any');
  const [field, setField] = useState(searchParams.get('field') || 'any');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'works_count:desc');
  
  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Update or remove domain parameter
    if (domain !== 'any') {
      params.set('domain', domain);
    } else {
      params.delete('domain');
    }
    
    // Update or remove field parameter
    if (field !== 'any') {
      params.set('field', field);
    } else {
      params.delete('field');
    }
    
    // Always include sort parameter
    params.set('sort', sortBy);
    
    router.push(`/openalex/topics?${params.toString()}`);
  };
  
  const resetFilters = () => {
    setDomain('any');
    setField('any');
    setSortBy('works_count:desc');
    
    const params = new URLSearchParams(searchParams.toString());
    params.delete('domain');
    params.delete('field');
    params.delete('sort');
    
    // Preserve search query if it exists
    const query = searchParams.get('query');
    if (query) {
      params.set('query', query);
    }
    
    router.push(`/openalex/topics?${params.toString()}`);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Filter Topics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="domain">Domain</Label>
            <Select
              value={domain}
              onValueChange={setDomain}
            >
              <SelectTrigger id="domain" className="mt-1">
                <SelectValue placeholder="Any domain" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any domain</SelectItem>
                <SelectItem value="computer">Computer Science</SelectItem>
                <SelectItem value="medicine">Medicine</SelectItem>
                <SelectItem value="biology">Biology</SelectItem>
                <SelectItem value="physics">Physics</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="chemistry">Chemistry</SelectItem>
                <SelectItem value="mathematics">Mathematics</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="field">Field</Label>
            <Select
              value={field}
              onValueChange={setField}
            >
              <SelectTrigger id="field" className="mt-1">
                <SelectValue placeholder="Any field" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any field</SelectItem>
                <SelectItem value="artificial_intelligence">Artificial Intelligence</SelectItem>
                <SelectItem value="machine_learning">Machine Learning</SelectItem>
                <SelectItem value="bioinformatics">Bioinformatics</SelectItem>
                <SelectItem value="genetics">Genetics</SelectItem>
                <SelectItem value="quantum_physics">Quantum Physics</SelectItem>
                <SelectItem value="ecology">Ecology</SelectItem>
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