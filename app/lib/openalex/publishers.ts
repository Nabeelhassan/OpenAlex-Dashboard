import { formatErrorResponse } from '@/app/lib/utils';
import { ReadonlyURLSearchParams } from 'next/navigation';

// Define types
export interface Publisher {
  id: string;
  display_name: string;
  country_code?: string;
  type?: string;
  works_count: number;
  cited_by_count: number;
  sources_count: number;
  image_url?: string;
  image_thumbnail_url?: string;
  homepage_url?: string;
  summary_stats?: {
    '2yr_mean_citedness'?: number;
    h_index?: number;
    i10_index?: number;
  };
}

export interface PagedResponse<T> {
  meta: {
    count: number;
    db_response_time_ms: number;
    page: number;
    per_page: number;
    groups_count?: number;
  };
  results: T[];
  group_by?: any[];
  error?: boolean;
  message?: string;
}

interface GetPublishersParams {
  page?: number;
  perPage?: number;
  query?: string;
  filter?: string;
  sort?: string;
}

export async function getPublishers({ 
  page = 1, 
  perPage = 10, 
  query = '', 
  filter = '',
  sort = 'works_count:desc'
}: GetPublishersParams = {}): Promise<PagedResponse<Publisher>> {
  const apiUrl = new URL('https://api.openalex.org/publishers');
  
  // Add pagination parameters
  apiUrl.searchParams.set('page', page.toString());
  apiUrl.searchParams.set('per-page', perPage.toString());
  
  // Add search query if provided
  if (query) {
    apiUrl.searchParams.set('search', query);
  }
  
  // Add filter if provided
  if (filter) {
    apiUrl.searchParams.set('filter', filter);
  }
  
  // Add sort parameter
  if (sort) {
    apiUrl.searchParams.set('sort', sort);
  }
  
  try {
    const response = await fetch(apiUrl.toString(), { next: { revalidate: 3600 } });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch publishers: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Clean up IDs in results to handle prefixed IDs
    const cleanResults = data.results.map((publisher: any) => ({
      ...publisher,
      id: publisher.id.split('/').pop() || publisher.id
    }));
    
    return {
      ...data,
      results: cleanResults
    };
  } catch (error) {
    console.error('Error fetching publishers:', error);
    // Return error response that matches PagedResponse type
    return {
      error: true,
      message: 'Failed to fetch publishers data',
      meta: { 
        count: 0,
        db_response_time_ms: 0,
        page: page,
        per_page: perPage
      },
      results: []
    };
  }
}

export async function getPublisher(id: string): Promise<Publisher | null> {
  // Handle IDs that might already have prefixes
  const cleanId = id.startsWith('P') ? id : `P${id}`;
  
  try {
    const response = await fetch(`https://api.openalex.org/publishers/${cleanId}`, {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        return null; // Return null for not found
      }
      throw new Error(`Failed to fetch publisher: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching publisher ${id}:`, error);
    return null;
  }
}

export async function getPublisherWorks(publisherId: string, limit = 5) {
  // Handle IDs that might already have prefixes
  const cleanId = publisherId.startsWith('P') ? publisherId : `P${publisherId}`;
  
  try {
    const response = await fetch(
      `https://api.openalex.org/works?filter=primary_location.source.publisher.id:${cleanId}&sort=cited_by_count:desc&per-page=${limit}`,
      { next: { revalidate: 3600 } }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch publisher works: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(`Error fetching works for publisher ${publisherId}:`, error);
    return [];
  }
}

export async function getPublisherSources(publisherId: string, limit = 5) {
  // Handle IDs that might already have prefixes
  const cleanId = publisherId.startsWith('P') ? publisherId : `P${publisherId}`;
  
  try {
    const response = await fetch(
      `https://api.openalex.org/sources?filter=publisher.id:${cleanId}&sort=works_count:desc&per-page=${limit}`,
      { next: { revalidate: 3600 } }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch publisher sources: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(`Error fetching sources for publisher ${publisherId}:`, error);
    return [];
  }
}

export function buildPublisherFilterString(params: URLSearchParams): string {
  const filters = [];
  
  // Add type filter
  const type = params.get('type');
  if (type && type !== 'any') {
    filters.push(`type:${type}`);
  }
  
  // Add country filter
  const country = params.get('country');
  if (country && country !== 'any') {
    filters.push(`country_code:${country}`);
  }

  // Combine all filters with AND logic
  return filters.join(',');
}

/**
 * Fetch a publisher by its OpenAlex ID
 * @param id The OpenAlex ID of the publisher
 * @returns The publisher data or null if not found
 */
export async function fetchPublisherById(id: string): Promise<Publisher | null> {
  try {
    const response = await fetch(`https://api.openalex.org/publishers/${id}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch publisher: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching publisher:", error);
    throw error;
  }
}

/**
 * Fetch top publishers by works count with pagination
 * @param page Page number (1-based)
 * @param perPage Number of results per page
 * @returns Paged response with publisher data
 */
export async function fetchTopPublishers(
  page: number = 1,
  perPage: number = 10
): Promise<PagedResponse<Publisher>> {
  try {
    const response = await fetch(`https://api.openalex.org/publishers?sort=works_count:desc&page=${page}&per-page=${perPage}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch publishers: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching publishers:", error);
    throw error;
  }
}

/**
 * Search publishers by query string
 * @param query The search query
 * @param page Page number (1-based)
 * @param perPage Number of results per page
 * @returns Paged response with publisher data
 */
export async function searchPublishers(
  query: string,
  page: number = 1,
  perPage: number = 10
): Promise<PagedResponse<Publisher>> {
  try {
    const response = await fetch(`https://api.openalex.org/publishers?search=${encodeURIComponent(query)}&page=${page}&per-page=${perPage}`);
    
    if (!response.ok) {
      throw new Error(`Failed to search publishers: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error searching publishers:", error);
    throw error;
  }
} 