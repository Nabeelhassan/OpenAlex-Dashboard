'use client';
export default function ErrorBoundary({ error }: { error: Error }) {
  return <div>Failed to load region data: {error.message}</div>;
}
