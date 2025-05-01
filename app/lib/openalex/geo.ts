export async function getGeoRegions() {
  const res = await fetch('https://api.openalex.org/works?group-by=institutions.country_code');;
  return res.json();
}

export async function getRegionDetails(id: string) {
  const res = await fetch(`https://api.openalex.org/geo/${id}`);
  return res.json();
}

// Fetch country metrics
export async function getCountryMetrics(countryCode: string) {
  const res = await fetch(`https://api.openalex.org/works?filter=institutions.country_code:${countryCode}&group-by=publication_year`);
  return res.json();
}