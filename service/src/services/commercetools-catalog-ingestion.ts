import Bottleneck from 'bottleneck';
import { logger } from '../utils/logger.utils';
import { createApiRoot } from '../client/create.client';
import { readConfiguration } from '../utils/config.utils';

interface BloomreachProduct {
  product_id: string;
  sku: string;
  name: string;
  description: string;
  slug: string;
  price: number;
  image: string;
  attributes: Record<string, string>;
}

export async function commercetoolsCatalogIngestion() {
  logger.info('Service called! > catalogIngestion');
  let _continue = true;
  let offset = 0;

  const { bloomreachEngagementCatalogLocale: locale } = readConfiguration();
  const products: BloomreachProduct[] = [];
  const limit = 500;
  const apiRoot = createApiRoot();
  const limiter = new Bottleneck({
    maxConcurrent: 1,
    minTime: 300,
  });

  const getProducts = limiter.wrap(
    async (params: { limit: number; offset: number }) => {
      logger.info(`Getting products... ${params.limit} ; ${params.offset}`);
      return await apiRoot
        .products()
        .get({ queryArgs: { limit: params.limit, offset: params.offset } })
        .execute();
    }
  );

  while (_continue) {
    const response = await getProducts({ limit, offset });
    const data = response.body.results.map((product) => {
      const attributesMap: Record<string, string> = {};
      product.masterData.current.masterVariant.attributes?.forEach(
        (attribute) => {
          if (attribute.value?.key) {
            attributesMap[attribute.name] = attribute.value.label;
          }
        }
      );

      const _product: BloomreachProduct = {
        product_id: product.id,
        sku: product.masterData.current.masterVariant.sku ?? '',
        name: product.masterData.current.name[locale] ?? '',
        description: product.masterData.current.description?.[locale] ?? '',
        slug: product.masterData.current.slug[locale] ?? '',
        price:
          product.masterData.current.masterVariant.prices?.[0]?.value
            .centAmount ?? 0,
        image: product.masterData.current.masterVariant.images?.[0]?.url ?? '',
        attributes: attributesMap,
      };

      return _product;
    });
    products.push(...data);
    offset += limit;
    if (products.length >= (response.body.total ?? 0)) {
      _continue = false;
    }
  }

  return products;
}
