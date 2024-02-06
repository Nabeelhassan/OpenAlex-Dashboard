/**
 * v0 by Vercel.
 * @see https://v0.dev/t/KG0YpOEQ0xO
 */
import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function Component() {
  return (
    <div className="bg-white p-8">
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        <div className="flex-1 space-y-6">
          <div className="text-sm text-gray-500">
            DOI: 10.3322/CAAC.21660 · PMID: 33538338
          </div>
          <h1 className="text-2xl font-bold">
            Global Cancer Statistics 2020: GLOBOCAN Estimates of Incidence and
            Mortality Worldwide for 36 Cancers in 185 Countries.
          </h1>
          <div className="text-sm text-gray-500">
            A Cancer Journal for Clinicians, 2021
          </div>
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage
                alt="H Sung"
                src="/placeholder.svg?height=24&width=24"
              />
              <AvatarFallback>HS</AvatarFallback>
            </Avatar>
            <span className="text-sm">Hyuna Sung, </span>
            <span className="text-sm">Jacques Ferlay, </span>
            <span className="text-sm">Rebecca L. Siegel, </span>
            <span className="text-sm">Mathieu Laversanne, </span>
            <span className="text-sm">...3 authors</span>
          </div>
          <div className="text-sm text-gray-500">Affiliations</div>
          <ul className="list-disc pl-5 text-sm">
            <li>
              Surveillance and Health Equity Science, American Cancer Society,
              Atlanta, Georgia.
            </li>
            <li>
              Section of Cancer Surveillance, International Agency for Research
              on Cancer, Lyon, France.
            </li>
          </ul>
          <div className="flex items-center space-x-2">
            <Button
              className="border border-gray-300 text-gray-700"
              variant="outline"
            >
              Formatted Citation
            </Button>
            <Button
              className="border border-gray-300 text-gray-700"
              variant="outline"
            >
              Open Access
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <DollarSignIcon className="text-gray-500" />
              <span className="text-sm text-gray-500">$8582.21 RCR</span>
            </div>
            <div className="flex items-center space-x-2">
              <QuoteIcon className="text-gray-500" />
              <span className="text-sm text-gray-500">39774 Citations</span>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Abstract</h2>
            <p className="text-sm">
              This article provides an update on the global cancer burden using
              the GLOBOCAN 2020 estimates of cancer incidence and mortality
              produced by the International Agency for Research on Cancer.
              Worldwide, an estimated 19.3 million new cancer cases (18.1
              million excluding nonmelanoma skin cancer) and 10.0 million cancer
              deaths (9.9 million excluding nonmelanoma skin cancer) occurred in
              2020. Female breast cancer has surpassed lung cancer as the most
              diagnosed cancer, with an estimated 2.3 million new cases (11.7%),
              followed by lung (11.4%), colorectal (10%), prostate (7.3%), and
              stomach (5.6%) cancers. Lung cancer remained the leading cause of
              cancer death, with an estimated 1.8 million deaths (18%), followed
              by colorectal (9.4%), liver (8.3%), stomach (7.7%), and female
              breast (6.9%) cancers. The overall cancer incidence was more...
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">39774 Citations</h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  Overexpression of SLC7A5 is a potential prognostic biomarker
                  for lung adenocarcinoma
                </div>
                <ExternalLinkIcon className="text-gray-500" />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  A nomogram model combining ultrasound-based radiomics features
                  and clinicopathological factors to identify germline BRCA1/2
                  mutation in...
                </div>
                <ExternalLinkIcon className="text-gray-500" />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  Nasal-based drug delivery system as a treatment modality for
                  diverse diseases: Are we there yet?
                </div>
                <ExternalLinkIcon className="text-gray-500" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">208 References</h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm">COVID-19 and cancer.</div>
                <ExternalLinkIcon className="text-gray-500" />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  Convergence of decreasing male and increasing female incidence
                  rates in major tobacco-related cancers in Europe in 1988-2010.
                </div>
                <ExternalLinkIcon className="text-gray-500" />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  Global cancer transitions according to the Human Development
                  Index (2008-2030): a population-based study.
                </div>
                <ExternalLinkIcon className="text-gray-500" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Related Publications</h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  Global cancer statistics 2018: GLOBOCAN estimates of incidence
                  and mortality worldwide for 36 cancers in 185 countries.
                </div>
                <ExternalLinkIcon className="text-gray-500" />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  Estim...Global cancer statistics 2018: GLOBOCAN estimates of
                  incidence and mortality worldwide for 36 cancers in 185
                  countries.
                </div>
                <ExternalLinkIcon className="text-gray-500" />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  Global cancer statistics 2018: GLOBOCAN estimates of incidence
                  and mortality worldwide prostate cancers and their
                  relationship with the hum...
                </div>
                <ExternalLinkIcon className="text-gray-500" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full space-y-6 lg:w-96">
          <div className="sticky top-0 pt-8">
            <div className="space-y-4 rounded-lg bg-gray-100 p-4">
              <h2 className="text-lg font-semibold">Explore Intelligence</h2>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    CA A Cancer Journal for Clinicians
                  </div>
                  <Badge variant="secondary">482 Citations</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm">Mortality rate</div>
                  <Badge variant="secondary">3748 Citations</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm">Epidemiology of cancer</div>
                  <Badge variant="secondary">1748 Citations</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm">Cancer</div>
                  <Badge variant="secondary">1588 Citations</Badge>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm">World Health Organization</div>
                  <Badge variant="secondary">478 Citations</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    International Agency For Research On Cancer
                  </div>
                  <Badge variant="secondary">158 Citations</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm">American Cancer Society</div>
                  <Badge variant="secondary">82 Citations</Badge>
                </div>
              </div>
              <div className="space-y-2">
                <Link className="block text-sm" href="#">
                  https://doi.org/10.3322/CAAC.21660
                </Link>
                <Link className="block text-sm" href="#">
                  https://www.ncbi.nlm.nih.gov/pubmed/33538338
                </Link>
                <Link className="block text-sm" href="#">
                  https://onlinelibrary.wiley.com/doi/epdf/10.3322/caac.21660
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DollarSignIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function ExternalLinkIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" x2="21" y1="14" y2="3" />
    </svg>
  );
}

function QuoteIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
    </svg>
  );
}
