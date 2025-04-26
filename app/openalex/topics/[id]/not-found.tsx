import Link from 'next/link';
import { PuzzlePieceIcon } from '@heroicons/react/24/outline';

export default function TopicNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
      <PuzzlePieceIcon className="h-16 w-16 text-gray-400 mb-4" />
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Topic Not Found</h1>
      <p className="text-gray-600 mb-6 max-w-md">
        We couldn&apos;t find the topic you were looking for. It may have been removed or you might have followed a broken link.
      </p>
      <Link
        href="/openalex/topics"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Browse All Topics
      </Link>
    </div>
  );
} 