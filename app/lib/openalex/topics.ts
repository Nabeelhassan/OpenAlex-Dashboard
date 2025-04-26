// API utility functions for fetching topics data from OpenAlex API

interface TopicsResponse {
  meta: {
    count: number;
    db_response_time_ms: number;
    page: number;
    per_page: number;
  };
  results: Topic[];
}

export interface Topic {
  id: string;
  display_name: string;
  description: string;
  works_count: number;
  cited_by_count: number;
  subfield: {
    id: string;
    display_name: string;
  };
  field: {
    id: string;
    display_name: string;
  };
  domain: {
    id: string;
    display_name: string;
  };
  siblings?: {
    id: string;
    display_name: string;
    works_count: number;
  }[];
  counts_by_year?: {
    year: number;
    works_count: number;
    cited_by_count: number;
  }[];
  related_topics?: {
    id: string;
    display_name: string;
    works_count: number;
    score: number;
  }[];
  wikidata_id?: string;
  summary_stats?: {
    two_yr_mean_citedness: number;
    h_index: number;
    i10_index: number;
  };
}

const OPENALEX_API_URL = 'https://api.openalex.org';
const EMAIL = 'user@example.com'; // Replace with your email for better rate limits

/**
 * Get a single topic by ID
 */
export async function getTopic(id: string): Promise<Topic | null> {
  try {
    // Clean the ID - remove any URL parts and '@' prefix
    let cleanId = id;
    if (cleanId.startsWith('@')) {
      cleanId = cleanId.substring(1);
    }
    if (cleanId.includes('/')) {
      cleanId = cleanId.split('/').pop() || cleanId;
    }
    
    // Strip the 'T' prefix if present
    const topicId = cleanId.startsWith('T') ? cleanId.substring(1) : cleanId;
    
    const response = await fetch(
      `${OPENALEX_API_URL}/topics/T${topicId}?mailto=${EMAIL}`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch topic: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching topic:', error);
    return null;
  }
}

/**
 * Get a list of topics with optional filters
 */
export async function getTopics({
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
}): Promise<TopicsResponse | null> {
  try {
    let url = `${OPENALEX_API_URL}/topics?page=${page}&per-page=${perPage}&mailto=${EMAIL}`;
    
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
      throw new Error(`Failed to fetch topics: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Clean up IDs in the results
    if (data.results && Array.isArray(data.results)) {
      data.results = data.results.map((topic: Topic) => ({
        ...topic,
        id: topic.id.startsWith('@') 
            ? topic.id.substring(1).split('/').pop() 
            : topic.id.includes('/') 
                ? topic.id.split('/').pop() 
                : topic.id
      }));
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching topics:', error);
    return null;
  }
}

/**
 * Get works related to a specific topic
 */
export async function getTopicWorks(topicId: string, limit = 10): Promise<any[]> {
  try {
    // Strip the 'T' prefix if present
    const id = topicId.startsWith('T') ? topicId.substring(1) : topicId;
    
    const url = `${OPENALEX_API_URL}/works?filter=topics.id:T${id}&per-page=${limit}&mailto=${EMAIL}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch topic works: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching topic works:', error);
    return [];
  }
}

/**
 * Get top authors in a specific topic
 */
export async function getTopicAuthors(topicId: string, limit = 10): Promise<any[]> {
  try {
    // Strip the 'T' prefix if present
    const id = topicId.startsWith('T') ? topicId.substring(1) : topicId;
    
    const url = `${OPENALEX_API_URL}/authors?filter=topics.id:T${id}&per-page=${limit}&sort=works_count:desc&mailto=${EMAIL}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch topic authors: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching topic authors:', error);
    return [];
  }
}

/**
 * Build a filter string from search parameters
 */
export function buildTopicFilterString(params: URLSearchParams): string {
  const filters: string[] = [];
  
  if (params.has('level')) {
    filters.push(`level:${params.get('level')}`);
  }
  
  if (params.has('domain')) {
    filters.push(`domain.id:${params.get('domain')}`);
  }
  
  if (params.has('field')) {
    filters.push(`field.id:${params.get('field')}`);
  }
  
  return filters.join(',');
} 