import { getAllCollections, getCollection, getCollectionProducts } from 'lib/shopify';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { defaultSort, sorting } from 'lib/constants';
import { Gallery } from '@/components/product/gallery';
import { Suspense } from 'react';
import Image from 'next/image';

export async function generateMetadata({
  params
}: {
  params: { collection: string };
}): Promise<Metadata> {
  const collection = await getCollection(params.collection);
  console.log('collection', collection);

  if (!collection) return notFound();

  return {
    title: collection.seo?.title || collection.title,
    description:
      collection.seo?.description || collection.description || `${collection.title} products`
  };
}

export default async function CategoryPage({
  params,
  searchParams
}: {
  params: { collection: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { sort } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
  const products = await getCollectionProducts({ collection: params.collection, sortKey, reverse });
  // console.log('productsxxx', products);
  const collections = (await getAllCollections()) as any;
  const collection = collections.find(
    (c: any) => c.handle === decodeURIComponent(params.collection)
  );
  console.log('collectionxxxxx', collection);

  return (
    <section>
      {products.length === 0 ? (
        <p className="py-3 text-lg">{`No products found in this collection`}</p>
      ) : (
        <>
          <div className="mx-auto max-w-screen-xl rounded-2xl bg-white dark:bg-black">
            <div className="flex flex-col rounded-xl bg-gray-50 lg:flex-row lg:gap-8">
              <div className="h-full w-full basis-full lg:basis-3/6">
                {collection && (
                  <Suspense
                    fallback={
                      <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden" />
                    }
                  >
                    <div className="relative aspect-square h-full max-h-[350px] w-full overflow-hidden rounded-2xl bg-[#fafafa]">
                      <Image
                        className="h-full w-full object-contain"
                        fill
                        sizes="(min-width: 1024px) 66vw, 100vw"
                        alt={collection?.title as string}
                        src={collection?.image?.src as string}
                        priority={true}
                      />
                    </div>
                  </Suspense>
                )}
              </div>

              <div className="basis-full lg:basis-3/6">
                <div className="mb-6 mt-6 flex flex-col border-b pb-6 dark:border-neutral-700">
                  <h1 className="mb-2 text-2xl">{collection?.title}</h1>
                </div>
                <div className="mr-auto w-auto text-2xl">
                  {collection?.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 pr-5 pb-5">
                      {collection.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <Grid className="mt-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <ProductGridItems products={products} />
            </Grid>
          </div>
        </>
      )}
    </section>
  );
}
