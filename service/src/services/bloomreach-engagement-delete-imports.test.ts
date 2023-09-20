import fetchMock from 'jest-fetch-mock';
import { bloomreachEngagementDeleteImports } from './bloomreach-engagement-delete-imports';

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
    getBloomreachCustomerImportName: jest
      .fn()
      .mockReturnValue('mockCustomerImportName'),
  };
});

describe('bloomreachEngagementDeleteImports', () => {
  beforeAll(() => {
    fetchMock.enableMocks();
  });

  afterAll(() => {
    fetchMock.disableMocks();
  });

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should delete Bloomreach Engagement imports', async () => {
    const mockImportList = [
      {
        import_id: 'import1',
        import_definition: {
          name: 'mockProductImportName',
          // ... other import_definition properties
        },
      },
      {
        import_id: 'import2',
        import_definition: {
          name: 'mockVariantImportName',
          // ... other import_definition properties
        },
      },
      {
        import_id: 'import3',
        import_definition: {
          name: 'mockCustomerImportName',
          // ... other import_definition properties
        },
      },
    ];

    fetchMock.mockResponseOnce(JSON.stringify(mockImportList));

    const deleteMock = fetchMock.mockResponseOnce('');

    await bloomreachEngagementDeleteImports();

    expect(fetchMock).toHaveBeenCalledWith(
      `https://api-engagement.bloomreach.com/imports/v1/mockProjectToken`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'mockAuthHeader',
        },
      }
    );

    expect(fetchMock).toHaveBeenCalledTimes(4); // 3 imports + 1 delete request for each import

    for (const importItem of mockImportList) {
      expect(fetchMock).toHaveBeenCalledWith(
        `https://api-engagement.bloomreach.com/imports/v1/mockProjectToken/${importItem.import_id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'mockAuthHeader',
          },
        }
      );
    }

    // Ensure that fetchMock was called with the correct delete URLs
    expect(deleteMock).toHaveBeenCalledTimes(4);
  });
});
