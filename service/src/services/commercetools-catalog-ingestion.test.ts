import fetchMock from 'jest-fetch-mock';
import { logger } from '../utils/logger.utils';
import { commercetoolsCatalogIngestion } from './commercetools-catalog-ingestion';

// Mock createApiRoot
jest.mock('../client/create.client', () => ({
  createApiRoot: jest.fn().mockReturnValue({
    products: jest.fn().mockReturnValue({
      get: jest.fn().mockReturnValue({
        execute: jest.fn().mockResolvedValueOnce({
          body: {
            total: 2,
            results: [
              {
                id: 'product1',
                masterData: {
                  current: {
                    name: { en: 'Product 1' },
                    description: { en: 'Description 1' },
                    slug: { en: 'product-1' },
                    masterVariant: {
                      sku: 'SKU1',
                      prices: [{ value: { centAmount: 1000 } }],
                      images: [{ url: 'image1.jpg' }],
                      attributes: [
                        { name: 'Color', value: { key: 'red', label: 'Red' } },
                      ],
                    },
                  },
                },
              },
              {
                id: 'product2',
                masterData: {
                  current: {
                    name: { en: 'Product 2' },
                    description: { en: 'Description 2' },
                    slug: { en: 'product-2' },
                    masterVariant: {
                      sku: 'SKU2',
                      prices: [{ value: { centAmount: 2000 } }],
                      images: [{ url: 'image2.jpg' }],
                      attributes: [
                        { name: 'Color', value: { key: 'blue', label: 'Blue' } },
                      ],
                    },
                  },
                },
              },
            ],
          },
        }),
      }),
    }),
  }),
}));

// Mock readConfiguration
jest.mock('../utils/config.utils', () => {
  return {
    readConfiguration: jest.fn().mockReturnValue({
      bloomreachEngagementCatalogLocale: 'en',
    }),
  };
});

// Mock the logger
jest.mock('../utils/logger.utils', () => ({
  logger: {
    info: jest.fn(),
  },
}));

describe('commercetoolsCatalogIngestion', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should fetch products and return the expected data', async () => {
    // Mock any other dependencies as needed (e.g., createApiRoot, readConfiguration, etc.)

    const products = await commercetoolsCatalogIngestion();

    expect(products).toEqual([
      {
        product_id: 'product1',
        sku: 'SKU1',
        name: 'Product 1',
        description: 'Description 1',
        slug: 'product-1',
        price: 1000,
        image: 'image1.jpg',
        attributes: { Color: 'Red' },
      },
      {
        product_id: 'product2',
        sku: 'SKU2',
        name: 'Product 2',
        description: 'Description 2',
        slug: 'product-2',
        price: 2000,
        image: 'image2.jpg',
        attributes: { Color: 'Blue' },
      },
    ]);

    // Ensure that logger.info is called with the expected message
    expect(logger.info).toHaveBeenCalledWith(
      'Service called! > catalogIngestion'
    );
  });
});
