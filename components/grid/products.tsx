import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { defaultSort, sorting } from 'lib/constants';
import { getProducts } from 'lib/shopify';
import Link from 'next/link';

export async function Products() {
  const products = await getProducts({});

  return (
    <>
      <div className="grid lg:grid-cols-6 gap-4">
        {products.map((product, i) => (
          <Link
            className="relative inline-block h-full w-full"
            href={`/product/${product.handle}`}
            prefetch={true}
          >
            <div className="space-y-2 rounded-2xl pb-2 ring-primary transition-all hover:ring">
              <div className="space-y-2">
                <img
                  className="h-64 w-full rounded-2xl bg-gray-100 object-contain"
                  src={product.featuredImage.url}
                />
                <h1 className="px-2 font-medium">{product.title}</h1>
              </div>

              <div className="flex items-center space-x-2 px-2">
                <b className="text-primary">
                  {product.priceRange.maxVariantPrice.currencyCode}{' '}
                  {product.priceRange.maxVariantPrice.amount}
                </b>
                <p className="text-sm text-gray-600">15人购买</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
