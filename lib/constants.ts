import { getTranslations } from 'next-intl/server';

export type SortFilterItem = {
  title: string;
  slug: string | null;
  sortKey: 'RELEVANCE' | 'BEST_SELLING' | 'CREATED_AT' | 'PRICE';
  reverse: boolean;
};

export const defaultSort: SortFilterItem = {
  title: '搜索结果',
  slug: null,
  sortKey: 'RELEVANCE',
  reverse: false
};

export const sorting: SortFilterItem[] = [
  defaultSort,
  { title: '热卖中', slug: 'trending-desc', sortKey: 'BEST_SELLING', reverse: false }, // asc
  { title: '最新发布', slug: 'latest-desc', sortKey: 'CREATED_AT', reverse: true },
  { title: '价格：从低到高', slug: 'price-asc', sortKey: 'PRICE', reverse: false }, // asc
  { title: '价格：从高到低', slug: 'price-desc', sortKey: 'PRICE', reverse: true }
];

export const TAGS = {
  collections: 'collections',
  products: 'products',
  cart: 'cart'
};

export const HIDDEN_PRODUCT_TAG = 'nextjs-frontend-hidden';
export const DEFAULT_OPTION = 'Default Title';
export const SHOPIFY_GRAPHQL_API_ENDPOINT = '/api/2023-01/graphql.json';
