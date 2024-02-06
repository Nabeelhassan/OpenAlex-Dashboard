import { unstable_noStore as noStore } from 'next/cache';
import { sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  User,
  Revenue,
} from './definitions';
import { WorkFilters, formatCurrency } from './utils';

export async function fetchRevenue() {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  noStore();
  try {
    console.log('Fetching invoices data...');
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    console.log('Data fetch completed after 5 seconds.');


    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  noStore();
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 8000));

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    console.log('Data fetch completed after 8 seconds.');

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  noStore();

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  noStore();

  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}


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


