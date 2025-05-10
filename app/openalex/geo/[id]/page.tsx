import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CountryOverview } from '../components/CountryOverview';
import { ResearchOutputChart } from '../components/ResearchOutputChart';
// import { TopInstitutions } from '../components/TopInstitutions';
// import { CollaborationsNetwork } from '../components/CollaborationsNetwork';

export default function GeoDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto p-4">
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="research">Research Output</TabsTrigger>
          <TabsTrigger value="institutions">Top Institutions</TabsTrigger>
          <TabsTrigger value="collaborations">Collaborations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <CountryOverview countryCode={params.id} />
        </TabsContent>

        <TabsContent value="research">
          <ResearchOutputChart countryCode={params.id} />
        </TabsContent>
{/* 
        <TabsContent value="institutions">
          <TopInstitutions countryCode={params.id} />
        </TabsContent>

        <TabsContent value="collaborations">
          <CollaborationsNetwork countryCode={params.id} />
        </TabsContent> */}
      </Tabs>
    </div>
  );
}
