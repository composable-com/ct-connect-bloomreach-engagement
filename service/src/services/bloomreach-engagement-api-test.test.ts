import fetchMock from 'jest-fetch-mock';
import { bloomreachEngagementApiTest } from './bloomreach-engagement-api-test';

jest.mock('../utils/bloomreach.utils', () => {
  return {
    getBloomreachProjectToken: jest.fn().mockReturnValue('mockProjectToken'),
    getBloomreachAuthHeader: jest.fn().mockReturnValue('mockAuthHeader'),
  };
});

describe('bloomreachEngagementApiTest', () => {
  beforeAll(() => {
    fetchMock.enableMocks();
  });

  afterAll(() => {
    fetchMock.disableMocks();
  });

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should make a POST request to the Bloomreach API with valid data', async () => {
    const mockResponseData = {
      success: true,
      errors: [],
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponseData));

    const result = await bloomreachEngagementApiTest();

    expect(result).toEqual(mockResponseData);

    expect(fetchMock).toHaveBeenCalledWith(
      `https://api-engagement.bloomreach.com/track/v2/projects/mockProjectToken/customers/events`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'mockAuthHeader',
        },
        body: JSON.stringify({
          customer_ids: {
            registered: 'api-test@test.test',
          },
          event_type: 'consent',
          timestamp: 1620139769,
          properties: {
            action: 'reject',
            category: 'sms_marketing',
          },
        }),
      }
    );
  });
});
