import { getTranslations } from 'next-intl/server';

async function NotFoundPage() {
    const t = await getTranslations();

  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-primary">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {t('not-found.ifC1Nx8vBCs92d1C3ELUi')}
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          {t('not-found.S7_aWEiXj8VpcNWSTVH04')}
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="#"
            className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {t('not-found.BFjUQ4UE4wdzEciq_asth')}
          </a>
          <a href="#" className="text-sm font-semibold text-gray-900">
            {t('not-found.JFE46WONlYqUNNkCsEsQI')} <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </main>
  );
}

export default NotFoundPage;
