'use client';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FundersGrid } from './components/FundersGrid';
import { FunderFilters } from './components/FunderFilters';
import { getFunders } from '@/app/lib/openalex/funders';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function FundersPage() {
  const [funders, setFunders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadInitialFunders() {
      try {
        setLoading(true);
        const { results } = await getFunders({
          page: currentPage,
          filters,
          query: searchQuery,
        });
        setFunders(results || []);
      } catch (error) {
        console.error('Error loading funders:', error);
      } finally {
        setLoading(false);
      }
    }
    loadInitialFunders();
  }, [searchQuery, filters, currentPage]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on new search
  };

  return (
    <main className="flex-1">
      <h1 className="text-2xl font-bold mb-6">Funders</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <FunderFilters 
            onFilterChange={(key, value) => setFilters({ ...filters, [key]: value })}
          />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search funders..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          {loading ? (
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-100 rounded animate-pulse" />
              ))}
            </div>
          ) : (
            <FundersGrid funders={funders} />
          )}
        </div>
      </div>
    </main>
  );
}
