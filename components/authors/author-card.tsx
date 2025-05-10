import Image from "next/image"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Author } from "@/types"

interface AuthorCardProps {
  author: Author
}

export function AuthorCard({ author }: AuthorCardProps) {
  return (
    <Link href={`/openalex/authors/${author.id}`}>
      <Card className="h-full overflow-hidden transition-all hover:shadow-md">
        <CardHeader className="pb-2">
          {author.image_url ? (
            <div className="relative h-16 w-16 overflow-hidden rounded-full">
              <Image
                src={author.image_url}
                alt={author.display_name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <span className="text-2xl font-bold">
                {author.display_name.charAt(0)}
              </span>
            </div>
          )}
          <CardTitle className="line-clamp-1 text-lg">
            {author.display_name}
          </CardTitle>
          <CardDescription className="line-clamp-1">
            {author.last_known_institution?.display_name}
            {author.orcid && (
              <span className="ml-1 text-xs text-muted-foreground">
                (ORCID: {author.orcid})
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {author.works_count.toLocaleString()} works •{" "}
            {author.cited_by_count.toLocaleString()} citations
          </p>
        </CardContent>
        <CardFooter className="pt-2">
          <p className="text-xs text-muted-foreground">
            {author.last_known_institution?.country_code || ""}
          </p>
        </CardFooter>
      </Card>
    </Link>
  )
} 