'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FileTextIcon } from 'lucide-react';

interface AbstractSectionProps {
  abstract?: string | null;
}

export function AbstractSection({ abstract }: AbstractSectionProps) {
  if (!abstract) return null;
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <FileTextIcon className="h-5 w-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Abstract</h2>
      </div>
      
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed">
            {abstract}
          </p>
        </div>
      </div>
    </div>
  );
} 