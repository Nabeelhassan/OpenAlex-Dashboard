'use client';

import { useEffect, useState } from 'react'
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

import { OA_STATUS_COLOURS, OA_STATUS_TOOLTIPS, capitalize } from '@/app/lib/utils';

import { WorkHeader } from '../components/WorkHeader';
import { AuthorsList } from '../components/AuthorsList';
import { ConceptsList } from '../components/ConceptsList';
import { CitationMetrics } from '../components/CitationMetrics';
import { RelatedWorks } from '../components/RelatedWorks';
import { AbstractSection } from '../components/AbstractSection';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Badge } from '@/components/ui/badge';


async function fetchWorkData(id: string) {
  try {

    const response = await fetch(`https://api.openalex.org/works/${id}`);

    if (!response.ok) {
      throw new Error(`Error fetching work: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching work data:', error);
    return null;
  }
}

export default function WorkPage({ params }: { params: { id: string } }) {
  const [work, setWork] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedWorksData, setRelatedWorksData] = useState<any[]>([]);

  useEffect(() => {
    async function loadWork() {
      try {
        setLoading(true);
        // Clean the ID to ensure proper format
        const id = params.id;
        console.log("Fetching work with ID:", id);

        const workData = await fetchWorkData(id);

        if (!workData) {
          throw new Error("Failed to fetch work data");
        }

        console.log("Work data fetched:", workData.id);
        setWork(workData);

        // Fetch related works data if available
        if (workData?.related_works?.length) {
          try {
            // Only fetch first 3 related works for performance
            const relatedIds = workData.related_works.slice(0, 3);
            const relatedDataPromises = relatedIds.map((id: string) =>
              fetchWorkData(id.replace('https://openalex.org/', ''))
            );
            const relatedData = await Promise.all(relatedDataPromises);
            setRelatedWorksData(relatedData.filter(Boolean));
          } catch (relatedErr) {
            console.error("Error fetching related works:", relatedErr);
            // Don't fail the whole page if related works fail
          }
        }
      } catch (err: any) {
        console.error("Error in loadWork:", err);
        setError(err.message || 'Failed to load research work');
      } finally {
        setLoading(false);
      }
    }

    loadWork();
  }, [params.id]);

  if (loading) {
    return <WorkSkeleton />;
  }

  if (error || !work) {
    return (
      <div className="flex-1 p-6 md:p-10">
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {error || 'Research work not found'}
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn&apos;t find the research work you&apos;re looking for.
          </p>
          <Link
            href="/openalex/works"
            className="flex items-center text-blue-600 hover:underline"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Back to Research Works
          </Link>
        </div>
      </div>
    );
  }

  const is_oa = work.open_access?.is_oa || false;

  return (
    <main className="flex-1 p-6 md:p-10">
      {/* Back Link */}
      <div className="mb-6">
        <Link
          href="/openalex/works"
          className="flex items-center text-blue-600 hover:underline text-sm"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back to Research Works
        </Link>
      </div>

      {/* Work Header */}
      <WorkHeader
        id={work.id}
        title={work.title || ''}
        display_name={work.display_name || ''}
        publication_year={work.publication_year}
        publication_date={work.publication_date}
        doi={work.doi}
        type={work.type}
        is_oa={is_oa}
      />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-4 space-y-8">
          {/* Authors Section */}
          <AuthorsList authorships={work.authorships || []} />

          {/* Abstract Section */}
          <AbstractSection abstract_inverted_index={work.abstract_inverted_index} />

          {/* Tabs for different sections */}
          <Tabs defaultValue="concepts" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="concepts">Concepts & Keywords</TabsTrigger>
              <TabsTrigger value="citations">Citations</TabsTrigger>
              <TabsTrigger value="related">Related Works</TabsTrigger>
            </TabsList>

            <TabsContent value="concepts" className="pt-4">
              <ConceptsList concepts={work.concepts} keywords={work.keywords} />
            </TabsContent>

            <TabsContent value="citations" className="pt-4">
              <CitationMetrics counts_by_year={work.counts_by_year || []} />
            </TabsContent>

            <TabsContent value="related" className="pt-4">
              <RelatedWorks
                related_works={work.related_works || []}
                referenced_works={work.referenced_works || []}
                relatedWorksData={relatedWorksData}
              />
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          {/* Publication Details */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Publication Details</h2>
            <dl className="space-y-4">
              {work.primary_location?.source?.display_name && (
                <div>
                  <dt className="text-sm text-gray-500">Journal/Source</dt>
                  <dd className="font-medium">{work.primary_location.source.display_name}</dd>
                </div>
              )}

              {work.primary_location?.source?.issn && (
                <div>
                  <dt className="text-sm text-gray-500">ISSN</dt>
                  <dd className="text-sm font-medium">{Array.isArray(work.primary_location.source.issn) ?
                    work.primary_location.source.issn.join(', ') :
                    work.primary_location.source.issn}
                  </dd>
                </div>
              )}

              {work.publication_year && (
                <div>
                  <dt className="text-sm text-gray-500">Year</dt>
                  <dd className="font-medium">{work.publication_year}</dd>
                </div>
              )}

              {work.type && (
                <div>
                  <dt className="text-sm text-gray-500">Type</dt>
                  <dd className="capitalize font-medium">{work.type}</dd>
                </div>
              )}

              <div>
                <dt className="text-sm text-gray-500">Open Access</dt>
                <dd>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full inline-block ${is_oa ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                    {is_oa ? 'Yes' : 'No'}
                  </span>
                  {work.open_access?.oa_status && (
                    // <span className="text-xs ml-2 text-gray-500">
                    //   ({work.open_access.oa_status})
                    // </span>
                    <HoverCard>
                      <HoverCardTrigger>
                        {' '}
                        <Badge
                          className="cursor-pointer text-black"
                          style={{
                            backgroundColor: `#${OA_STATUS_COLOURS[work.open_access.oa_status]}`,
                          }}
                        >
                          {capitalize(work.open_access?.oa_status)}
                        </Badge>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <p className="text-sm text-gray-500">
                          {OA_STATUS_TOOLTIPS[work.open_access.oa_status]}
                        </p>
                      </HoverCardContent>
                    </HoverCard>
                  )}
                </dd>
              </div>

              {work.primary_location?.pdf_url && (
                <div>
                  <dt className="text-sm text-gray-500">PDF</dt>
                  <dd>
                    <a
                      href={work.primary_location.pdf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Download PDF
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </div>

          {/* Citation Links */}
          {work.doi && (
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">External Links</h2>
              <ul className="space-y-2">
                <li>
                  <a
                    href={`https://doi.org/${work.doi.replace('https://doi.org/', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View on DOI
                  </a>
                </li>
                <li>
                  <a
                    href={`https://scholar.google.com/scholar?q=${encodeURIComponent(work.display_name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Search on Google Scholar
                  </a>
                </li>
                <li>
                  <a
                    href={`https://openalex.org/${work.id.replace('https://openalex.org/', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View on OpenAlex
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function WorkSkeleton() {
  return (
    <div className="flex-1 p-6 md:p-10">
      <div className="mb-6">
        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
      </div>

      <div className="flex justify-center items-center py-20">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-4 border-blue-200 animate-spin"></div>
          <div className="w-12 h-12 rounded-full border-t-4 border-blue-600 animate-spin absolute top-0 left-0"></div>
        </div>
        <div className="ml-4 text-lg text-gray-600">Loading research work...</div>
      </div>
    </div>
  );
}
