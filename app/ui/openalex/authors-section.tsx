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
    <div className="flex flex-col flex-wrap items-center md:flex-row md:gap-2">
      <span className="font-semibold">Authors:</span>
      {authors.map((item, index) => (
        <AuthorCard key={index} author={item} />
      ))}

      {limitAuthors && <AuthorsDialog authors={authorships} />}
    </div>
  );
}
