'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';

export default function SourcesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Sources error:', error);
  }, [error]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 md:p-24">
      <div className="max-w-md space-y-6 text-center">
        <h1 className="text-3xl font-bold">Something went wrong</h1>
        <p className="text-gray-600">
          We encountered an error while trying to fetch the sources data.
          This could be due to a network issue or a problem with the OpenAlex API.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Button onClick={reset} variant="default">
            Try again
          </Button>
          <Link href="/openalex" passHref>
            <Button variant="outline" className="flex items-center gap-1">
              <ArrowLeftIcon className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
} 