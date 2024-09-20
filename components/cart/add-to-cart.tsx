'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { addItem } from 'components/cart/actions';
import { useProduct } from 'components/product/product-context';
import { Product, ProductVariant } from 'lib/shopify/types';
import { useFormState } from 'react-dom';
import { useCart } from './cart-context';
import { Button } from '../ui/button';
import { useTranslations } from 'next-intl';

function SubmitButton({
  availableForSale,
  selectedVariantId
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
}) {
  const t = useTranslations();

  const buttonClasses = '';
  const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60';

  if (!availableForSale) {
    return (
      <Button size="lg" disabled className={clsx(buttonClasses, disabledClasses)}>
        {t('add-to-cart.XjC-PN8Yi2hgQ_lf2qPI7')}
      </Button>
    );
  }

  if (!selectedVariantId) {
    return (
      <Button
        size="lg"
        aria-label={t('add-to-cart.r3MJ1V_glcxFYeAM5hl-p')}
        disabled
        className={clsx(buttonClasses, disabledClasses)}
      >
        {/* <div className="absolute left-0 ml-4">
          <PlusIcon className="h-5" />
        </div> */}
        {t('add-to-cart.glsnXf5zlv-expnOwZ1TO')}
      </Button>
    );
  }

  return (
    <Button size="lg">
      {/* <div className="absolute left-0 ml-4">
        <PlusIcon className="h-5" />
      </div> */}
      {t('add-to-cart.glsnXf5zlv-expnOwZ1TO')}
    </Button>
  );
}

export function AddToCart({ product }: { product: Product }) {
  const { variants, availableForSale } = product;
  const { addCartItem } = useCart();
  const { state } = useProduct();
  const [message, formAction] = useFormState(addItem, null);

  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every((option) => option.value === state[option.name.toLowerCase()])
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  const actionWithVariant = formAction.bind(null, selectedVariantId);
  const finalVariant = variants.find((variant) => variant.id === selectedVariantId)!;

  return (
    <form
      action={async () => {
        addCartItem(finalVariant, product);
        await actionWithVariant();
      }}
    >
      <SubmitButton availableForSale={availableForSale} selectedVariantId={selectedVariantId} />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
