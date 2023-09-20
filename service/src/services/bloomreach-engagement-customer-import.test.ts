import fetchMock from 'jest-fetch-mock';
import { bloomreachEngagementCustomerImport } from './bloomreach-engagement-customer-import';

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
    getBloomreachCustomerImportName: jest
      .fn()
      .mockReturnValue('mockCustomerImportName'),
  };
});

// Mock the logger
jest.mock('../utils/logger.utils', () => ({
  logger: {
    info: jest.fn(),
  },
}));

describe('bloomreachEngagementCustomerImport', () => {
  beforeAll(() => {
    fetchMock.enableMocks();
  });

  afterAll(() => {
    fetchMock.disableMocks();
  });

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should create a Bloomreach Engagement Customer Import', async () => {
    const mockResponseData = {
      import_id: '123456',
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponseData));

    const applicationUrl = 'https://example.com';
    const triggerType = 'now';

    const result = await bloomreachEngagementCustomerImport({
      applicationUrl,
      triggerType,
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
          name: 'mockCustomerImportName',
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
            import_url: `${applicationUrl}/customers`,
            auth: {
              username: 'mockProjectKey',
              password: 'mockBasicAuthSecret',
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

    // Verify that the logger was called with the expected message
    expect(require('../utils/logger.utils').logger.info).toHaveBeenCalledWith(
      `Engagement Customer Import Success: ${JSON.stringify(mockResponseData)}`
    );
  });
});
