// Mapping of ISO 3166-1 alpha-2 country codes to country names
const countryCodeMap: Record<string, string> = {
  'US': 'United States',
  'GB': 'United Kingdom',
  'CA': 'Canada',
  'AU': 'Australia',
  'DE': 'Germany',
  'FR': 'France',
  'JP': 'Japan',
  'CN': 'China',
  'IN': 'India',
  'BR': 'Brazil',
  'IT': 'Italy',
  'ES': 'Spain',
  'NL': 'Netherlands',
  'CH': 'Switzerland',
  'SE': 'Sweden',
  'NO': 'Norway',
  'DK': 'Denmark',
  'FI': 'Finland',
  'BE': 'Belgium',
  'AT': 'Austria',
  'PT': 'Portugal',
  'GR': 'Greece',
  'IE': 'Ireland',
  'NZ': 'New Zealand',
  'ZA': 'South Africa',
  'MX': 'Mexico',
  'SG': 'Singapore',
  'KR': 'South Korea',
  'IL': 'Israel',
  'RU': 'Russia',
  // Add more countries as needed
};

/**
 * Get country name from ISO 3166-1 alpha-2 country code
 * @param code ISO 3166-1 alpha-2 country code
 * @returns Country name or null if not found
 */
export function getCountryNameFromCode(code: string): string | null {
  return countryCodeMap[code] || null;
}

/**
 * Get all country codes and names as options for dropdowns
 * @returns Array of country options with label and value
 */
export function getCountryOptions(): Array<{ label: string; value: string }> {
  return Object.entries(countryCodeMap)
    .map(([code, name]) => ({
      label: name,
      value: code,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
} 