'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function TopicsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Topics page error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
      <ExclamationTriangleIcon className="h-16 w-16 text-amber-500 mb-4" />
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
      <p className="text-gray-600 mb-6 max-w-md">
        We encountered an error while trying to load the topics. This could be due to a network issue or a problem with our servers.
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Try again
        </button>
        <Link 
          href="/"
          className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
} 