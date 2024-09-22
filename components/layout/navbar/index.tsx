import CartModal from 'components/cart/modal';
import LogoSquare from 'components/logo-square';
import { getMenu } from 'lib/shopify';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { Suspense } from 'react';
import { Account } from './account';
import MobileMenu from './mobile-menu';
import Search, { SearchSkeleton } from './search';
import { getTranslations } from 'next-intl/server';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { Annoucements } from './annoucements';

const { SITE_NAME } = process.env;

export async function Navbar() {
  // const menu = await getMenu('main-menu');
  const t = await getTranslations();

  const menu = [
    { title: t('index.lDadUs190AL4V9zr1SDB8'), path: '/search' },
    { title: t('index.y4FJVudTI8vkGwI-Nvlkd'), path: '/contact' }
  ];

  return (
    <>
     <Annoucements />
      {/*  */}
      <nav className="sticky top-0 z-10 mx-auto flex flex-col space-y-4 max-w-screen-2xl px-4 py-4 backdrop-blur bg-white/80">
        {/* <div className="block flex-none md:hidden">
          <Suspense fallback={null}>
            <MobileMenu menu={menu} />
          </Suspense>
        </div> */}
        <div className="flex lg:grid lg:grid-cols-12 items-center justify-between">
          <div className="flex items-center justify-center col-span-2">
            <Link href="/" prefetch={true} className="">
              <LogoSquare />
            </Link>
          </div>
          <div className="hidden lg:flex w-full justify-center col-span-8">
            <Suspense fallback={<SearchSkeleton />}>
              <Search />
            </Suspense>
          </div>
          <div className="flex justify-end space-x-2 col-span-2">
            <Account />
            <CartModal />
          </div>
        </div>
        <div className="lg:hidden w-full justify-center">
          <Suspense fallback={<SearchSkeleton />}>
            <Search />
          </Suspense>
        </div>
      </nav>
    </>
  );
}
