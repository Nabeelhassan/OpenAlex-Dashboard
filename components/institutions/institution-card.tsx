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
import { BuildingLibraryIcon } from "@heroicons/react/24/outline"
import { Institution } from "@/types"

interface InstitutionCardProps {
  institution: Institution
}

export function InstitutionCard({ institution }: InstitutionCardProps) {
  return (
    <Link href={`/openalex/institutions/${institution.id}`}>
      <Card className="h-full overflow-hidden transition-all hover:shadow-md">
        <CardHeader className="pb-2">
          {institution.image_url ? (
            <div className="relative h-16 w-16 overflow-hidden rounded-md">
              <Image
                src={institution.image_url}
                alt={institution.display_name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-md bg-muted">
              <BuildingLibraryIcon className="h-8 w-8 text-muted-foreground" />
            </div>
          )}
          <CardTitle className="line-clamp-1 text-lg">
            {institution.display_name}
          </CardTitle>
          <CardDescription className="line-clamp-1">
            {institution.country_code && `${institution.country_code} • `}
            {institution.type}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {institution.works_count.toLocaleString()} works •{" "}
            {institution.cited_by_count.toLocaleString()} citations
          </p>
        </CardContent>
        <CardFooter className="pt-2">
          <p className="text-xs text-muted-foreground">
            {institution.homepage_url && "Homepage available"}
          </p>
        </CardFooter>
      </Card>
    </Link>
  )
} 