export function FundedInstitutionsList({ institutions }: { institutions: any[] }) {
  return (
    <div>
      <h3>Top Funded Institutions</h3>
      <ul>
        {institutions.map((inst) => (
          <li key={inst.id}>{inst.display_name} (${inst.funding_amount})</li>
        ))}
      </ul>
    </div>
  );
} 