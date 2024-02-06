import { Keyword } from '@/app/lib/work';

export default function Keywords({ keywords }: { keywords: Keyword[] }) {
  return (
    <div className="flex w-full flex-col md:col-span-6">
      <h2 className={`m-2 text-xl md:text-2xl`}>Keywords</h2>
      <div className="flex flex-col rounded-xl bg-gray-50 p-2">
        <div className="bg-white p-4 text-sm">
          {keywords.map((keyword) => keyword.keyword).join(', ')}
        </div>
      </div>
    </div>
  );
}
