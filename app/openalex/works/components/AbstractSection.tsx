'use client';

import { useState } from "react"
import { FileTextIcon } from 'lucide-react';

import { Button } from "@/components/ui/button"

import { reconstructAbstract } from '@/app/lib/utils';

interface AbstractSectionProps {
  abstract_inverted_index?: Record<string, number[]> | null | undefined;
}

export function AbstractSection({ abstract_inverted_index }: AbstractSectionProps) {
  const abstract = reconstructAbstract(abstract_inverted_index)
  const [showFullText, setShowFullText] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <FileTextIcon className="h-5 w-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Abstract</h2>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="prose max-w-none flex flex-col justify-start">
          <p className={`line-clamp-5 text-gray-700 leading-relaxed ${showFullText ? "line-clamp-none" : ""}`}>
            {abstract}
          </p>
          <Button variant="link" onClick={() => setShowFullText(!showFullText)} className="text-sm text-primary p-0">
            {showFullText ? "Show Less" : "Show More"}
          </Button>
        </div>
      </div>
    </div>
  );
} 