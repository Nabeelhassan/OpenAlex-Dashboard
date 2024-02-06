import { Work } from '@/app/lib/work';

import AuthorsSection from './authors-section';
import CitationsSection from './citations-section';
import IdentifiersSection from './identifiers-section';
import MetaDataSection from './metadata-section';
import TitleSection from './title-section';

export default function RecordCard({ record }: { record: Work }) {
  return (
    <>
      <TitleSection
        id={record.id}
        open_access={record.open_access}
        title={record.title}
      />
      <MetaDataSection
        primary_location={record.primary_location}
        biblio={record.biblio}
        publication_date={record.publication_date}
        type={record.type}
      />
      <AuthorsSection authorships={record.authorships} limit={8} />
      <IdentifiersSection identifiers={record.ids} iconSize={12} />
      <CitationsSection
        cited_by_count={record.cited_by_count}
        referenced_works_count={record.referenced_works_count}
      />
    </>
  );
}
