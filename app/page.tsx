import Link from 'next/link';
import { ArrowRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { lusitana } from './ui/fonts';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center px-6 py-24 bg-gradient-to-b from-blue-950 to-blue-900 text-white">
        <div className="absolute inset-0 opacity-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-800 via-blue-900 to-indigo-900 opacity-20"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center z-10">
          <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${lusitana.className}`}>
            OpenAlex Explorer
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Discover and analyze the world&apos;s research through the OpenAlex dataset
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <div className="flex items-center border-2 border-blue-400 rounded-full bg-white/10 backdrop-blur-sm overflow-hidden">
              <MagnifyingGlassIcon className="h-5 w-5 ml-4 text-blue-200" />
              <Input 
                type="text"
                placeholder="Search for papers, authors, organizations..."
                className="w-full py-4 px-3 bg-transparent border-0 text-white placeholder-blue-200 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-none">
                Search
              </Button>
            </div>
          </div>
          
          {/* Quick Access Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Button variant="ghost" className="bg-white/10 text-white hover:bg-white/20 hover:text-white" asChild>
              <Link href="/openalex/works">
                <span>Research Works</span> <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="ghost" className="bg-white/10 text-white hover:bg-white/20 hover:text-white" asChild>
              <Link href="/openalex/authors">
                <span>Authors</span> <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="ghost" className="bg-white/10 text-white hover:bg-white/20 hover:text-white" asChild>
              <Link href="/openalex/institutions">
                <span>Institutions</span> <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="ghost" className="bg-white/10 text-white hover:bg-white/20 hover:text-white" asChild>
              <Link href="/openalex/concepts">
                <span>Concepts</span> <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-3xl font-bold text-center mb-12 text-gray-900 ${lusitana.className}`}>
            Explore Academic Research Data
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Research Papers</h3>
              <p className="text-gray-600">
                Access millions of research papers with citation data, abstracts, and full-text links.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Academic Collaboration</h3>
              <p className="text-gray-600">
                Analyze collaboration networks and discover research teams across institutions.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Research Trends</h3>
              <p className="text-gray-600">
                Visualize emerging research trends and track the evolution of scientific fields.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-3xl font-bold text-center mb-12 text-gray-900 ${lusitana.className}`}>
            Powered by OpenAlex Data
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-blue-600 mb-2">200M+</p>
              <p className="text-gray-600">Research Works</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600 mb-2">90M+</p>
              <p className="text-gray-600">Authors</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600 mb-2">100K+</p>
              <p className="text-gray-600">Institutions</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600 mb-2">65K+</p>
              <p className="text-gray-600">Concepts</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-16 px-6 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-3xl font-bold mb-6 ${lusitana.className}`}>
            Start Exploring Academic Research Today
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Dive into the world&apos;s research with our powerful OpenAlex Explorer tools.
          </p>
          <Button asChild size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
            <Link href="/dashboard">
              <span>Open Dashboard</span> <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
