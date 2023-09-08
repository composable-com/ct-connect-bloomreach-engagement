import { Request, Response } from 'express';
import { json2csv } from 'json-2-csv';
import { basicAuthHandler } from '../utils/basic-auth.utils';
import { commercetoolsCatalogVariantsIngestion } from '../services/commercetools-catalog-variants-ingestion';

export async function getVariantsController(req: Request, res: Response) {
  basicAuthHandler({
    req,
    res,
    handler: async () => {
      const collection = await commercetoolsCatalogVariantsIngestion();
      const data = await json2csv(collection, {});
      res.contentType('text/csv');
      res.status(200);
      res.send(data);
    },
  });
}
