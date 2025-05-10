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

export default function SourceSearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const [type, setType] = useState(searchParams.get('type') || 'any');
  const [access, setAccess] = useState(searchParams.get('is_oa') === 'true' ? 'open' : searchParams.get('is_oa') === 'false' ? 'closed' : 'any');
  const [country, setCountry] = useState(searchParams.get('country_code') || 'any');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    
    if (query) params.set('query', query);
    if (type && type !== 'any') params.set('type', type);
    if (access === 'open') params.set('is_oa', 'true');
    if (access === 'closed') params.set('is_oa', 'false');
    if (country && country !== 'any') params.set('country_code', country);
    
    router.push(`/openalex/sources?${params.toString()}`);
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
              placeholder="Search by journal name, publisher..."
              className="pl-10"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="md:w-48">
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger id="type">
              <SelectValue placeholder="Any type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any type</SelectItem>
              <SelectItem value="journal">Journal</SelectItem>
              <SelectItem value="repository">Repository</SelectItem>
              <SelectItem value="conference">Conference</SelectItem>
              <SelectItem value="ebook_platform">Ebook Platform</SelectItem>
              <SelectItem value="book_series">Book Series</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="md:w-48">
          <label htmlFor="access" className="block text-sm font-medium text-gray-700 mb-1">
            Access
          </label>
          <Select value={access} onValueChange={setAccess}>
            <SelectTrigger id="access">
              <SelectValue placeholder="Any access" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any access</SelectItem>
              <SelectItem value="open">Open Access</SelectItem>
              <SelectItem value="closed">Closed Access</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="md:w-48">
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger id="country">
              <SelectValue placeholder="Any country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any country</SelectItem>
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
        
        <div className="mt-4 md:mt-0">
          <Button type="submit">
            Search
          </Button>
        </div>
      </div>
    </form>
  );
} 