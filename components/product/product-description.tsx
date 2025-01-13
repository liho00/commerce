import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import Prose from 'components/prose';
import { Product } from 'lib/shopify/types';
import { VariantSelector } from './variant-selector';
import { Badge } from '@/components/ui/badge';
import { Star, DollarSign, Globe } from 'lucide-react';

export function ProductVariant({ product }: { product: Product }) {
  return (
    <>
      <div className="mt-2 mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-2xl">{product.title}</h1>
        <div className="mr-auto w-auto text-2xl">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
      </div>
      <VariantSelector options={product.options} variants={product.variants} />
      <AddToCart product={product} />
      {/* <h1 className="mb-2 text-2xl">{product.description}</h1> */}
    </>
  );
}

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <h1 className="mb-4 mt-8 px-4 text-2xl font-semibold dark:text-white">宝贝详情</h1>
      <hr />
      {product.descriptionHtml ? (
        <Prose
          className="mx-auto text-sm leading-tight text-gray-800 dark:text-white/[60%] py-8 max-w-screen-sm"
          html={product.descriptionHtml}
        />
      ) : null}
    </>
  );
}
