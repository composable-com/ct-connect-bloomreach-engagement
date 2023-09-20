import { Request, Response } from 'express';
import { getBloomreachTestController } from './bloomreach-test.controller';
import { bloomreachEngagementApiTest } from '../services/bloomreach-engagement-api-test';

jest.mock('../services/bloomreach-engagement-api-test', () => ({
  bloomreachEngagementApiTest: jest.fn(),
}));

describe('getBloomreachTestController', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    jest.clearAllMocks();
    req = {} as Request;
    res = {
      contentType: jest.fn(),
      status: jest.fn(),
      send: jest.fn(),
    } as unknown as Response;
  });

  it('should call bloomreachEngagementApiTest and send its response', async () => {
    const testData = { message: 'Test data' };
    (bloomreachEngagementApiTest as jest.Mock).mockResolvedValueOnce(testData);

    await getBloomreachTestController(req, res);

    expect(bloomreachEngagementApiTest).toHaveBeenCalled();
    expect(res.contentType).toHaveBeenCalledWith('application/json');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(testData);
  });
});
