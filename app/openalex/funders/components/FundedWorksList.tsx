import { WorksListItem } from '@/components/shared/WorksListItem'; // Adjust path if your shared folder is different

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
          <WorksListItem key={work.id} work={work} />
        ))}
      </ul>
    </div>
  );
}
