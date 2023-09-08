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
