import Footer from 'components/layout/footer';
import Collections from 'components/layout/search/collections';
import FilterList from 'components/layout/search/filter';
import { sorting } from 'lib/constants';
import ChildrenWrapper from './children-wrapper';
import { useTranslations } from 'next-intl';

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations();

  return (
    <>
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 pb-4 text-black md:flex-row dark:text-white">
        <div className="order-first w-full flex-none md:max-w-[125px]">
          <Collections />
        </div>
        <div className="order-last min-h-screen w-full md:order-none">
          <ChildrenWrapper>{children}</ChildrenWrapper>
        </div>
        <div className="order-none flex-none md:order-last md:w-[125px]">
          <FilterList list={sorting} title={t('layout.czIMNvnlAqD_vBdr64RkK')} />
        </div>
      </div>
    </>
  );
}
