'use client';

import { GroupBy } from '@/app/lib/definitions';
import { formatCompactNumber } from '@/app/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export default function SimpleCheckboxSection({
  item,
  filterKey,
}: {
  item: GroupBy;
  filterKey: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = (checked: boolean) => {
    const params = new URLSearchParams(searchParams);
    let currentFilter = params.get(filterKey)?.split('|') ?? [];
    let currentItem = item.key.startsWith('https://')
      ? (item.key.split('/').pop() as string)
      : item.key;

    if (checked) {
      currentFilter = [...currentFilter, currentItem];
    } else {
      currentFilter.splice(currentFilter.indexOf(currentItem), 1);
    }

    params.set('page', '1');

    if (currentFilter.length) {
      params.set(filterKey, currentFilter.join('|'));
    } else {
      params.delete(filterKey);
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center py-1">
      <Checkbox
        className="mr-2"
        id={item.key}
        checked={(searchParams.get(filterKey)?.split('|') || []).includes(
          item.key.startsWith('https://')
            ? (item.key.split('/').pop() as string)
            : item.key,
        )}
        onCheckedChange={(e) => handleChange(e as boolean)}
      />
      <label
        htmlFor={item.key}
        title={item.key_display_name}
        className="line-clamp-1 grow text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {item.key_display_name}
      </label>
      <span className="text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        ({formatCompactNumber(item.count)})
      </span>
    </div>
  );
}
