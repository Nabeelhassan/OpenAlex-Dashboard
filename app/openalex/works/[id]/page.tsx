import { fetchWorkById } from '@/app/lib/data';
import Abstract from '@/app/ui/openalex/abstract';
import Concepts from '@/app/ui/openalex/concepts';
import Header from '@/app/ui/openalex/header';
import Keywords from '@/app/ui/openalex/keywords';
import Component from '@/app/ui/openalex/test';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const data = await fetchWorkById(id);

  return (
    <div className="flex w-full flex-col">
      <Header {...data} />
      <div className="grid grid-cols-1 gap-6 md:mt-6">
        {data?.abstract_inverted_index && (
          <Abstract inverted_index={data.abstract_inverted_index} />
        )}
        <Keywords keywords={data.keywords} />
        <Concepts concepts={data.concepts} />
      </div>
    </div>
  );

  // return <Component />;
}
