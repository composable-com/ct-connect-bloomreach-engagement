import Bottleneck from 'bottleneck';
import { logger } from '../utils/logger.utils';
import { createApiRoot } from '../client/create.client';

interface BloomreachCustomer {
  customer_id: string;
  email: string;
  first_name: string;
  last_name: string;
}

export async function commercetoolsCustomerIngestion() {
  logger.info('Service called! > customerIngestion');
  let _continue = true;
  let offset = 0;

  const customers: BloomreachCustomer[] = [];
  const limit = 500;
  const apiRoot = createApiRoot();
  const limiter = new Bottleneck({
    maxConcurrent: 1,
    minTime: 300,
  });

  const getCustomers = limiter.wrap(
    async (params: { limit: number; offset: number }) => {
      logger.info(`Getting customers... ${params.limit} ; ${params.offset}`);
      return await apiRoot
        .customers()
        .get({ queryArgs: { limit: params.limit, offset: params.offset } })
        .execute();
    }
  );

  while (_continue) {
    const response = await getCustomers({ limit, offset });
    const data: BloomreachCustomer[] = response.body.results.map((customer) => {
      return {
        customer_id: customer.id,
        email: customer.email,
        first_name: customer.firstName ?? '',
        last_name: customer.lastName ?? '',
      };
    });

    customers.push(...data);
    offset += limit;
    if (customers.length >= (response.body.total ?? 0)) {
      _continue = false;
    }
  }

  return customers;
}
