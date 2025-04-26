'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export default function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Create a function to generate page URLs with current search params
  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // Generate pages to show (current page, prev/next 2 pages)
  const generatePageNumbers = () => {
    const pages = [];
    const delta = 2; // How many pages to show before and after current page
    
    // Always include first page
    pages.push(1);
    
    // Calculate range of pages around current page
    const rangeStart = Math.max(2, currentPage - delta);
    const rangeEnd = Math.min(totalPages - 1, currentPage + delta);
    
    // Add ellipsis if needed before range
    if (rangeStart > 2) {
      pages.push(-1); // -1 represents ellipsis
    }
    
    // Add pages in range
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }
    
    // Add ellipsis if needed after range
    if (rangeEnd < totalPages - 1) {
      pages.push(-2); // -2 represents ellipsis
    }
    
    // Always include last page if there's more than one page
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };
  
  const pages = generatePageNumbers();

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="outline"
        disabled={currentPage <= 1}
        asChild={currentPage > 1 ? true : undefined}
      >
        {currentPage > 1 ? (
          <Link href={createPageURL(currentPage - 1)}>
            <ChevronLeftIcon className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </Link>
        ) : (
          <span>
            <ChevronLeftIcon className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </span>
        )}
      </Button>
      
      {pages.map((page, i) => {
        // Skip rendering duplicate pages (can happen with small totalPages)
        if (i > 0 && pages[i - 1] === page) {
          return null;
        }
        
        // Render ellipsis
        if (page < 0) {
          return (
            <span key={`ellipsis-${page}`} className="px-2">
              ...
            </span>
          );
        }
        
        // Render page number
        return (
          <Button
            key={page}
            variant={currentPage === page ? 'default' : 'outline'}
            className="w-10 h-10"
            asChild={currentPage !== page}
          >
            {currentPage !== page ? (
              <Link href={createPageURL(page)}>
                {page}
              </Link>
            ) : (
              <span>{page}</span>
            )}
          </Button>
        );
      })}
      
      <Button
        variant="outline"
        disabled={currentPage >= totalPages}
        asChild={currentPage < totalPages ? true : undefined}
      >
        {currentPage < totalPages ? (
          <Link href={createPageURL(currentPage + 1)}>
            <ChevronRightIcon className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Link>
        ) : (
          <span>
            <ChevronRightIcon className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </span>
        )}
      </Button>
    </div>
  );
} 