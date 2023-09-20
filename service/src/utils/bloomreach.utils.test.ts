import {
  getBloomreachAuthHeader,
  getBloomreachCustomerImportName,
  getBloomreachProductImportName,
  getBloomreachProjectToken,
  getBloomreachVariantImportName,
} from './bloomreach.utils';

// Mock the readConfiguration function
jest.mock('./config.utils', () => ({
  readConfiguration: jest.fn(() => ({
    bloomreachEngagementApiKey: 'mockApiKey',
    bloomreachEngagementApiSecret: 'mockApiSecret',
    bloomreachEngagementProjectToken: 'mockProjectToken',
    projectKey: 'mockProjectKey',
  })),
}));

describe('getBloomreachAuthHeader', () => {
  it('should return a valid Basic Auth header', () => {
    const authHeader = getBloomreachAuthHeader();
    expect(authHeader).toEqual('Basic bW9ja0FwaUtleTptb2NrQXBpU2VjcmV0');
  });
});

describe('getBloomreachProjectToken', () => {
  it('should return the project token', () => {
    const projectToken = getBloomreachProjectToken();
    expect(projectToken).toEqual('mockProjectToken');
  });
});

describe('getBloomreachProductImportName', () => {
  it('should return the product import name', () => {
    const productImportName = getBloomreachProductImportName();
    expect(productImportName).toEqual('CT Products (mockProjectKey)');
  });
});

describe('getBloomreachVariantImportName', () => {
  it('should return the variant import name', () => {
    const variantImportName = getBloomreachVariantImportName();
    expect(variantImportName).toEqual('CT Variants (mockProjectKey)');
  });
});

describe('getBloomreachCustomerImportName', () => {
  it('should return the customer import name', () => {
    const customerImportName = getBloomreachCustomerImportName();
    expect(customerImportName).toEqual('CT Customers (mockProjectKey)');
  });
});
