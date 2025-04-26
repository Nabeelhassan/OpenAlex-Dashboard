// API utility functions for fetching source data from OpenAlex API

interface SourcesResponse {
  meta: {
    count: number;
    db_response_time_ms: number;
    page: number;
    per_page: number;
  };
  results: Source[];
}

export interface Source {
  id: string;
  display_name: string;
  issn_l?: string;
  issn?: string[];
  type: string;
  is_oa: boolean;
  is_in_doaj: boolean;
  homepage_url?: string;
  works_count: number;
  cited_by_count: number;
  country_code?: string;
  host_organization_name?: string;
  summary_stats?: {
    h_index: number;
    i10_index: number;
    two_year_mean_citedness: number;
  };
  counts_by_year?: {
    year: number;
    works_count: number;
    cited_by_count: number;
  }[];
  x_concepts?: {
    id: string;
    display_name: string;
    level: number;
    score: number;
  }[];
}

const OPENALEX_API_URL = 'https://api.openalex.org';
const EMAIL = 'user@example.com'; // Replace with your email for better rate limits

/**
 * Get a single source by ID
 */
export async function getSource(id: string): Promise<Source | null> {
  try {
    // Strip the 'S' prefix if present
    const sourceId = id.startsWith('S') ? id.substring(1) : id;
    
    const response = await fetch(
      `${OPENALEX_API_URL}/sources/S${sourceId}?mailto=${EMAIL}`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch source: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching source:', error);
    return null;
  }
}

/**
 * Get a list of sources with optional filters
 */
export async function getSources({
  page = 1,
  perPage = 25,
  query = '',
  filter = '',
  sort = 'works_count:desc',
}: {
  page?: number;
  perPage?: number;
  query?: string;
  filter?: string;
  sort?: string;
}): Promise<SourcesResponse | null> {
  try {
    let url = `${OPENALEX_API_URL}/sources?page=${page}&per-page=${perPage}&mailto=${EMAIL}`;
    
    if (query) {
      url += `&search=${encodeURIComponent(query)}`;
    }
    
    if (filter) {
      url += `&filter=${encodeURIComponent(filter)}`;
    }
    
    if (sort) {
      url += `&sort=${encodeURIComponent(sort)}`;
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch sources: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching sources:', error);
    return null;
  }
}

/**
 * Get works published in a specific source
 */
export async function getSourceWorks(sourceId: string, limit = 10): Promise<any[]> {
  try {
    // Strip the 'S' prefix if present
    const id = sourceId.startsWith('S') ? sourceId.substring(1) : sourceId;
    
    const url = `${OPENALEX_API_URL}/works?filter=primary_location.source.id:S${id}&per-page=${limit}&mailto=${EMAIL}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch source works: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching source works:', error);
    return [];
  }
}

/**
 * Build a filter string from search parameters
 */
export function buildSourceFilterString(params: URLSearchParams): string {
  const filters: string[] = [];
  
  if (params.has('type')) {
    filters.push(`type:${params.get('type')}`);
  }
  
  if (params.has('is_oa') && params.get('is_oa') === 'true') {
    filters.push('is_oa:true');
  }
  
  if (params.has('is_in_doaj') && params.get('is_in_doaj') === 'true') {
    filters.push('is_in_doaj:true');
  }
  
  if (params.has('country_code')) {
    filters.push(`country_code:${params.get('country_code')}`);
  }
  
  return filters.join(',');
} 