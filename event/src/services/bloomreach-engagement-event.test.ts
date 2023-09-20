import fetchMock from 'jest-fetch-mock';
import { bloomreachEngagementEvent } from './bloomreach-engagement-event'

jest.mock('../utils/bloomreach.utils', () => {
  return {
    getBloomreachProjectToken: jest.fn().mockReturnValue('mockProjectToken'),
    getBloomreachAuthHeader: jest.fn().mockReturnValue('mockAuthHeader'),
  };
});

// Initialize fetchMock
fetchMock.enableMocks();

describe('bloomreachEngagementEvent', () => {
  beforeEach(() => {
    // Reset fetchMock for each test
    fetchMock.resetMocks();
  });

  it('should make a POST request to the Bloomreach API and return data', async () => {
    const customerIds = '123456';
    const eventType = 'purchase';
    const properties = { product: 'example' };
    const expectedData = { success: true, errors: [] };

    // Mock the fetch response
    fetchMock.mockResponseOnce(JSON.stringify(expectedData));

    const result = await bloomreachEngagementEvent({
      customerIds,
      eventType,
      properties,
    });

    expect(result).toEqual(expectedData);

    // Check if fetch was called with the correct URL, headers, and body
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/projects/mockProjectToken/customers/events'),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'mockAuthHeader',
        },
        body: JSON.stringify({
          customer_ids: {
            registered: customerIds,
          },
          properties,
          event_type: eventType,
        }),
      }
    );
  });

  // Add more test cases if needed
});
