import { Request, Response } from 'express';
import { json2csv } from 'json-2-csv';
import { basicAuthHandler } from '../utils/basic-auth.utils';
import { commercetoolsCatalogIngestion } from '../services/commercetools-catalog-ingestion';

export async function getProductsController(req: Request, res: Response) {
  basicAuthHandler({
    req,
    res,
    handler: async () => {
      const collection = await commercetoolsCatalogIngestion();
      const data = await json2csv(collection, {});
      res.contentType('text/csv');
      res.status(200);
      res.send(data);
    }
  });
}
