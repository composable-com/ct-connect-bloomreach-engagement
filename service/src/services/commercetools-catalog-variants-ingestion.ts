import Bottleneck from 'bottleneck';
import { logger } from '../utils/logger.utils';
import { createApiRoot } from '../client/create.client';
import { readConfiguration } from '../utils/config.utils';

interface BloomreachVariant {
  product_id: string;
  parent_id: string;
  sku: string;
  name: string;
  description: string;
  slug: string;
  price: number;
  image: string;
  attributes: Record<string, string>;
}

export async function commercetoolsCatalogVariantsIngestion() {
  logger.info('Service called! > catalogVariantsIngestion');
  let _continue = true;
  let offset = 0;
  let count = 0;

  const { bloomreachEngagementCatalogLocale: locale } = readConfiguration();
  const variants: BloomreachVariant[] = [];
  const limit = 500;
  const apiRoot = createApiRoot();
  const limiter = new Bottleneck({
    maxConcurrent: 1,
    minTime: 300,
  });

  const getProducts = limiter.wrap(
    async (params: { limit: number; offset: number }) => {
      logger.info(`Getting variants... ${params.limit} ; ${params.offset}`);
      return await apiRoot
        .products()
        .get({ queryArgs: { limit: params.limit, offset: params.offset } })
        .execute();
    }
  );

  while (_continue) {
    const response = await getProducts({ limit, offset });
    response.body.results.forEach((product) => {
      product.masterData.current.variants.forEach((variant) => {
        const attributesLabel: string[] = [];
        const attributesMap: Record<string, string> = {};
        variant.attributes?.forEach((attribute) => {
          if (attribute.value?.key) {
            attributesMap[attribute.name] = attribute.value.label;
            attributesLabel.push(attribute.value.label);
          }
        });

        variants.push({
          product_id: `${product.id}_${variant.sku}`,
          parent_id: product.id,
          sku: variant.sku ?? '',
          name: `${
            product.masterData.current.name[locale] ?? ''
          } (${attributesLabel.join(' | ')})`,
          description: product.masterData.current.description?.[locale] ?? '',
          slug: product.masterData.current.slug[locale] ?? '',
          price: variant.prices?.[0]?.value.centAmount ?? 0,
          image: variant.images?.[0]?.url ?? '',
          attributes: attributesMap,
        });
      });
    });
    count = count + response.body.results.length;
    offset += limit;
    if (count >= (response.body.total ?? 0)) {
      _continue = false;
    }
  }

  return variants;
}
