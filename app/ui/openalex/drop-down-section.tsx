import { fetchGroupByRecords } from '@/app/lib/data';
import { GroupBy } from '@/app/lib/definitions';
import SimpleCheckboxSection from './simple-checked-section';
import SearchboxCheckedSection from './searchbox-checked-section';

export default async function DropDownSection({
  searchParams,
  filterBy,
  entity,
  simpleCheckbox,
}: {
  searchParams?: {
    query?: string;
    filter_oa?: string;
    filter_type?: string;
    filter_journal?: string;
    filter_institution?: string;
    filter_funder?: string;
  };
  filterBy: string;
  entity: string;
  simpleCheckbox: boolean;
}) {
  const query = searchParams?.query || '';
  const filterOA = searchParams?.filter_oa || '';
  const filterType = searchParams?.filter_type || '';
  const filterJournal = searchParams?.filter_journal || '';
  const filterInstitution = searchParams?.filter_institution || '';
  const filterFunder = searchParams?.filter_funder || '';

  const result = await fetchGroupByRecords(
    query,
    filterBy,
    filterOA,
    filterType,
    filterJournal,
    filterInstitution,
    filterFunder,
  );

  const records: GroupBy[] = result.group_by;

  return (
    <div className="items-top flex flex-col gap-2">
      {simpleCheckbox ? (
        records.map((item, index) => (
          <SimpleCheckboxSection
            key={index}
            item={item}
            filterKey={`filter_${entity.toLowerCase()}`}
          />
        ))
      ) : (
        <SearchboxCheckedSection records={records} entity={entity} />
      )}
    </div>
  );
}
