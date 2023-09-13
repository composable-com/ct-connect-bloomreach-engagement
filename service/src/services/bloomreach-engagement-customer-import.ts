import {
  getBloomreachAuthHeader,
  getBloomreachCustomerImportName,
  getBloomreachProjectToken,
} from '../utils/bloomreach.utils';
import { readConfiguration } from '../utils/config.utils';
import { logger } from '../utils/logger.utils';

/**
 * This function creates a Bloomreach Engagement Customer Import.
 * It is used to import customers from a CSV file.
 * https://documentation.bloomreach.com/engagement/reference/create-import
 */
export async function bloomreachEngagementCustomerImport(params: {
  applicationUrl: string;
  triggerType: 'now' | 'scheduled';
}) {
  const { projectKey, basicAuthSecret } = readConfiguration();
  const res = await fetch(
    `https://api-engagement.bloomreach.com/imports/v1/${getBloomreachProjectToken()}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getBloomreachAuthHeader(),
      },
      body: JSON.stringify({
        name: getBloomreachCustomerImportName(),
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
          import_url: `${params.applicationUrl}/customers`,
          auth: {
            username: projectKey,
            password: basicAuthSecret,
          },
        },
        destination: {
          customer_destination: {},
        },
        mapping: {
          tz_info: 'UTC',
          column_mapping: {
            id_mappings: [
              {
                from_column: 'email',
                to_id: 'registered',
              },
            ],
            property_mappings: [
              {
                from_column: 'email',
                to_column: 'email',
                type: 'text',
              },
              {
                from_column: 'first_name',
                to_column: 'first_name',
                type: 'text',
              },
              {
                from_column: 'last_name',
                to_column: 'last_name',
                type: 'text',
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

  logger.info(`'Engagement Customer Import Success:  ${JSON.stringify(data)}`);

  return data;
}
