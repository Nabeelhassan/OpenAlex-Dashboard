import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Building, Globe, FileText } from 'lucide-react';

import { getFunder, getFunderWorks, getFunderTopics } from '@/app/lib/openalex/funders';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FunderMetrics } from '../components/FunderMetrics';
import { FundedWorksList } from '../components/FundedWorksList';

interface FunderPageProps {
  params: { id: string };
}

export default async function FunderPage({ params }: FunderPageProps) {
  const [funder, works] = await Promise.all([
    getFunder(params.id),
    getFunderWorks(params.id, 5),
    // getFunderTopics(params.id), // Ensure this API utility exists
  ]);

  if (!funder) notFound();

  return (
    <div className="p-6 md:p-10 space-y-6">
      {/* Funder Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-6 w-6" />
            {funder.display_name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <p className="text-gray-600">{funder.description || 'No description available.'}</p>
              <div className="flex gap-4 mt-4">
                {funder.country_code && (
                  <span className="flex items-center text-sm text-gray-600">
                    <Globe className="h-4 w-4 mr-1" />
                    {funder.country_code}
                  </span>
                )}
                {funder.homepage_url && (
                  <a
                    href={funder.homepage_url}
                    target="_blank"
                    className="flex items-center text-sm text-blue-600 hover:underline"
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    Website
                  </a>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-sm text-gray-500">Works Funded</div>
                <div className="font-semibold text-lg">{funder.works_count.toLocaleString()}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-sm text-gray-500">Citations</div>
                <div className="font-semibold text-lg">{funder.cited_by_count.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metrics */}
      {funder.summary_stats?.by_year && (
        <FunderMetrics metrics={funder.summary_stats.by_year} />
      )}

      {/* Funded Works */}
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Top Funded Works
            </div>
            <Button variant="outline" asChild>
              <Link href={`/openalex/works?filter=grants.funder:${funder.id}`}>
                View All Works
              </Link>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FundedWorksList works={works} funderId={funder.id} />
        </CardContent>
      </Card>
    </div>
  );
}
