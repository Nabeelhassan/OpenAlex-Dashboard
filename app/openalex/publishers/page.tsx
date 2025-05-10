'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowRightIcon, BuildingLibraryIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import { PublishersGrid } from './components/PublishersGrid';
import { getPublishers } from '@/app/lib/openalex/publishers';
import { getCountryOptions } from '@/app/lib/countries';

// Metadata cannot be exported from client components
// export const metadata: Metadata = {
//   title: "Publishers | OpenAlex Dashboard",
//   description: "Explore the top academic publishers from around the world.",
// };

export default function PublishersPage() {
  const [publishers, setPublishers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [country, setCountry] = useState('any');
  const [type, setType] = useState('any');
  const [sortBy, setSortBy] = useState('works_count:desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [countryOptions] = useState([
    { label: 'Any country', value: 'any' },
    ...getCountryOptions()
  ]);

  useEffect(() => {
    async function loadInitialPublishers() {
      try {
        setLoading(true);
        const { results, meta } = await getPublishers({
          page: 1,
          perPage: 12,
          sort: sortBy
        });
        setPublishers(results || []);
        setTotalPages(Math.ceil((meta?.count || 0) / 12));
      } catch (error) {
        console.error('Error loading publishers:', error);
      } finally {
        setLoading(false);
      }
    }

    loadInitialPublishers();
  }, [sortBy]);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setIsSearching(true);
    setLoading(true);
    setCurrentPage(1);
    
    try {
      const filters = [];
      if (country && country !== 'any') filters.push(`country_code:${country}`);
      if (type && type !== 'any') filters.push(`type:${type}`);
      
      const filter = filters.join(',');
      
      const { results, meta } = await getPublishers({
        page: 1,
        perPage: 12,
        query: searchQuery,
        filter,
        sort: sortBy
      });
      
      setPublishers(results || []);
      setTotalPages(Math.ceil((meta?.count || 0) / 12));
    } catch (error) {
      console.error('Error searching publishers:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handlePageChange(newPage: number) {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
    
    setLoading(true);
    setCurrentPage(newPage);
    
    try {
      const filters = [];
      if (country && country !== 'any') filters.push(`country_code:${country}`);
      if (type && type !== 'any') filters.push(`type:${type}`);
      
      const filter = filters.join(',');
      
      const { results } = await getPublishers({
        page: newPage,
        perPage: 12,
        query: isSearching ? searchQuery : '',
        filter,
        sort: sortBy
      });
        
      setPublishers(results || []);
    } catch (error) {
      console.error('Error changing page:', error);
    } finally {
      setLoading(false);
    }
  }

  const publisherTypes = [
    { label: 'Any type', value: 'any' },
    { label: 'Association', value: 'association' },
    { label: 'Company', value: 'company' },
    { label: 'Government', value: 'government' },
    { label: 'Society', value: 'society' },
    { label: 'University', value: 'university' }
  ];

  return (
    <main className="flex-1 p-6 md:p-10">
      <div className="flex items-center gap-2 mb-8">
        <BuildingLibraryIcon className="h-6 w-6 text-blue-600" />
        <h1 className={`text-2xl md:text-3xl font-bold text-gray-900 ${lusitana.className}`}>
          Publishers
        </h1>
      </div>
      
      {/* Search and Filter Section */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
        <h2 className="text-lg font-semibold mb-4">Find Publishers</h2>
        
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid gap-4 md:flex md:items-end md:space-x-4">
            <div className="md:flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search by publisher name..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
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
                  {countryOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                  {publisherTypes.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
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
                </SelectContent>
              </Select>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Button type="submit" disabled={loading}>
                Search
              </Button>
            </div>
          </div>
        </form>
      </div>
      
      {/* Publishers List */}
      <div className="mb-8">
        <h2 className={`text-xl font-semibold mb-4 text-gray-900 ${lusitana.className}`}>
          {isSearching ? 'Search Results' : 'Top Publishers'}
        </h2>
        
        <PublishersGrid publishers={publishers} loading={loading} />
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || loading}
              >
                Previous
              </Button>
              
              <div className="flex items-center px-4">
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
              </div>
              
              <Button 
                variant="outline"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || loading}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {/* Browse by Category */}
      <div>
        <h2 className={`text-xl font-semibold mb-4 text-gray-900 ${lusitana.className}`}>
          Browse by Category
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setType('company');
              setCountry('any');
              handleSearch(e);
            }}
            className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 hover:bg-blue-50 transition duration-200"
          >
            <div>
              <h3 className="font-medium text-gray-900">Commercial Publishers</h3>
              <p className="text-sm text-gray-600">Major publishing companies</p>
            </div>
            <ArrowRightIcon className="h-5 w-5 text-blue-600" />
          </Link>
          
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setType('society');
              setCountry('any');
              handleSearch(e);
            }}
            className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 hover:bg-blue-50 transition duration-200"
          >
            <div>
              <h3 className="font-medium text-gray-900">Academic Societies</h3>
              <p className="text-sm text-gray-600">Scholarly and professional societies</p>
            </div>
            <ArrowRightIcon className="h-5 w-5 text-blue-600" />
          </Link>
          
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setType('university');
              setCountry('any');
              handleSearch(e);
            }}
            className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 hover:bg-blue-50 transition duration-200"
          >
            <div>
              <h3 className="font-medium text-gray-900">University Presses</h3>
              <p className="text-sm text-gray-600">Academic publishers affiliated with universities</p>
            </div>
            <ArrowRightIcon className="h-5 w-5 text-blue-600" />
          </Link>
        </div>
      </div>
    </main>
  );
} 