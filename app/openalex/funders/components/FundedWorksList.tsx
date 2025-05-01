import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

interface FundedWorksListProps {
  works: Array<{
    id: string;
    title: string;
    publication_year: number;
    cited_by_count: number;
  }>;
  funderId: string
}

export function FundedWorksList({ works, funderId }: FundedWorksListProps) {
  return (
    <div className="space-y-4">
      <ul className="space-y-3">
        {works.map((work) => (
          <li key={work.id} className="border-b pb-3 last:border-0">
            <Link href={`/openalex/works/${work.id}`} className="hover:text-blue-600">
              <h3 className="font-medium">{work.title}</h3>
            </Link>
            <div className="flex gap-4 text-sm text-gray-600 mt-1">
              <span>{work.publication_year}</span>
              <span className="flex items-center">
                <FileText className="h-3 w-3 mr-1" />
                {work.cited_by_count.toLocaleString()} citations
              </span>
            </div>
          </li>
        ))}
      </ul>
      <Button variant="outline" asChild>
        <Link href={`/openalex/works?filter=grants.funder:${funderId}`}>
          View All Works
        </Link>
      </Button>
    </div>
  );
}
