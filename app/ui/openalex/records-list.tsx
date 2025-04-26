import clsx from 'clsx';

import { nunito_sans } from '@/app/ui/fonts';
import { fetchRecords } from '@/app/lib/data';
import { Work } from '@/app/lib/work';
import { formatCompactNumber } from '@/app/lib/utils';

import AuthorsSection from './authors-section';
import CitationsSection from './citations-section';
import IdentifiersSection from './identifiers-section';
import MetaDataSection from './metadata-section';
// import Pagination from '../invoices/pagination';
import TitleSection from './title-section';
import { Meta } from '@/app/lib/definitions';
import RecordCard from './record-card';

export default async function RecordsList({
  query,
  currentPage,
  filterOA,
  filterType,
  filterJournal,
  filterInstitution,
  filterFunder,
}: {
  query: string;
  currentPage: number;
  filterOA: string;
  filterType: string;
  filterJournal: string;
  filterInstitution: string;
  filterFunder: string;
}) {
  const records = await fetchRecords(
    query,
    currentPage,
    filterOA,
    filterType,
    filterJournal,
    filterInstitution,
    filterFunder,
  );
  const meta: Meta = records.meta;
  const results: Work[] = records.results;
  const totalPages = Math.ceil(Number(meta.count) / meta.per_page);

  return (
    <>
      <div className="flex w-full flex-col">
        <h2 className={`${nunito_sans.className} my-4 text-xl md:text-2xl`}>
          Results: {formatCompactNumber(meta.count)}
        </h2>
        <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
          {/* NOTE: comment in this code when you get to this point in the course */}

          <div className="bg-white px-6">
            {results.map((result, i) => {
              return (
                <div
                  key={result.id}
                  className={clsx(
                    'flex flex-row items-center justify-between py-4',
                    {
                      'border-t': i !== 0,
                    },
                  )}
                >
                  <div className="flex grow">
                    <div className="min-w-0">
                      <RecordCard record={result} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div> */}
    </>
  );
}
