export async function CountryOverview({ countryCode }: { countryCode: string }) {
  const data = await fetch(`https://api.openalex.org/institutions?filter=country_code:${countryCode}&per-page=1`);
  const { results } = await data.json();
  const institution = results[0]; // Example: Get first institution for country metadata

  return (
    <div>
      <h2 className="text-xl font-bold">{institution?.country_code}</h2>
      <p>Total Works: {institution?.works_count || 0}</p>
    </div>
  );
}
