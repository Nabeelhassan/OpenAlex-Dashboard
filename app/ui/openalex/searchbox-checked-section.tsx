'use client';

import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Virtuoso } from 'react-virtuoso';

import { GroupBy } from '@/app/lib/definitions';
import SimpleCheckboxSection from './simple-checked-section';

export default function SearchboxCheckedSection({
  records,
  entity,
}: {
  records: GroupBy[];
  entity: string;
}) {
  // const [filteredRecords, setFilteredRecords] = useState([...records]);

  // const handleSearch = useDebouncedCallback((term: string) => {
  //   let filtered = [...records];

  //   if (term) {
  //     filtered = records.filter((record) =>
  //       record.key_display_name.toLowerCase().includes(term),
  //     );
  //   }

  //   setFilteredRecords(filtered);
  // }, 1000);

  return (
    <>
      {/* <div className="relative flex flex-1 flex-shrink-0">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
          placeholder={`Search ${entity} ...`}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div> */}
      <div className="mt-4">
        <Virtuoso
          style={{ height: '240px' }}
          totalCount={records.length}
          itemContent={(index: number) => (
            <SimpleCheckboxSection
              key={index}
              item={records[index]}
              filterKey={`filter_${entity.toLowerCase()}`}
            />
          )}
        />
      </div>
    </>
  );
}
