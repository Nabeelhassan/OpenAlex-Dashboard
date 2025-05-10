export async function ResearchOutputChart({ countryCode }: { countryCode: string }) {
  const data = await fetch(`https://api.openalex.org/works?filter=institutions.country_code:${countryCode}&group-by=publication_year`);
  const trends = await data.json();
  return <></>
  // return <LineChart data={trends.group_by} />; // Use ECharts or similar
}
