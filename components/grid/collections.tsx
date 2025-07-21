import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { defaultSort, sorting } from 'lib/constants';
import { getCollectionProducts, getAllCollections } from 'lib/shopify';
import Link from 'next/link';

export async function Collections() {
  // const products = await getCollectionProducts({ collection: params.collection, sortKey, reverse });
  // console.log('products', products);
  const collections = (await getAllCollections()) as any;
  console.log('collections', collections);
  return (
    <>
      <div className="grid gap-4 lg:grid-cols-6">
        {collections.map((collection, i) => (
          <Link
            className="relative inline-block h-full w-full"
            href={`/collection/${collection.handle}`}
            prefetch={true}
          >
            <div className="space-y-2 rounded-2xl pb-2 ring-primary transition-all hover:ring">
              <div className="space-y-2">
                <img
                  className="h-64 w-full rounded-2xl bg-gray-100 object-contain"
                  src={collection?.image?.src}
                />
                <h1 className="px-2 font-medium">{collection.title}</h1>
              </div>

              <div className="flex items-center space-x-2 px-2">
                <b className="text-primary">{collection.description}</b>
                <span className="ml-2 whitespace-nowrap rounded bg-primary px-1 py-0.5 text-xs text-white">
                  新品上市
                </span>
                {/* <p className="text-sm text-gray-600"></p> */}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
