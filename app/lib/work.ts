export interface Work {
    id: string;
    doi: string;
    title: string;
    display_name: string;
    publication_year: number;
    publication_date: Date;
    ids: IDS;
    language: string;
    primary_location: Location;
    type: string;
    type_crossref: string;
    open_access: OpenAccess;
    authorships: Authorship[];
    countries_distinct_count: number;
    institutions_distinct_count: number;
    corresponding_author_ids: any[];
    corresponding_institution_ids: any[];
    apc_list: null;
    apc_paid: null;
    has_fulltext: boolean;
    fulltext_origin: string;
    cited_by_count: number;
    cited_by_percentile_year: CitedByPercentileYear;
    biblio: Biblio;
    is_retracted: boolean;
    is_paratext: boolean;
    keywords: Keyword[];
    concepts: Concept[];
    mesh: Mesh[];
    locations_count: number;
    locations: Location[];
    best_oa_location: Location;
    sustainable_development_goals: SustainableDevelopmentGoal[];
    grants: any[];
    referenced_works_count: number;
    referenced_works: string[];
    related_works: string[];
    ngrams_url: string;
    abstract_inverted_index: { [key: string]: number[] }
    cited_by_api_url: string;
    counts_by_year: CountsByYear[];
    updated_date: Date;
    created_date: Date;
}

export interface Authorship {
    author_position: string;
    author: Author;
    institutions: Institution[];
    countries: string[];
    is_corresponding: boolean;
    raw_author_name: string;
    raw_affiliation_string: string;
    raw_affiliation_strings: string[];
}

export interface Author {
    id: string;
    display_name: string;
    orcid: string | null;
}

export interface Institution {
    id: string;
    display_name: string;
    ror: string;
    country_code: string;
    type: string;
    lineage: string[];
}

export interface Location {
    is_oa: boolean;
    landing_page_url: string;
    pdf_url: null | string;
    source: Source;
    license: null | string;
    version: null | string;
    is_accepted: boolean;
    is_published: boolean;
}

export interface Source {
    id: string;
    display_name: string;
    issn_l: null | string;
    issn: string[] | null;
    is_oa: boolean;
    is_in_doaj: boolean;
    host_organization: string;
    host_organization_name: string;
    host_organization_lineage: string[];
    host_organization_lineage_names: string[];
    type: string;
}

export interface Biblio {
    volume: string;
    issue: string;
    first_page: string;
    last_page: string;
}

export interface CitedByPercentileYear {
    min: number;
    max: number;
}

export interface Concept {
    id: string;
    wikidata: string;
    display_name: string;
    level: number;
    score: number;
}

export interface CountsByYear {
    year: number;
    cited_by_count: number;
}

export interface IDS {
    openalex: string;
    doi: string;
    mag: string;
    pmid: string;
    pmcid: string;
}

export interface Keyword {
    keyword: string;
    score: number;
}

export interface Mesh {
    descriptor_ui: string;
    descriptor_name: string;
    qualifier_ui: string;
    qualifier_name: null | string;
    is_major_topic: boolean;
}

export interface OpenAccess {
    is_oa: boolean;
    oa_status: string;
    oa_url: string;
    any_repository_has_fulltext: boolean;
}

export interface SustainableDevelopmentGoal {
    id: string;
    display_name: string;
    score: number;
}
