import { commercetoolsCustomerIngestion } from './commercetools-customer-ingestion';

jest.mock('../utils/logger.utils', () => ({
  logger: {
    info: jest.fn(),
  },
}));

// Mock the createApiRoot function
jest.mock('../client/create.client', () => {
  return {
    createApiRoot: jest.fn(() => ({
      customers: jest.fn(() => ({
        get: jest.fn(() => ({
          execute: jest.fn(() => ({
            body: {
              results: [
                {
                  id: 'customer1',
                  email: 'email1@email.test',
                  firstName: 'First name 1',
                  lastName: 'Last name 1',
                },
                {
                  id: 'customer2',
                  email: 'email2@email.test',
                  firstName: 'First name 2',
                  lastName: 'Last name 2',
                },
              ],
              total: 2,
            },
          })),
        })),
      })),
    })),
  };
});

describe('commercetoolsCustomerIngestion', () => {
  it('should return customers', async () => {
    // Call the function you want to test
    const result = await commercetoolsCustomerIngestion();

    // Add your assertions here based on the expected behavior
    expect(result).toEqual([
      {
        customer_id: 'customer1',
        email: 'email1@email.test',
        first_name: 'First name 1',
        last_name: 'Last name 1',
      },
      {
        customer_id: 'customer2',
        email: 'email2@email.test',
        first_name: 'First name 2',
        last_name: 'Last name 2',
      },
    ]);
  });
});
