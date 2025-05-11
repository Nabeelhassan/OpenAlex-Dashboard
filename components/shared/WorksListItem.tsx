import Link from 'next/link';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'; // Assuming Shadcn UI card components
import {
    AcademicCapIcon,
    ArrowTopRightOnSquareIcon,
    BeakerIcon,
    ChartBarIcon,
    DocumentTextIcon,
} from '@heroicons/react/24/outline'; // Adjust if your icon import path is different

// It's a good practice to define a specific type for the 'work' prop
// For now, we'll use 'any', but consider creating an interface for Work
interface WorksListItemProps {
    work: any; // Replace 'any' with your Work type/interface
}

export function WorksListItem({ work }: WorksListItemProps) {
    return (
        <Card key={work.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                    <Link
                        href={`/openalex/works/${work.id.replace('https://openalex.org/', '')}`}
                        className="text-blue-600 hover:underline"
                    >
                        {work.title}
                    </Link>
                </CardTitle>
                <CardDescription>
                    {work.publication_year} • {work.primary_location?.source?.display_name || 'Unknown Source'}
                    {work.primary_location?.source?.is_in_doaj && (
                        <span className="ml-2 inline-flex items-center bg-green-50 text-green-700 px-2 py-0.5 rounded-full text-xs">
                            DOAJ
                        </span>
                    )}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap justify-between text-sm text-gray-600">
                    <div className="flex items-center">
                        <DocumentTextIcon className="h-4 w-4 inline mr-1" />
                        {work.type || 'Unknown Type'}
                        {work.is_retracted && (
                            <span className="ml-2 inline-flex items-center bg-red-50 text-red-700 px-2 py-0.5 rounded-full text-xs">
                                Retracted
                            </span>
                        )}
                    </div>
                    <div className="flex items-center">
                        <ChartBarIcon className="h-4 w-4 inline mr-1" />
                        {work.cited_by_count?.toLocaleString() || 0} citations
                    </div>

                    <div className="w-full mt-2 flex flex-wrap gap-2">
                        {work.open_access?.is_oa && (
                            <span className="inline-flex items-center bg-green-50 text-green-700 px-2 py-0.5 rounded-full text-xs">
                                Open Access
                            </span>
                        )}

                        {work.doi && (
                            <a
                                href={`https://doi.org/${work.doi.replace('https://doi.org/', '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs"
                            >
                                <span>DOI</span>
                                <ArrowTopRightOnSquareIcon className="h-3 w-3" />
                            </a>
                        )}

                        {/* Authors list */}
                        <div className="inline-flex items-center bg-gray-50 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                            <AcademicCapIcon className="h-3 w-3 mr-1" />
                            <span>
                                {work.authorships?.length
                                    ? `${work.authorships.length} author${work.authorships.length > 1 ? 's' : ''}`
                                    : 'No authors'}
                            </span>
                        </div>

                        {/* Concepts tags */}
                        {work.concepts?.length > 0 && work.concepts[0]?.display_name && (
                            <div className="inline-flex items-center bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full text-xs">
                                <BeakerIcon className="h-3 w-3 mr-1" />
                                <span>{work.concepts[0].display_name}</span>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
