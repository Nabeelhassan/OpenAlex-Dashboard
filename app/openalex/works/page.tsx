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
import { ArrowRightIcon, BookOpenIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';

export default function WorksPage() {
  return (
    <main className="flex-1 p-6 md:p-10">
      <div className="flex items-center gap-2 mb-8">
        <BookOpenIcon className="h-6 w-6 text-blue-600" />
        <h1 className={`text-2xl md:text-3xl font-bold text-gray-900 ${lusitana.className}`}>
          Research Works
        </h1>
      </div>
      
      {/* Search and Filter Section */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
        <h2 className="text-lg font-semibold mb-4">Find Research</h2>
        
        <div className="grid gap-4 md:flex md:items-end md:space-x-4">
          <div className="md:flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="search"
                placeholder="Search by title, author, keyword..."
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="md:w-48">
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
              Year
            </label>
            <Select>
              <SelectTrigger id="year">
                <SelectValue placeholder="Any year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2021">2021</SelectItem>
                <SelectItem value="2020">2020</SelectItem>
                <SelectItem value="2019">2019</SelectItem>
                <SelectItem value="2018">2018</SelectItem>
              </SelectContent>
            </Select>
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
                <SelectItem value="article">Article</SelectItem>
                <SelectItem value="book">Book</SelectItem>
                <SelectItem value="book-chapter">Book Chapter</SelectItem>
                <SelectItem value="dissertation">Dissertation</SelectItem>
                <SelectItem value="proceedings">Proceedings</SelectItem>
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
          
          <div className="mt-4 md:mt-0">
            <Button>
              Search
            </Button>
          </div>
        </div>
      </div>
      
      {/* Featured Research */}
      <div className="mb-8">
        <h2 className={`text-xl font-semibold mb-4 text-gray-900 ${lusitana.className}`}>
          Featured Research
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Suspense fallback={<FeaturedWorkSkeleton />}>
            <FeaturedWork
              id="W2772766867"
              title="Hierarchical Convolutional Neural Networks for EEG-Based Emotion Recognition"
              year={2017}
              journal="Cognitive Computation"
              paperType="article"
              is_oa={false}
            />
            
            <FeaturedWork
              id="W2901957504"
              title="Large Language Models Encode Clinical Knowledge"
              year={2023}
              journal="Nature"
              paperType="article"
              is_oa={true}
            />
            
            <FeaturedWork
              id="W3128292260"
              title="Generative Agents: Interactive Simulacra of Human Behavior"
              year={2023}
              journal="ACM CHI Conference on Human Factors in Computing Systems"
              paperType="proceedings"
              is_oa={true}
            />
          </Suspense>
        </div>
      </div>
      
      {/* Browse by Categories */}
      <div>
        <h2 className={`text-xl font-semibold mb-4 text-gray-900 ${lusitana.className}`}>
          Browse by Categories
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/openalex/works?concept=C41008148"
            className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 hover:bg-blue-50 transition duration-200"
          >
            <div>
              <h3 className="font-medium text-gray-900">Computer Science</h3>
              <p className="text-sm text-gray-600">41.2M papers</p>
            </div>
            <ArrowRightIcon className="h-5 w-5 text-blue-600" />
          </Link>
          
          <Link
            href="/openalex/works?concept=C185592680"
            className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 hover:bg-blue-50 transition duration-200"
          >
            <div>
              <h3 className="font-medium text-gray-900">Biology</h3>
              <p className="text-sm text-gray-600">36.7M papers</p>
            </div>
            <ArrowRightIcon className="h-5 w-5 text-blue-600" />
          </Link>
          
          <Link
            href="/openalex/works?concept=C15744967"
            className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 hover:bg-blue-50 transition duration-200"
          >
            <div>
              <h3 className="font-medium text-gray-900">Medicine</h3>
              <p className="text-sm text-gray-600">29.8M papers</p>
            </div>
            <ArrowRightIcon className="h-5 w-5 text-blue-600" />
          </Link>
          
          <Link
            href="/openalex/works?concept=C33923547"
            className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 hover:bg-blue-50 transition duration-200"
          >
            <div>
              <h3 className="font-medium text-gray-900">Chemistry</h3>
              <p className="text-sm text-gray-600">25.4M papers</p>
            </div>
            <ArrowRightIcon className="h-5 w-5 text-blue-600" />
          </Link>
          
          <Link
            href="/openalex/works?concept=C121332964"
            className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 hover:bg-blue-50 transition duration-200"
          >
            <div>
              <h3 className="font-medium text-gray-900">Physics</h3>
              <p className="text-sm text-gray-600">20.1M papers</p>
            </div>
            <ArrowRightIcon className="h-5 w-5 text-blue-600" />
          </Link>
          
          <Link
            href="/openalex/works?concept=C144133560"
            className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 hover:bg-blue-50 transition duration-200"
          >
            <div>
              <h3 className="font-medium text-gray-900">Materials Science</h3>
              <p className="text-sm text-gray-600">15.3M papers</p>
            </div>
            <ArrowRightIcon className="h-5 w-5 text-blue-600" />
          </Link>
        </div>
      </div>
    </main>
  );
}

function FeaturedWork({
  id,
  title,
  year,
  journal,
  paperType,
  is_oa,
}: {
  id: string;
  title: string;
  year: number;
  journal: string;
  paperType: string;
  is_oa: boolean;
}) {
  return (
    <Link
      href={`/openalex/works/${id}`}
      className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 hover:shadow-md transition duration-200"
    >
      <div className="flex justify-between items-start mb-3">
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
          {paperType}
        </span>
        {is_oa && (
          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
            Open Access
          </span>
        )}
      </div>
      <h3 className="font-medium text-lg text-blue-800 line-clamp-2 mb-2">{title}</h3>
      <div className="text-sm text-gray-600 mb-4">
        <span className="mr-2">{year}</span>
        <span className="italic">{journal}</span>
      </div>
      <div className="text-blue-600 text-sm font-medium flex items-center">
        View details
        <ArrowRightIcon className="h-4 w-4 ml-1" />
      </div>
    </Link>
  );
}

function FeaturedWorkSkeleton() {
  return (
    <>
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm animate-pulse">
          <div className="flex justify-between items-start mb-3">
            <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
            <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
          </div>
          <div className="h-12 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-2/3 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-28 bg-gray-200 rounded"></div>
        </div>
      ))}
    </>
  );
} 