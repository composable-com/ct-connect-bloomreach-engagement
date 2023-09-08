import { readConfiguration } from './config.utils';

export function getBloomreachAuthHeader() {
  const { bloomreachEngagementApiKey, bloomreachEngagementApiSecret } =
    readConfiguration();
  return `Basic ${btoa(
    `${bloomreachEngagementApiKey}:${bloomreachEngagementApiSecret}`
  )}`;
}

export function getBloomreachProjectToken() {
  const { bloomreachEngagementProjectToken } = readConfiguration();
  return bloomreachEngagementProjectToken;
}

export function getBloomreachProductImportName() {
  const { projectKey } = readConfiguration();
  return `CT Products (${projectKey})`;
}

export function getBloomreachVariantImportName() {
  const { projectKey } = readConfiguration();
  return `CT Variants (${projectKey})`;
}

export function getBloomreachCustomerImportName() {
  const { projectKey } = readConfiguration();
  return `CT Customers (${projectKey})`;
}
