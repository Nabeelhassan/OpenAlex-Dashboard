import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function SourceNotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 md:p-24">
      <div className="max-w-md space-y-6 text-center">
        <h1 className="text-3xl font-bold">Source Not Found</h1>
        <p className="text-gray-600">
          We couldn't find the source you're looking for. It may have been removed, or you might have followed a broken link.
        </p>
        <Link
          href="/openalex/sources"
          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          <span>Back to Sources</span>
        </Link>
      </div>
    </main>
  );
} 