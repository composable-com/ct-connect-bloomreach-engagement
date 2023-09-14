import { Request, Response } from 'express';
import { json2csv } from 'json-2-csv';
import { logger } from '../utils/logger.utils'
import { basicAuthHandler } from '../utils/basic-auth.utils';
import { commercetoolsCatalogIngestion } from '../services/commercetools-catalog-ingestion';

export async function getProductsController(req: Request, res: Response) {
  basicAuthHandler({
    req,
    res,
    handler: async () => {
      logger.info(`Running getProductsController`);
      const collection = await commercetoolsCatalogIngestion();
      logger.info(`Collection length: ${collection.length}`)
      const data = await json2csv(collection, {});
      logger.info(`CSV length: ${data.length}`)
      res.contentType('text/csv');
      res.status(200);
      res.send(data);
    }
  });
}
