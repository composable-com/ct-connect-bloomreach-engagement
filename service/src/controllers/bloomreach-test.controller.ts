import { Request, Response } from 'express';
import { bloomreachEngagementApiTest } from '../services/bloomreach-engagement-api-test';

export async function getBloomreachTestController(req: Request, res: Response) {
  const data = await bloomreachEngagementApiTest();

  res.contentType('application/json');
  res.status(200);
  res.send(data);
}
