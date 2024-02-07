import { capitalize, formatDateToLocal } from '@/app/lib/utils';
import { Biblio, Location } from '@/app/lib/work';

export default function MetaDataSection({
  type,
  primary_location,
  biblio,
  publication_date,
}: {
  primary_location: Location;
  biblio: Biblio;
  publication_date: Date;
  type: string;
}) {
  const publicationType = type
    .split('-')
    .map((word) => capitalize(word))
    .join(' ');

  const addComma = (element: any) =>
    element && <span className="mr-1 md:mr-2">,</span>;

  return (
    <div className="flex flex-row flex-wrap items-center pb-2">
      {publicationType && (
        <span className="text-xs font-semibold md:text-sm">
          {publicationType}
        </span>
      )}

      {addComma(publicationType && primary_location?.source?.display_name)}
      {primary_location?.source?.display_name && (
        <span className="text-center text-xs italic text-gray-500 md:px-0 md:text-sm">
          {primary_location.source.display_name}
        </span>
      )}

      {addComma(biblio.volume)}
      {biblio.volume && (
        <span className="text-center text-xs md:text-sm">
          <span className="font-bold underline">Volume:</span> {biblio.volume}
        </span>
      )}

      {addComma(biblio.issue)}
      {biblio.issue && (
        <span className="text-center text-xs md:text-sm">
          <span className="font-bold underline">Issue:</span> {biblio.issue}
        </span>
      )}

      {addComma(biblio.first_page)}
      {biblio.first_page && (
        <span className="text-center text-xs md:text-sm">
          <span className="font-bold underline">Pages:</span>
          &nbsp;
          {biblio.first_page}
          {biblio.last_page &&
            biblio.last_page !== biblio.first_page &&
            '-' + biblio.last_page}
        </span>
      )}

      {addComma(publication_date)}
      {publication_date && (
        <span className="text-xs md:text-sm">
          <span className="font-bold underline">Date:</span>
          &nbsp;{formatDateToLocal(publication_date.toString())}
        </span>
      )}
    </div>
  );
}
