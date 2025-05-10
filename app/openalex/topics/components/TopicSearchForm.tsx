'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function TopicSearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const [domain, setDomain] = useState(searchParams.get('domain') || 'any');
  const [field, setField] = useState(searchParams.get('field') || 'any');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'works_count:desc');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    
    if (query) params.set('query', query);
    if (domain && domain !== 'any') params.set('domain', domain);
    if (field && field !== 'any') params.set('field', field);
    if (sortBy) params.set('sort', sortBy);
    
    router.push(`/openalex/topics?${params.toString()}`);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 md:flex md:items-end md:space-x-4">
        <div className="md:flex-1">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="search"
              placeholder="Search by topic name..."
              className="pl-10"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="md:w-48">
          <label htmlFor="domain" className="block text-sm font-medium text-gray-700 mb-1">
            Domain
          </label>
          <Select value={domain} onValueChange={setDomain}>
            <SelectTrigger id="domain">
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
        
        <div className="md:w-48">
          <label htmlFor="field" className="block text-sm font-medium text-gray-700 mb-1">
            Field
          </label>
          <Select value={field} onValueChange={setField}>
            <SelectTrigger id="field">
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
        
        <div className="md:w-48">
          <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
            Sort By
          </label>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger id="sort">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="works_count:desc">Most works</SelectItem>
              <SelectItem value="cited_by_count:desc">Most cited</SelectItem>
              <SelectItem value="display_name:asc">Name (A-Z)</SelectItem>
              <SelectItem value="display_name:desc">Name (Z-A)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="mt-4 md:mt-0">
          <Button type="submit">
            Search
          </Button>
        </div>
      </div>
    </form>
  );
} 