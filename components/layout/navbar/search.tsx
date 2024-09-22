'use client';

import { Button } from '@/components/ui/button';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import Form from 'next/form';
import { useSearchParams } from 'next/navigation';
import WordRotate from '@/components/magicui/word-rotate';
import { useState } from 'react';

export default function Search() {
  const searchParams = useSearchParams();
  const t = useTranslations();
  const [q, setQ] = useState('');

  return (
    <Form action="/search" className="relative w-full">
      <input
        key={searchParams?.get('q')}
        type="text"
        name="q"
        autoComplete="off"
        defaultValue={searchParams?.get('q') || ''}
        onChange={(e) => {
          setQ(e.target.value);
        }}
        className="w-full rounded-lg bg-white px-3 py-2.5 text-sm text-black ring ring-primary placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
      />
      {!q && (
        <div className="pointer-events-none absolute bottom-0 left-0 top-0 flex h-full items-center justify-center pl-3">
          <WordRotate
            className="h-full text-neutral-500 opacity-50 dark:text-neutral-400 dark:opacity-50"
            words={[
              '金纸 / 金箔 / 金银纸',
              '龙香 / 佛香 / 佛珠',
              '香炉 / 灵符 / 佛像',
              '香品 / 香炉 / 香烛'
            ]}
          />
        </div>
      )}
      <div className="absolute right-0 top-0 flex h-full items-center justify-center pr-0.5">
        <Button className="px-6">搜索</Button>
      </div>
    </Form>
  );
}

export function SearchSkeleton() {
  return (
    <form className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
      <input
        placeholder="Search for products..."
        className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4" />
      </div>
    </form>
  );
}
