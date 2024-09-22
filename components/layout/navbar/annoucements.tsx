'use client';
import { useTranslations } from 'next-intl';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

export function Annoucements() {
  const t = useTranslations();
  const [hide, setHide] = useState(false);

  if (hide) return null;
  return (
    <>
      <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2 sm:px-3.5 sm:before:flex-1">
        <div
          aria-hidden="true"
          className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        >
          <div
            style={{
              clipPath:
                'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)'
            }}
            className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#f97315] to-[#ffeb3b] opacity-30"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        >
          <div
            style={{
              clipPath:
                'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)'
            }}
            className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#f97315] to-[#ffeb3b] opacity-30"
          />
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="text-xs leading-6 text-gray-900">
            <strong className="hidden font-semibold lg:inline">ePray 2024</strong>
            <svg
              viewBox="0 0 2 2"
              aria-hidden="true"
              className="mx-2 hidden h-0.5 w-0.5 fill-current lg:inline"
            >
              <circle r={1} cx={1} cy={1} />
            </svg>
            6 月 7 日至 9 日在丹佛与我们一起了解接下来的动态
          </p>
          <a
            href="#"
            className="hidden flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 lg:flex"
          >
            立即注册 <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
        <div className="flex flex-1 justify-end">
          <button
            type="button"
            className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
            onClick={() => {
              setHide(true);
            }}
          >
            <span className="sr-only">Dismiss</span>
            <XMarkIcon aria-hidden="true" className="h-5 w-5 text-gray-900" />
          </button>
        </div>
      </div>
    </>
  );
}
