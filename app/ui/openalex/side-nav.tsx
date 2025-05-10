import Link from 'next/link';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { WorkFilters } from '@/app/lib/utils';
import DropDownSection from './drop-down-section';

const dropdown = [
  {
    title: 'Open Access',
    filterBy: WorkFilters.OASTATUS,
    entity: 'oa',
    simpleCheckBox: true,
  },
  {
    title: 'Journals',
    filterBy: WorkFilters.JOURNAL,
    entity: 'Journal',
    simpleCheckBox: false,
  },
  {
    title: 'Institutions',
    filterBy: WorkFilters.INSTITUTION,
    entity: 'Institution',
    simpleCheckBox: false,
  },
  {
    title: 'Funders',
    filterBy: WorkFilters.FUNDER,
    entity: 'Funder',
    simpleCheckBox: false,
  },
  {
    title: 'Document Type',
    filterBy: WorkFilters.DOCTYPE,
    entity: 'type',
    simpleCheckBox: true,
  },
];

export default function SideNav({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    oa?: string;
    type?: string;
    journal?: string;
    institution?: string;
    funder?: string;
  };
}) {
  const query = searchParams?.query || '';
  return (
    <div className="flex h-full w-80 flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-20"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <Accordion type="multiple" className="w-full">
          {dropdown.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{item.title}</AccordionTrigger>
              <AccordionContent>
                <DropDownSection
                  searchParams={searchParams}
                  filterBy={item.filterBy}
                  entity={item.entity}
                  simpleCheckbox={item.simpleCheckBox}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
