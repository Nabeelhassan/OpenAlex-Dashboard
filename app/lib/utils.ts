import { Revenue } from './definitions';

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const generateYAxis = (revenue: Revenue[]) => {
  // Calculate what labels we need to display on the y-axis
  // based on highest record and in 1000s
  const yAxisLabels = [];
  const highestRecord = Math.max(...revenue.map((month) => month.revenue));
  const topLabel = Math.ceil(highestRecord / 1000) * 1000;

  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`$${i / 1000}K`);
  }

  return { yAxisLabels, topLabel };
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

export const formatCompactNumber = (count: number) => {
  return Intl.NumberFormat("en", { notation: "compact" }).format(count);
}

export const extractIdentifier = (identifier: string, url: string): string => {
  switch (identifier) {
    case 'openalex':
      return url.replace('https://openalex.org/', '');
    case 'doi':
      return url.replace('https://doi.org/', '');
    case 'mag':
      return url;
    case 'pmid':
      return url.replace('https://pubmed.ncbi.nlm.nih.gov/', '');
    case 'pmcid':
      return url.replace('https://www.ncbi.nlm.nih.gov/pmc/articles/', '');
    default:
      return url;
  }
};

export const capitalize = (word: string) => word[0].toUpperCase() + word.slice(1);

export enum WorkFilters {
  OASTATUS = 'oa_status',
  DOCTYPE = 'type',
  JOURNAL = 'journal',
  INSTITUTION = 'institutions.id',
  FUNDER = 'grants.funder'
}

export enum OA_STATUS {
  CLOSED = 'closed',
  BRONZE = 'bronze',
  GOLD = 'gold',
  GREEN = 'green',
  HYBRID = 'hybrid'
}

export const OA_STATUS_COLOURS: { [key: string]: string } = {
  'closed': 'b9b9b9',
  'bronze': 'd48751',
  'gold': 'fbdc69',
  'green': '6ba6ae',
  'hybrid': 'ffa659'
}

export const OA_STATUS_TOOLTIPS: { [key: string]: string } = {
  'closed': 'Closed Access publications require payment or a subscription for full access. Readers may encounter paywalls, limiting access to the content. Access is often granted to individuals or institutions with subscriptions, restricting widespread availability to the general public.',
  'bronze': 'Bronze Open Access refers to free access to scholarly articles without formal peer review. While this model allows rapid dissemination of research findings, it may lack the rigorous peer-review process associated with other Open Access models.',
  'gold': 'Gold Open Access publications are freely accessible to the public immediately upon publication. Authors typically pay a publication fee to make their work openly available, fostering widespread dissemination and accessibility.',
  'green': 'Green Open Access allows authors to deposit a version of their manuscript in a repository, such as an institutional repository or a subject-specific archive. This provides free access to the public, usually after an embargo period set by the publisher.',
  'hybrid': 'Hybrid Open Access combines elements of traditional subscription-based publishing with Open Access. In this model, authors can choose to make their individual articles freely accessible by paying an additional fee, while the rest of the journal content remains behind a paywall.',
}