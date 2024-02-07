import { Authorship, Work } from '@/app/lib/work';
import { AuthorCard } from './author-card';
import { AuthorsDialog } from './authors-dialog';

export default function AuthorsSection({
  authorships,
  limit = 15,
}: {
  authorships: Authorship[];
  limit?: number;
}) {
  const limitAuthors = authorships.length > limit;
  const authors =
    authorships.length > limit ? authorships.slice(0, limit) : authorships;

  return (
    <div className="flex flex-row flex-wrap items-center pb-2">
      <span className="mr-2 text-xs font-semibold underline md:text-sm">
        Authors:
      </span>
      {authors.map((item, index) => (
        <AuthorCard key={index} author={item} />
      ))}

      {limitAuthors && <AuthorsDialog authors={authorships} />}
    </div>
  );
}
