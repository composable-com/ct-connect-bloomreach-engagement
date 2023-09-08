import { Request, Response } from 'express';
import { json2csv } from 'json-2-csv';
import { basicAuthHandler } from '../utils/basic-auth.utils';
import { commercetoolsCustomerIngestion } from '../services/commercetools-customer-ingestion';

export async function getCustomersController(req: Request, res: Response) {
  basicAuthHandler({
    req,
    res,
    handler: async () => {
      const collection = await commercetoolsCustomerIngestion();
      const data = await json2csv(collection, {});
      res.contentType('text/csv');
      res.status(200);
      res.send(data);
    },
  });
}
