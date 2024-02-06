import { Suspense } from 'react';

import Search from '@/app/ui/search';
import { nunito_sans } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';

import RecordsList from '@/app/ui/openalex/records-list';
import SideNav from '@/app/ui/openalex/side-nav';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    filter_oa?: string;
    filter_type?: string;
    filter_journal?: string;
    filter_institution?: string;
    filter_funder?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const filterOA = searchParams?.filter_oa || '';
  const filterType = searchParams?.filter_type || '';
  const filterJournal = searchParams?.filter_journal || '';
  const filterInstitution = searchParams?.filter_institution || '';
  const filterFunder = searchParams?.filter_funder || '';

  return (
    <div className="flex gap-2">
      <SideNav searchParams={searchParams} />
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className={`${nunito_sans.className} text-4xl font-bold`}>
            OpenAlex Dashboards
          </h1>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Enter Search Query..." />
        </div>
        <Suspense
          key={
            query +
            currentPage +
            filterOA +
            filterType +
            filterJournal +
            filterInstitution +
            filterFunder
          }
          fallback={<InvoicesTableSkeleton />}
        >
          <RecordsList
            query={query}
            currentPage={currentPage}
            filterOA={filterOA}
            filterType={filterType}
            filterJournal={filterJournal}
            filterInstitution={filterInstitution}
            filterFunder={filterFunder}
          />
        </Suspense>
      </div>
    </div>
  );
}
