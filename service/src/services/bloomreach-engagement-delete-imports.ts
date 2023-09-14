import {
  getBloomreachAuthHeader,
  getBloomreachCustomerImportName,
  getBloomreachProductImportName,
  getBloomreachProjectToken,
  getBloomreachVariantImportName,
} from '../utils/bloomreach.utils';
import { logger } from '../utils/logger.utils';

interface BloomreachEngagementImport {
  import_id: string;
  import_definition: {
    name: string;
    trigger: {
      trigger_type: string;
    };
    active: boolean;
    source: {
      source_type: string;
      import_url: string;
      use_socks_proxy: boolean;
      auth: null;
    };
    destination: {
      catalog_destination: {
        catalog_name: string;
        catalog_attributes: {
          catalog_type: string;
        };
      };
    };
    mapping: {
      tz_info: string;
      column_mapping: {
        id_mappings: Array<{
          from_column: string;
          to_id: string;
        }>;
        property_mappings: Array<{
          from_column: string;
          to_column: string;
          target_type: string;
          searchable: null | boolean;
          indexed: null | boolean;
        }>;
        timestamp_column: null;
      };
    };
  };
}

export async function bloomreachEngagementDeleteImports() {
  try {
    const bloomreachProductImportName = getBloomreachProductImportName();
    const bloomreachVariantImportName = getBloomreachVariantImportName();
    const bloomreachCustomerImportName = getBloomreachCustomerImportName();

    const importListResponse = await fetch(
      `https://api-engagement.bloomreach.com/imports/v1/${getBloomreachProjectToken()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: getBloomreachAuthHeader(),
        },
      }
    );

    const importList =
      (await importListResponse.json()) as unknown as BloomreachEngagementImport[];

    const ctConnectImports = importList.filter((importItem) => {
      const isProductImport =
        importItem.import_definition.name === bloomreachProductImportName;
      const isVariantImport =
        importItem.import_definition.name === bloomreachVariantImportName;
      const isCustomerImport =
        importItem.import_definition.name === bloomreachCustomerImportName;
      return isProductImport || isCustomerImport || isVariantImport;
    });

    await Promise.all(
      ctConnectImports.map((importItem) => {
        return fetch(
          `https://api-engagement.bloomreach.com/imports/v1/${getBloomreachProjectToken()}/${
            importItem.import_id
          }`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: getBloomreachAuthHeader(),
            },
          }
        );
      })
    );
  } catch (error) {
    logger.info(`Bloomreach Delete Imports Error: ${(error as Error).message}`);
  }
  return;
}
