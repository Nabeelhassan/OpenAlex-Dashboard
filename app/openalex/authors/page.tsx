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
import { ArrowRightIcon, UserIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import { AuthorsGrid } from './components/AuthorsGrid';
import { AuthorsSkeleton } from '@/components/authors/authors-skeleton';
import { Pagination } from '@/components/ui/pagination';
import { fetchTopAuthors, searchAuthors } from '@/app/lib/openalex';

export default function AuthorsPage() {
  const [authors, setAuthors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [field, setField] = useState('');
  const [sortBy, setSortBy] = useState('works_count:desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    async function loadInitialAuthors() {
      try {
        setLoading(true);
        const data = await fetchTopAuthors();
        setAuthors(data.results || []);
        setTotalPages(Math.ceil((data.meta?.count || 0) / 10));
      } catch (error) {
        console.error('Error loading authors:', error);
      } finally {
        setLoading(false);
      }
    }

    loadInitialAuthors();
  }, []);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setIsSearching(true);
    setLoading(true);
    setCurrentPage(1);
    
    try {
      const filters: Record<string, string> = {};
      if (field) filters['concepts.id'] = field;
      
      const data = await searchAuthors(searchQuery, filters, sortBy, 1);
      setAuthors(data.results || []);
      setTotalPages(Math.ceil((data.meta?.count || 0) / 10));
    } catch (error) {
      console.error('Error searching authors:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handlePageChange(newPage: number) {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
    
    setLoading(true);
    setCurrentPage(newPage);
    
    try {
      const filters: Record<string, string> = {};
      if (field) filters['concepts.id'] = field;
      
      const data = isSearching
        ? await searchAuthors(searchQuery, filters, sortBy, newPage)
        : await fetchTopAuthors(newPage);
        
      setAuthors(data.results || []);
    } catch (error) {
      console.error('Error changing page:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading && currentPage === 1) {
    return (
      <main className="flex-1 p-6 md:p-10">
        <div className="flex items-center gap-2 mb-8">
          <UserIcon className="h-6 w-6 text-blue-600" />
          <h1 className={`text-2xl md:text-3xl font-bold text-gray-900 ${lusitana.className}`}>
            Authors
          </h1>
        </div>
        
        <AuthorsSkeleton />
      </main>
    );
  }

  return (
    <main className="flex-1 p-6 md:p-10">
      <div className="flex items-center gap-2 mb-8">
        <UserIcon className="h-6 w-6 text-blue-600" />
        <h1 className={`text-2xl md:text-3xl font-bold text-gray-900 ${lusitana.className}`}>
          Authors
        </h1>
      </div>
      
      {/* Search and Filter Section */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
        <h2 className="text-lg font-semibold mb-4">Find Authors</h2>
        
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="md:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search by author name, affiliation..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="field" className="block text-sm font-medium text-gray-700 mb-1">
                Research Field
              </label>
              <Select value={field} onValueChange={setField}>
                <SelectTrigger id="field">
                  <SelectValue placeholder="Any field" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any field</SelectItem>
                  <SelectItem value="C41008148">Computer Science</SelectItem>
                  <SelectItem value="C185592680">Biology</SelectItem>
                  <SelectItem value="C15744967">Medicine</SelectItem>
                  <SelectItem value="C33923547">Chemistry</SelectItem>
                  <SelectItem value="C121332964">Physics</SelectItem>
                  <SelectItem value="C144133560">Materials Science</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
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
                  <SelectItem value="h_index:desc">Highest h-index</SelectItem>
                  <SelectItem value="display_name:asc">Name (A-Z)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="md:col-span-4 flex justify-end">
              <Button type="submit" disabled={loading}>
                Search
              </Button>
            </div>
          </div>
        </form>
      </div>
      
      {/* Featured Authors */}
      <div className="mb-8">
        <h2 className={`text-xl font-semibold mb-4 text-gray-900 ${lusitana.className}`}>
          {isSearching ? 'Search Results' : 'Top Authors'}
        </h2>
        
        <AuthorsGrid authors={authors} loading={loading} />
        
        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            loading={loading}
          />
        )}
      </div>
      
      {/* Browse by Research Fields */}
      <div>
        <h2 className={`text-xl font-semibold mb-4 text-gray-900 ${lusitana.className}`}>
          Browse Authors by Field
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/openalex/authors?field=C41008148"
            className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 hover:bg-blue-50 transition duration-200"
          >
            <div>
              <h3 className="font-medium text-gray-900">Computer Science</h3>
              <p className="text-sm text-gray-600">1.2M+ authors</p>
            </div>
            <ArrowRightIcon className="h-5 w-5 text-blue-600" />
          </Link>
          
          <Link
            href="/openalex/authors?field=C185592680"
            className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 hover:bg-blue-50 transition duration-200"
          >
            <div>
              <h3 className="font-medium text-gray-900">Biology</h3>
              <p className="text-sm text-gray-600">2.8M+ authors</p>
            </div>
            <ArrowRightIcon className="h-5 w-5 text-blue-600" />
          </Link>
          
          <Link
            href="/openalex/authors?field=C15744967"
            className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 hover:bg-blue-50 transition duration-200"
          >
            <div>
              <h3 className="font-medium text-gray-900">Medicine</h3>
              <p className="text-sm text-gray-600">3.5M+ authors</p>
            </div>
            <ArrowRightIcon className="h-5 w-5 text-blue-600" />
          </Link>
          
          <Link
            href="/openalex/authors?field=C33923547"
            className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 hover:bg-blue-50 transition duration-200"
          >
            <div>
              <h3 className="font-medium text-gray-900">Chemistry</h3>
              <p className="text-sm text-gray-600">1.8M+ authors</p>
            </div>
            <ArrowRightIcon className="h-5 w-5 text-blue-600" />
          </Link>
          
          <Link
            href="/openalex/authors?field=C121332964"
            className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 hover:bg-blue-50 transition duration-200"
          >
            <div>
              <h3 className="font-medium text-gray-900">Physics</h3>
              <p className="text-sm text-gray-600">1.5M+ authors</p>
            </div>
            <ArrowRightIcon className="h-5 w-5 text-blue-600" />
          </Link>
          
          <Link
            href="/openalex/authors?field=C144133560"
            className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 hover:bg-blue-50 transition duration-200"
          >
            <div>
              <h3 className="font-medium text-gray-900">Materials Science</h3>
              <p className="text-sm text-gray-600">980K+ authors</p>
            </div>
            <ArrowRightIcon className="h-5 w-5 text-blue-600" />
          </Link>
        </div>
      </div>
    </main>
  );
} 