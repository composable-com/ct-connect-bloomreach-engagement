import fetchMock from 'jest-fetch-mock';
import { commercetoolsCatalogVariantsIngestion } from './commercetools-catalog-variants-ingestion';

jest.mock('../utils/logger.utils', () => ({
  logger: {
    info: jest.fn(),
  },
}));

jest.mock('../client/create.client', () => ({
  createApiRoot: jest.fn().mockReturnValue({
    products: jest.fn().mockReturnValue({
      get: jest.fn().mockReturnValue({
        execute: jest.fn().mockResolvedValueOnce({
          body: {
            total: 1,
            results: [
              {
                id: 'product1',
                masterData: {
                  current: {
                    name: {
                      en: 'Product 1',
                    },
                    description: {
                      en: 'Product 1 Description',
                    },
                    slug: {
                      en: 'product-1',
                    },
                    variants: [
                      {
                        sku: 'variant-sku',
                        attributes: [
                          {
                            name: 'Color',
                            value: {
                              label: 'Red',
                              key: 'red',
                            },
                          },
                        ],
                      },
                    ],
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

jest.mock('../utils/config.utils', () => {
  return {
    readConfiguration: jest.fn().mockReturnValue({
      bloomreachEngagementCatalogLocale: 'en',
    }),
  };
});

describe('commercetoolsCatalogVariantsIngestion', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fetchMock.resetMocks();
  });

  it('should fetch and process products correctly', async () => {
    // Mock any other dependencies and configuration as needed

    // Call the function and await its result
    const result = await commercetoolsCatalogVariantsIngestion();

    // Your assertions based on the expected result
    expect(result).toEqual([
      {
        product_id: 'product1_variant-sku',
        parent_id: 'product1',
        sku: 'variant-sku',
        name: 'Product 1 (Red)',
        description: 'Product 1 Description',
        slug: 'product-1',
        price: 0,
        image: '',
        attributes: {
          Color: 'Red',
        },
      },
    ]);
  });
});
