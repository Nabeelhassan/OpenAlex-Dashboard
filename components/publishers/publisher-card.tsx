import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Publisher } from "@/app/lib/openalex/publishers";
import { getCountryNameFromCode } from "@/app/lib/countries";
import { formatCompactNumber } from "@/app/lib/utils";
import { getOptimalImageUrl } from "@/app/lib/image-utils";
import Link from "next/link";
import Image from "next/image";
import { Building2, ExternalLink, BookOpen, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PublisherCardProps {
  publisher: Publisher;
  showLink?: boolean;
}

export function PublisherCard({ publisher, showLink = true }: PublisherCardProps) {
  const countryName = publisher.country_code 
    ? getCountryNameFromCode(publisher.country_code) 
    : null;
  
  const imageUrl = getOptimalImageUrl(publisher.image_thumbnail_url, 
    'https://static.openalex.org/publisher-images/publisher-placeholder.png');
  
  return (
    <Card className="h-full flex flex-col overflow-hidden hover:border-sky-500/50 transition-colors">
      <CardHeader className="flex flex-row items-start gap-4 p-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border">
          <Image
            src={imageUrl}
            alt={publisher.display_name}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="flex-1 space-y-1 overflow-hidden">
          <h3 className="font-medium leading-tight line-clamp-2">
            {showLink ? (
              <Link href={`/openalex/publishers/${publisher.id}`} className="hover:underline">
                {publisher.display_name}
              </Link>
            ) : (
              publisher.display_name
            )}
          </h3>
          
          {publisher.type && (
            <p className="text-sm text-muted-foreground">
              {publisher.type}
            </p>
          )}
          
          {countryName && (
            <p className="text-sm text-muted-foreground truncate">
              {countryName}
            </p>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 p-4 pt-0">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex flex-col">
            <span className="text-muted-foreground">Works</span>
            <span className="font-medium">{formatCompactNumber(publisher.works_count)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Citations</span>
            <span className="font-medium">{formatCompactNumber(publisher.cited_by_count)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Sources</span>
            <span className="font-medium">{formatCompactNumber(publisher.sources_count)}</span>
          </div>
          {publisher.summary_stats?.h_index && (
            <div className="flex flex-col">
              <span className="text-muted-foreground">h-index</span>
              <span className="font-medium">{publisher.summary_stats.h_index}</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 mt-auto">
        <div className="flex flex-wrap gap-2">
          {publisher.homepage_url && (
            <Link 
              href={publisher.homepage_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs text-sky-600 hover:text-sky-800"
            >
              <ExternalLink className="mr-1 h-3 w-3" />
              Website
            </Link>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

export function PublisherCardSkeleton() {
  return (
    <Card className="h-full flex flex-col overflow-hidden animate-pulse">
      <CardHeader className="flex flex-row items-start gap-4 p-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-slate-200 dark:bg-slate-800"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-4/5"></div>
          <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-3/5"></div>
          <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-2/5"></div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 p-4 pt-0">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col space-y-1">
            <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-2/5"></div>
            <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-3/5"></div>
          </div>
          <div className="flex flex-col space-y-1">
            <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-2/5"></div>
            <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-3/5"></div>
          </div>
          <div className="flex flex-col space-y-1">
            <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-2/5"></div>
            <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-3/5"></div>
          </div>
          <div className="flex flex-col space-y-1">
            <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-2/5"></div>
            <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-3/5"></div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 mt-auto">
        <div className="flex gap-2">
          <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-16"></div>
        </div>
      </CardFooter>
    </Card>
  );
} 