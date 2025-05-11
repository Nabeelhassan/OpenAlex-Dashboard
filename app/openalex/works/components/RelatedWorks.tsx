'use client';

import { Link2Icon } from 'lucide-react';
import { WorksListItem } from '@/components/shared/WorksListItem'; // Adjust path if your shared folder is different

interface RelatedWork {
  id: string;
  display_name?: string;
  publication_year?: number;
  primary_location?: {
    source?: {
      display_name?: string;
    }
  };
}

interface RelatedWorksProps {
  related_works: string[];
  referenced_works?: string[];
  relatedWorksData?: RelatedWork[];
}

export function RelatedWorks({
  related_works = [],
  referenced_works = [],
  relatedWorksData = []
}: RelatedWorksProps) {
  if ((!related_works.length && !referenced_works.length) || !relatedWorksData.length) {
    return (
      <div className="flex items-center gap-2">
        <Link2Icon className="h-5 w-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Related Works</h2>
        <div className="text-sm text-gray-600 mt-2">No related works available</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Link2Icon className="h-5 w-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Related Works</h2>
      </div>

      <div className="space-y-4 overflow-auto max-h-[500px] pr-2">
        {relatedWorksData.map((work) => (
          <WorksListItem key={work.id} work={work} />
        ))}
      </div>
    </div>
  );
} 