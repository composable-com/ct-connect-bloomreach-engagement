import {
  getBloomreachAuthHeader,
  getBloomreachProductImportName,
  getBloomreachProjectToken,
  getBloomreachVariantImportName,
} from '../utils/bloomreach.utils';
import { readConfiguration } from '../utils/config.utils';
import { logger } from '../utils/logger.utils';

/**
 * This function creates a Bloomreach Engagement Product Import.
 * It is used to import products from a CSV file.
 * https://documentation.bloomreach.com/engagement/reference/create-import
 */
export async function bloomreachEngagementProductImport(params: {
  applicationUrl: string;
  triggerType: 'now' | 'scheduled';
  path: 'products' | 'variants';
}) {
  const { projectKey, basicAuthSecret } = readConfiguration();
  const config = {
    products: {
      name: getBloomreachProductImportName(),
      catalog_name: `CT Products (${projectKey})`,
      import_url: `${params.applicationUrl}/service/products`,
    },
    variants: {
      name: getBloomreachVariantImportName(),
      catalog_name: `CT Variants (${projectKey})`,
      import_url: `${params.applicationUrl}/service/variants`,
    },
  };

  const res = await fetch(
    `https://api-engagement.bloomreach.com/imports/v1/${getBloomreachProjectToken()}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getBloomreachAuthHeader(),
      },
      body: JSON.stringify({
        name: config[params.path].name,
        trigger: {
          trigger_type: params.triggerType,
          frequency: 'daily',
          times: [
            {
              hour: 0,
              minute: 0,
            },
          ],
          days: [],
          minutes: [],
          timezone: 'UTC',
          from_date: null,
          to_date: null,
        },
        active: true,
        source: {
          source_type: 'url',
          import_url: config[params.path].import_url,
          auth: {
            username: projectKey,
            password: basicAuthSecret,
          },
        },
        destination: {
          catalog_destination: {
            catalog_name: config[params.path].catalog_name,
            catalog_attributes: {
              catalog_type: 'product',
            },
          },
        },
        mapping: {
          tz_info: 'UTC',
          column_mapping: {
            id_mappings: [
              {
                from_column: 'product_id',
                to_id: 'registered',
                type: 'text',
              },
            ],
            property_mappings: [
              {
                from_column: 'product_id',
                to_column: 'item_id',
                type: 'text',
              },
              {
                from_column: 'sku',
                to_column: 'product_id',
                type: 'text',
                searchable: true,
              },
              {
                from_column: 'name',
                to_column: 'title',
                type: 'text',
                searchable: true,
              },
              {
                from_column: 'slug',
                to_column: 'url',
                type: 'text',
                searchable: true,
              },
              {
                from_column: 'description',
                to_column: 'description',
                type: 'text',
                searchable: true,
              },
              {
                from_column: 'image',
                to_column: 'image',
                type: 'text',
                searchable: true,
              },
              {
                from_column: 'price',
                to_column: 'price',
                type: 'number',
              },
            ],
          },
        },
      }),
    }
  );

  const data = (await res.json()) as unknown as {
    import_id: string;
  };

  logger.info(`'Engagement Product Import Success:  ${JSON.stringify(data)}`);

  return data;
}
