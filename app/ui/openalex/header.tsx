import { Work } from '@/app/lib/work';
import Image from 'next/image';

import IdentifiersSection from './identifiers-section';
import AuthorsSection from './authors-section';
import MetaDataSection from './metadata-section';
import TitleSection from './title-section';
import CitationsSection from './citations-section';

export default function Header({
  id,
  type,
  title,
  ids,
  open_access,
  primary_location,
  biblio,
  publication_date,
  authorships,
  cited_by_count,
  referenced_works_count,
}: Work) {
  return (
    <div className="mx-2 flex flex-col gap-2">
      {/* open access icon and title */}
      <div className="flex flex-col items-center md:flex-row md:gap-2">
        {open_access.is_oa && (
          <Image
            src="/open-access.svg"
            width={96}
            height={48}
            className="md:block"
            alt="open access icon"
          />
        )}
        <TitleSection id={id} open_access={open_access} title={title} />
      </div>

      {/* publication type, journal & biblio info */}
      <MetaDataSection
        primary_location={primary_location}
        biblio={biblio}
        publication_date={publication_date}
        type={type}
      />

      {/* authors info */}
      {authorships.length > 0 && (
        <AuthorsSection authorships={authorships} limit={15} />
      )}

      {/* affiliations */}
      {/* <div className="flex flex-col md:gap-2">
        <span className="font-bold">Affiliations:</span>
        <ol>
          {authorships.map((author, index) => (
            <li key={index}>{author.raw_affiliation_string}</li>
          ))}
        </ol>
      </div> */}

      {/* identifiers */}
      <IdentifiersSection identifiers={ids} iconSize={12} />

      <CitationsSection
        cited_by_count={cited_by_count}
        referenced_works_count={referenced_works_count}
      />
    </div>
  );
}
