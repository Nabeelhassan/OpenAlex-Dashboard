/**
 * Utility functions for interacting with the OpenAlex API
 */

const API_BASE_URL = 'https://api.openalex.org';

//===================== WORKS =====================//

/**
 * Fetches a single work by its ID
 */
export async function fetchWorkById(id: string) {
  try {
    // Clean ID if needed
    const cleanId = id.replace('https://openalex.org/', '');

    const response = await fetch(`${API_BASE_URL}/works/${cleanId}`);

    if (!response.ok) {
      throw new Error(`Error fetching work: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching work data:', error);
    throw error;
  }
}

/**
 * Searches for works with a given query
 */
export async function searchWorks(
  query: string,
  filters: Record<string, string> = {},
  sortBy: string = 'cited_by_count:desc',
  page: number = 1,
  perPage: number = 10
) {
  try {
    const searchParams = new URLSearchParams();

    // Add search query if provided
    if (query) {
      searchParams.append('search', query);
    }

    // Add filters
    const filterEntries = Object.entries(filters)
      .filter(([_, value]) => value) // skip falsy values
      .map(([key, value]) => `${key}:${value}`);

    if (filterEntries.length) {
      searchParams.append('filter', filterEntries.join(','));
    }

    // Add sorting
    if (sortBy) {
      searchParams.append('sort', sortBy);
    }

    // Add pagination
    searchParams.append('page', page.toString());
    searchParams.append('per-page', perPage.toString());

    const response = await fetch(`${API_BASE_URL}/works?${searchParams.toString()}`);

    if (!response.ok) {
      throw new Error(`Error searching works: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error searching works:', error);
    throw error;
  }
}

/**
 * Fetches multiple works by their IDs
 */
export async function fetchWorksByIds(ids: string[]) {
  try {
    const results = await Promise.all(
      ids.map(id => fetchWorkById(id.replace('https://openalex.org/', '')))
    );

    return results.filter(Boolean);
  } catch (error) {
    console.error('Error fetching multiple works:', error);
    throw error;
  }
}

/**
 * Fetches trending works in a specific field/concept
 */
export async function fetchTrendingWorks(conceptId?: string, limit: number = 10) {
  try {
    const searchParams = new URLSearchParams();

    // Sort by citation count in the last two years
    searchParams.append('sort', 'cited_by_count_2_years:desc');

    // Add concept filter if provided
    if (conceptId) {
      const conceptFilter = conceptId.startsWith('C')
        ? conceptId
        : conceptId.startsWith('https://openalex.org/C')
          ? conceptId.replace('https://openalex.org/', '')
          : `C${conceptId}`;

      searchParams.append('filter', `concepts.id:${conceptFilter}`);
    }

    searchParams.append('per-page', limit.toString());

    const response = await fetch(`${API_BASE_URL}/works?${searchParams.toString()}`);

    if (!response.ok) {
      throw new Error(`Error fetching trending works: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching trending works:', error);
    throw error;
  }
}


/**
 * Fetches top works sorted by works count or citations
 */
export async function fetchTopWorks(
  page: number = 1,
  perPage: number = 10,
  sortBy: string = 'citation_normalized_percentile.value:desc'
) {
  try {
    const searchParams = new URLSearchParams();

    // Add sorting
    searchParams.append('sort', sortBy);

    // Add pagination
    searchParams.append('page', page.toString());
    searchParams.append('per-page', perPage.toString());

    const response = await fetch(`${API_BASE_URL}/works?${searchParams.toString()}`);

    if (!response.ok) {
      throw new Error(`Error fetching top works: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching top works:', error);
    throw error;
  }
}

//===================== AUTHORS =====================//

/**
 * Fetches a single author by ID
 */
export async function fetchAuthorById(id: string) {
  try {
    // Clean ID if needed
    const cleanId = id.replace('https://openalex.org/', '');

    const response = await fetch(`${API_BASE_URL}/authors/${cleanId}`);

    if (!response.ok) {
      throw new Error(`Error fetching author: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching author data:', error);
    throw error;
  }
}

/**
 * Fetches top authors sorted by works count or citations
 */
export async function fetchTopAuthors(
  page: number = 1,
  perPage: number = 10,
  sortBy: string = 'works_count:desc'
) {
  try {
    const searchParams = new URLSearchParams();

    // Add sorting
    searchParams.append('sort', sortBy);

    // Add pagination
    searchParams.append('page', page.toString());
    searchParams.append('per-page', perPage.toString());

    const response = await fetch(`${API_BASE_URL}/authors?${searchParams.toString()}`);

    if (!response.ok) {
      throw new Error(`Error fetching top authors: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching top authors:', error);
    throw error;
  }
}

/**
 * Searches for authors with a given query
 */
export async function searchAuthors(
  query: string,
  filters: Record<string, string> = {},
  sortBy: string = 'works_count:desc',
  page: number = 1,
  perPage: number = 10
) {
  try {
    const searchParams = new URLSearchParams();

    // Add search query if provided
    if (query) {
      searchParams.append('search', query);
    }

    // Add filters
    for (const [key, value] of Object.entries(filters)) {
      if (value) {
        searchParams.append('filter', `${key}:${value}`);
      }
    }

    // Add sorting
    if (sortBy) {
      searchParams.append('sort', sortBy);
    }

    // Add pagination
    searchParams.append('page', page.toString());
    searchParams.append('per-page', perPage.toString());

    const response = await fetch(`${API_BASE_URL}/authors?${searchParams.toString()}`);

    if (!response.ok) {
      throw new Error(`Error searching authors: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error searching authors:', error);
    throw error;
  }
}

/**
 * Fetches works by a specific author
 */
export async function fetchWorksByAuthor(
  authorId: string,
  page: number = 1,
  perPage: number = 10,
  sortBy: string = 'publication_date:desc'
) {
  try {
    // Clean ID if needed
    const cleanId = authorId.replace('https://openalex.org/', '');

    const searchParams = new URLSearchParams();

    // Add author filter
    searchParams.append('filter', `author.id:${cleanId}`);

    // Add sorting
    searchParams.append('sort', sortBy);

    // Add pagination
    searchParams.append('page', page.toString());
    searchParams.append('per-page', perPage.toString());

    const response = await fetch(`${API_BASE_URL}/works?${searchParams.toString()}`);

    if (!response.ok) {
      throw new Error(`Error fetching works by author: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching works by author:', error);
    throw error;
  }
}

//===================== INSTITUTIONS =====================//

/**
 * Fetches a single institution by ID
 */
export async function fetchInstitutionById(id: string) {
  try {
    // Clean ID if needed
    const cleanId = id.replace('https://openalex.org/', '');

    const response = await fetch(`${API_BASE_URL}/institutions/${cleanId}`);

    if (!response.ok) {
      throw new Error(`Error fetching institution: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching institution data:', error);
    throw error;
  }
}

/**
 * Fetches top institutions sorted by works count or citations
 */
export async function fetchTopInstitutions(
  page: number = 1,
  perPage: number = 10,
  sortBy: string = 'works_count:desc'
) {
  try {
    const searchParams = new URLSearchParams();

    // Add sorting
    searchParams.append('sort', sortBy);

    // Add pagination
    searchParams.append('page', page.toString());
    searchParams.append('per-page', perPage.toString());

    const response = await fetch(`${API_BASE_URL}/institutions?${searchParams.toString()}`);

    if (!response.ok) {
      throw new Error(`Error fetching top institutions: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching top institutions:', error);
    throw error;
  }
}

/**
 * Searches for institutions with a given query
 */
export async function searchInstitutions(
  query: string,
  filters: Record<string, string> = {},
  sortBy: string = 'works_count:desc',
  page: number = 1,
  perPage: number = 10
) {
  try {
    const searchParams = new URLSearchParams();

    // Add search query if provided
    if (query) {
      searchParams.append('search', query);
    }

    // Add filters
    for (const [key, value] of Object.entries(filters)) {
      if (value) {
        searchParams.append('filter', `${key}:${value}`);
      }
    }

    // Add sorting
    if (sortBy) {
      searchParams.append('sort', sortBy);
    }

    // Add pagination
    searchParams.append('page', page.toString());
    searchParams.append('per-page', perPage.toString());

    const response = await fetch(`${API_BASE_URL}/institutions?${searchParams.toString()}`);

    if (!response.ok) {
      throw new Error(`Error searching institutions: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error searching institutions:', error);
    throw error;
  }
}

//===================== CONCEPTS =====================//

/**
 * Fetches a single concept by ID
 */
export async function fetchConceptById(id: string) {
  try {
    // Clean ID if needed
    const cleanId = id.replace('https://openalex.org/', '');

    const response = await fetch(`${API_BASE_URL}/concepts/${cleanId}`);

    if (!response.ok) {
      throw new Error(`Error fetching concept: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching concept data:', error);
    throw error;
  }
}

/**
 * Fetches top/root concepts
 */
export async function fetchTopConcepts(
  page: number = 1,
  perPage: number = 20,
  level: number = 0
) {
  try {
    const searchParams = new URLSearchParams();

    // Filter by level (0 = root concepts)
    searchParams.append('filter', `level:${level}`);

    // Sort by works count
    searchParams.append('sort', 'works_count:desc');

    // Add pagination
    searchParams.append('page', page.toString());
    searchParams.append('per-page', perPage.toString());

    const response = await fetch(`${API_BASE_URL}/concepts?${searchParams.toString()}`);

    if (!response.ok) {
      throw new Error(`Error fetching top concepts: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching top concepts:', error);
    throw error;
  }
}

/**
 * Searches for concepts with a given query
 */
export async function searchConcepts(
  query: string,
  filters: Record<string, string> = {},
  page: number = 1,
  perPage: number = 10
) {
  try {
    const searchParams = new URLSearchParams();

    // Add search query if provided
    if (query) {
      searchParams.append('search', query);
    }

    // Add filters
    for (const [key, value] of Object.entries(filters)) {
      if (value) {
        searchParams.append('filter', `${key}:${value}`);
      }
    }

    // Sort by works count
    searchParams.append('sort', 'works_count:desc');

    // Add pagination
    searchParams.append('page', page.toString());
    searchParams.append('per-page', perPage.toString());

    const response = await fetch(`${API_BASE_URL}/concepts?${searchParams.toString()}`);

    if (!response.ok) {
      throw new Error(`Error searching concepts: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error searching concepts:', error);
    throw error;
  }
} 