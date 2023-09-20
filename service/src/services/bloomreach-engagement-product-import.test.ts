import fetchMock from 'jest-fetch-mock';
import { bloomreachEngagementProductImport } from './bloomreach-engagement-product-import'

// Mock the logger
jest.mock('../utils/logger.utils', () => ({
  logger: {
    info: jest.fn(),
  },
}));

jest.mock('../utils/config.utils', () => {
  return {
    readConfiguration: jest.fn().mockReturnValue({
      projectKey: 'mockProjectKey',
      basicAuthSecret: 'mockBasicAuthSecret',
    }),
  };
});

jest.mock('../utils/bloomreach.utils', () => {
  return {
    getBloomreachProjectToken: jest.fn().mockReturnValue('mockProjectToken'),
    getBloomreachAuthHeader: jest.fn().mockReturnValue('mockAuthHeader'),
    getBloomreachProductImportName: jest
      .fn()
      .mockReturnValue('mockProductImportName'),
    getBloomreachVariantImportName: jest
      .fn()
      .mockReturnValue('mockVariantImportName'),
  };
});

describe('bloomreachEngagementProductImport', () => {
  beforeAll(() => {
    fetchMock.enableMocks();
  });

  afterAll(() => {
    fetchMock.disableMocks();
  });

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should create a Bloomreach Engagement Product Import', async () => {
    const mockResponseData = {
      import_id: '123456',
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponseData));

    const applicationUrl = 'https://example.com';
    const triggerType = 'now';
    const path = 'products'; // or 'variants'

    const result = await bloomreachEngagementProductImport({
      applicationUrl,
      triggerType,
      path,
    });

    expect(result).toEqual(mockResponseData);

    expect(fetchMock).toHaveBeenCalledWith(
      `https://api-engagement.bloomreach.com/imports/v1/mockProjectToken`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'mockAuthHeader',
        },
        body: JSON.stringify({
          name: "mockProductImportName",
          trigger: {
            trigger_type: triggerType,
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
            import_url: "https://example.com/products",
            auth: {
              username: 'mockProjectKey',
              password: 'mockBasicAuthSecret',
            },
          },
          destination: {
            catalog_destination: {
              catalog_name: "CT Products (mockProjectKey)",
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

    // Ensure that the logger was called with the expected message
    expect(require('../utils/logger.utils').logger.info).toHaveBeenCalledWith(
      `Engagement Product Import Success: ${JSON.stringify(mockResponseData)}`
    );
  });
});
