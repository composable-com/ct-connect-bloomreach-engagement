import { Request, Response } from 'express';
import fetchMock from 'jest-fetch-mock';
import * as bloomreachEngagementEvent from '../services/bloomreach-engagement-event';
import { post } from './event.controller';

// Initialize fetchMock
fetchMock.enableMocks();

// Mock your logger, readConfiguration, and other dependencies as needed
jest.mock('../utils/logger.utils', () => ({
  logger: {
    info: jest.fn(),
  },
}));

jest.mock('../utils/config.utils', () => ({
  readConfiguration: jest.fn(() => ({
    projectKey: 'mockProjectKey', // Replace with your project key
  })),
}));

// Mock the request and response objects
const mockRequest = {} as Request;
const mockResponse = {
  status: jest.fn(),
  send: jest.fn(),
} as unknown as Response;

describe('post', () => {
  beforeEach(() => {
    // Reset fetchMock and clear any mock function calls
    fetchMock.resetMocks();
    jest.clearAllMocks();
  });

  it('should process OrderCreated event and call bloomreachEngagementEvent', async () => {
    // Mock the request body with a sample OrderCreated event
    mockRequest.body = {
      message: {
        data: Buffer.from(
          JSON.stringify({
            type: 'OrderCreated',
            order: {
              customerEmail: 'customer@example.com',
              id: 'order123',
              lineItems: [{ productId: 'product123', quantity: 1 }],
              totalPrice: { centAmount: 100, currencyCode: 'USD' },
              paymentInfo: 'credit_card',
              shippingInfo: {
                shippingMethodName: 'standard',
                price: { centAmount: 10, currencyCode: 'USD' },
              },
              shippingAddress: {
                country: 'US',
                city: 'New York',
              },
              discountCodes: [
                {
                  discountCode: {
                    obj: {
                      code: 'voucher123',
                    },
                  },
                },
              ],
              // Add other necessary properties here
            },
          })
        ).toString('base64'),
      },
    };

    // Mock the bloomreachEngagementEvent function
    const bloomreachEngagementEventMock = jest.spyOn(
      bloomreachEngagementEvent,
      'bloomreachEngagementEvent'
    );

    // Mock the fetch response
    fetchMock.mockResponseOnce(JSON.stringify({ success: true, errors: [] }));

    // Call the post function
    await post(mockRequest, mockResponse);

    // Expectations
    expect(bloomreachEngagementEventMock).toHaveBeenCalledWith({
      customerIds: 'customer@example.com',
      eventType: 'purchase',
      properties: {
        local_currency: 'USD',
        payment_type: 'credit_card',
        product_ids: ['product123'],
        purchase_id: 'order123',
        purchase_source_name: 'mockProjectKey',
        shipping_city: 'New York',
        shipping_cost: 10,
        shipping_country: 'US',
        shipping_type: 'standard',
        total_price: 100,
        total_quantity: 1,
        voucher_code: 'voucher123',
      },
    });
  });

  it('should handle error gracefully', async () => {
    // Mock the request body with an invalid event
    mockRequest.body = {
      message: {
        data: 'invalid_base64_data',
      },
    };

    // Call the post function
    await post(mockRequest, mockResponse);

    // Expectations
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.send).toHaveBeenCalled();
  });
});
