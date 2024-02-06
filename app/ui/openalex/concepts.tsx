import { Concept } from '@/app/lib/work';

export default function Concepts({ concepts }: { concepts: Concept[] }) {
  return (
    <div className="flex w-full flex-col md:col-span-6">
      <h2 className={`m-2 text-xl md:text-2xl`}>Concepts</h2>
      <div className="flex flex-col rounded-xl bg-gray-50 p-2">
        <div className="bg-white p-4 text-sm">
          {concepts.map((concept) => concept.display_name).join(', ')}
        </div>
      </div>
    </div>
  );
}
