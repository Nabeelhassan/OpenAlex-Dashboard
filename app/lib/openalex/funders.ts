import { Work } from '../work'; // Ensure this interface exists (defined below)

interface GetFundersParams {
  query?: string;
  filters?: {
    country_code?: string;
    type?: string;
    is_active?: boolean;
  };
  page?: number;
  sortBy?: string;
}

export async function getFunders({ query, filters, page = 1, sortBy }: GetFundersParams) {
  const params = new URLSearchParams();
  if (query) params.set('search', query);
  if (filters?.country_code) params.set('filter', `country_code:${filters.country_code}`);
  if (filters?.type) params.set('filter', `type:${filters.type}`);
  if (sortBy) params.set('sort', sortBy);
  params.set('page', page.toString());

  const res = await fetch(`https://api.openalex.org/funders?${params.toString()}`);
  return res.json();
}

export async function getFunder(id: string) {
  const res = await fetch(`https://api.openalex.org/funders/${id}`, {
    next: { revalidate: 86400 }, // Cache for 24 hours
  });
  if (!res.ok) throw new Error('Funder not found');
  return res.json();
}

export async function getFunderTopics(id: string) {
  const res = await fetch(`https://api.openalex.org/funders/${id}?select=x_concepts`);
  if (!res.ok) throw new Error('Failed to fetch funder topics');
  const data = await res.json();
  return data.x_concepts || [];
}

export async function getFunderWorks(
  funderId: string,
  perPage: number = 5,
  page: number = 1
): Promise<Work[]> {
  const params = new URLSearchParams({
    filter: `grants.funder:${funderId}`,
    per_page: perPage.toString(),
    page: page.toString(),
  });

  const res = await fetch(`https://api.openalex.org/works?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch funded works');
  const data = await res.json();
  return data.results || [];
}

export async function getFunderTrends(id: string): Promise<FundingTrend[]> {
  const res = await fetch(`https://api.openalex.org/funders/${id}/trends`);
  return res.json();
}

export async function getFunderInstitutions(id: string): Promise<Institution[]> {
  const res = await fetch(`https://api.openalex.org/funders/${id}/institutions`);
  return res.json();
}
