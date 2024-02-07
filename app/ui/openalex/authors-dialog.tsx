'use client';

import { Virtuoso } from 'react-virtuoso';
import { Authorship } from '@/app/lib/work';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CardContent } from './author-card';

export function AuthorsDialog({ authors }: { authors: Authorship[] }) {
  function renderRow(index: number) {
    return (
      <div key={index}>
        <CardContent author={authors[index]} />
      </div>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" size={'sm'}>
          Show More
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Institutions</DialogTitle>
          <DialogDescription>
            The Affiliations information of Authors available in openalex.
          </DialogDescription>
        </DialogHeader>
        <div className="flex">
          <div className="shrink grow basis-auto">
            <Virtuoso
              style={{ height: '400px' }}
              totalCount={authors.length}
              itemContent={(index: number) => renderRow(index)}
            />
          </div>
        </div>
        <DialogFooter>
          {/* <Button type="submit">Save changes</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
