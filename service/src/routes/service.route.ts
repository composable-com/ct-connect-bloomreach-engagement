import { Router } from 'express';
import { getBloomreachTestController } from '../controllers/bloomreach-test.controller';
import { getCustomersController } from '../controllers/customers.controller';
import { getProductsController } from '../controllers/products.controller';
import { getVariantsController } from '../controllers/variants.controller';

const serviceRouter = Router();

serviceRouter.get('/products', getProductsController);

serviceRouter.get('/variants', getVariantsController);

serviceRouter.get('/customers', getCustomersController);

serviceRouter.get('/test', getBloomreachTestController);

export default serviceRouter;
