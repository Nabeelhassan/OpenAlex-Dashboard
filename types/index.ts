export interface Institution {
  id: string
  display_name: string
  type: string
  country_code?: string
  image_url?: string
  works_count: number
  cited_by_count: number
  homepage_url?: string
}

export interface Author {
  id: string
  display_name: string
  orcid?: string
  works_count: number
  cited_by_count: number
  last_known_institution?: Institution
  image_url?: string
} 