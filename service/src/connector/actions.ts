import { bloomreachEngagementCustomerImport } from '../services/bloomreach-engagement-customer-import';
import { bloomreachEngagementProductImport } from '../services/bloomreach-engagement-product-import';
import { bloomreachEngagementDeleteImports } from '../services/bloomreach-engagement-delete-imports';

export async function setupBloomreachEngagement(params: {
  applicationUrl: string;
}) {
  await bloomreachEngagementDeleteImports();

  await Promise.all([
    bloomreachEngagementCustomerImport({
      applicationUrl: params.applicationUrl,
      triggerType: 'now',
    }),
    bloomreachEngagementProductImport({
      applicationUrl: params.applicationUrl,
      triggerType: 'now',
      path: 'products',
    }),
    bloomreachEngagementProductImport({
      applicationUrl: params.applicationUrl,
      triggerType: 'now',
      path: 'variants',
    }),
    bloomreachEngagementCustomerImport({
      applicationUrl: params.applicationUrl,
      triggerType: 'scheduled',
    }),
    bloomreachEngagementProductImport({
      applicationUrl: params.applicationUrl,
      triggerType: 'scheduled',
      path: 'products',
    }),
    bloomreachEngagementProductImport({
      applicationUrl: params.applicationUrl,
      triggerType: 'scheduled',
      path: 'variants',
    }),
  ]);
}
