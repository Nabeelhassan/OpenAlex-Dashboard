'use client';

import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowRightIcon, BookOpenIcon, DocumentTextIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';

export default function SourcesPage() {
  return (
    <main className="flex-1 p-6 md:p-10">
      <div className="flex items-center gap-2 mb-8">
        <DocumentTextIcon className="h-6 w-6 text-blue-600" />
        <h1 className={`text-2xl md:text-3xl font-bold text-gray-900 ${lusitana.className}`}>
          Sources
        </h1>
      </div>
      
      {/* Search and Filter Section */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
        <h2 className="text-lg font-semibold mb-4">Find Sources</h2>
        
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
              />
            </div>
          </div>
          
          <div className="md:w-48">
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <Select>
              <SelectTrigger id="type">
                <SelectValue placeholder="Any type" />
              </SelectTrigger>
              <SelectContent>
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
            <Select>
              <SelectTrigger id="access">
                <SelectValue placeholder="Any access" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Open Access</SelectItem>
                <SelectItem value="closed">Closed Access</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="md:w-48">
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <Select>
              <SelectTrigger id="country">
                <SelectValue placeholder="Any country" />
              </SelectTrigger>
              <SelectContent>
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
            <Button>
              Search
            </Button>
          </div>
        </div>
      </div>
      
      {/* Featured Sources */}
      <div className="mb-8">
        <h2 className={`text-xl font-semibold mb-4 text-gray-900 ${lusitana.className}`}>
          Featured Sources
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Suspense fallback={<FeaturedSourceSkeleton />}>
            <FeaturedSource
              id="S1983995261"
              display_name="PeerJ"
              type="journal"
              works_count={20184}
              is_oa={true}
            />
            
            <FeaturedSource
              id="S137773608"
              display_name="Nature"
              type="journal"
              works_count={455123}
              is_oa={false}
            />
            
            <FeaturedSource
              id="S2764455111"
              display_name="PubMed Central"
              type="repository"
              works_count={7645214}
              is_oa={true}
            />
          </Suspense>
        </div>
      </div>
      
      {/* Browse by Categories */}
      <div>
        <h2 className={`text-xl font-semibold mb-4 text-gray-900 ${lusitana.className}`}>
          Browse by Type
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/openalex/sources?type=journal"
            className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 hover:bg-blue-50 transition duration-200"
          >
            <div>
              <h3 className="font-medium text-gray-900">Journals</h3>
              <p className="text-sm text-gray-600">Academic journals and periodicals</p>
            </div>
            <ArrowRightIcon className="h-5 w-5 text-blue-600" />
          </Link>
          
          <Link
            href="/openalex/sources?type=repository"
            className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 hover:bg-blue-50 transition duration-200"
          >
            <div>
              <h3 className="font-medium text-gray-900">Repositories</h3>
              <p className="text-sm text-gray-600">Preprint and institutional repositories</p>
            </div>
            <ArrowRightIcon className="h-5 w-5 text-blue-600" />
          </Link>
          
          <Link
            href="/openalex/sources?type=conference"
            className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 hover:bg-blue-50 transition duration-200"
          >
            <div>
              <h3 className="font-medium text-gray-900">Conferences</h3>
              <p className="text-sm text-gray-600">Conference proceedings and presentations</p>
            </div>
            <ArrowRightIcon className="h-5 w-5 text-blue-600" />
          </Link>
          
          <Link
            href="/openalex/sources?type=ebook_platform"
            className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 hover:bg-blue-50 transition duration-200"
          >
            <div>
              <h3 className="font-medium text-gray-900">Ebook Platforms</h3>
              <p className="text-sm text-gray-600">Digital book platforms and libraries</p>
            </div>
            <ArrowRightIcon className="h-5 w-5 text-blue-600" />
          </Link>
          
          <Link
            href="/openalex/sources?type=book_series"
            className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 hover:bg-blue-50 transition duration-200"
          >
            <div>
              <h3 className="font-medium text-gray-900">Book Series</h3>
              <p className="text-sm text-gray-600">Collections of related books</p>
            </div>
            <ArrowRightIcon className="h-5 w-5 text-blue-600" />
          </Link>
          
          <Link
            href="/openalex/sources"
            className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 hover:bg-blue-50 transition duration-200"
          >
            <div>
              <h3 className="font-medium text-gray-900">All Sources</h3>
              <p className="text-sm text-gray-600">Browse all publication sources</p>
            </div>
            <ArrowRightIcon className="h-5 w-5 text-blue-600" />
          </Link>
        </div>
      </div>
    </main>
  );
}

function FeaturedSource({
  id,
  display_name,
  type,
  works_count,
  is_oa,
}: {
  id: string;
  display_name: string;
  type: string;
  works_count: number;
  is_oa: boolean;
}) {
  return (
    <Link
      href={`/openalex/sources/${id}`}
      className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 hover:shadow-md transition duration-200"
    >
      <div className="flex justify-between items-start mb-3">
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
          {type}
        </span>
        {is_oa && (
          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
            Open Access
          </span>
        )}
      </div>
      <h3 className="text-lg font-semibold mb-2 text-gray-900">{display_name}</h3>
      <p className="text-sm text-gray-600">
        {works_count.toLocaleString()} publications
      </p>
    </Link>
  );
}

function FeaturedSourceSkeleton() {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm animate-pulse">
      <div className="flex justify-between items-start mb-3">
        <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
        <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
      </div>
      <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
    </div>
  );
} 