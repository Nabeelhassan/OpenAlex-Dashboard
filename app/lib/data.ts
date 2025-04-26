
import { WorkFilters } from './utils';


const OPENALEX_BASE_URL = 'https://api.openalex.org';

const RECORDS_PER_PAGE = 25;
export async function fetchRecords(
    query: string,
    currentPage: number,
    filterOA?: string,
    filterType?: string,
    filterJournal?: string,
    filterInstitution?: string,
    filterFunder?: string
) {
    // noStore();

    let url = OPENALEX_BASE_URL + '/works?search=' + query + '&page=' + currentPage;
    let filters = [];


    if (filterOA) {
        filters.push(WorkFilters.OASTATUS + ':' + filterOA);
    }

    if (filterType) {
        filters.push(WorkFilters.DOCTYPE + ':' + filterType);
    }

    if (filterJournal) {
        filters.push(WorkFilters.JOURNAL + ':' + filterJournal);
    }

    if (filterInstitution) {
        filters.push(WorkFilters.INSTITUTION + ':' + filterInstitution);
    }

    if (filterFunder) {
        filters.push(WorkFilters.FUNDER + ':' + filterFunder);
    }

    if (filters.length) {
        url += '&filter=' + filters.join();
    }

    console.log(url)

    try {
        const response = await fetch(url);
        return response.json();
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch Works.');
    }
}

export async function fetchWorkById(id: string) {
    // noStore();

    try {
        const response = await fetch(OPENALEX_BASE_URL + '/works/' + id);
        return response.json();
    } catch (error) {
        console.log('Error: ', error);
    }
}

export async function fetchGroupByRecords(
    query: string,
    groupBy: string,
    filterOA?: string,
    filterType?: string,
    filterJournal?: string,
    filterInstitution?: string,
    filterFunder?: string) {

    let url = OPENALEX_BASE_URL + '/works?search=' + query;
    let filters = [];

    if (filterOA) {
        filters.push(WorkFilters.OASTATUS + ':' + filterOA);
    }

    if (filterType) {
        filters.push(WorkFilters.DOCTYPE + ':' + filterType);
    }

    if (filterJournal) {
        filters.push(WorkFilters.JOURNAL + ':' + filterJournal);
    }

    if (filterInstitution) {
        filters.push(WorkFilters.INSTITUTION + ':' + filterInstitution);
    }

    if (filterFunder) {
        filters.push(WorkFilters.FUNDER + ':' + filterFunder);
    }

    if (filters.length) {
        url += '&filter=' + filters.join();
    }

    url += '&group_by=' + groupBy;

    console.log(url)

    try {
        const response = await fetch(url);
        return response.json();
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch Group by Records.');
    }
}

export async function fetchWorksGroupByOA(query: string) {
    // noStore();

    try {
        const response = await fetch(OPENALEX_BASE_URL + '/works?search=' + query + '&group_by=oa_status')
        return response.json();
    } catch (error) {
        console.log('Error: ', error);
    }
}

export async function fetchWorksGroupByJournal(query: string) {
    // noStore();

    try {
        const response = await fetch(OPENALEX_BASE_URL + '/works?search=' + query + '&group_by=journal')
        return response.json();
    } catch (error) {
        console.log('Error: ', error);
    }
}

export async function fetchWorksGroupByFunder(query: string) {
    // noStore();

    try {
        const response = await fetch(OPENALEX_BASE_URL + '/works?search=' + query + '&group_by=grants.funder')
        return response.json();
    } catch (error) {
        console.log('Error: ', error);
    }
}

export async function fetchWorksGroupByInstitution(query: string) {
    // noStore();

    try {
        const response = await fetch(OPENALEX_BASE_URL + '/works?search=' + query + '&group_by=institutions.id')
        return response.json();
    } catch (error) {
        console.log('Error: ', error);
    }
}

export async function fetchWorksGroupByDocumentType(query: string) {
    // noStore();

    try {
        const response = await fetch(OPENALEX_BASE_URL + '/works?search=' + query + '&group_by=type')
        return response.json();
    } catch (error) {
        console.log('Error: ', error);
    }
}

