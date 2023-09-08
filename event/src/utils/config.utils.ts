import CustomError from '../errors/custom.error';
import envValidators from '../validators/env.validators';
import { getValidateMessages } from '../validators/helpers.validators';

/**
 * Read the configuration env vars
 * (Add yours accordingly)
 *
 * @returns The configuration with the correct env vars
 */
export const readConfiguration = () => {
  const envVars = {
    clientId: process.env.CTP_CLIENT_ID as string,
    clientSecret: process.env.CTP_CLIENT_SECRET as string,
    projectKey: process.env.CTP_PROJECT_KEY as string,
    scope: process.env.CTP_SCOPE,
    region: process.env.CTP_REGION as string,
    bloomreachEngagementApiKey: process.env
      .BLOOMREACH_ENGAGEMENT_API_KEY as string,
    bloomreachEngagementApiSecret: process.env
      .BLOOMREACH_ENGAGEMENT_API_SECRET as string,
    bloomreachEngagementProjectToken: process.env
      .BLOOMREACH_ENGAGEMENT_PROJECT_TOKEN as string,
    bloomreachEngagementCatalogLocale:
      (process.env.BLOOMREACH_ENGAGEMENT_CATALOG_LOCALE as string) || 'en-US',
    basicAuthSecret: process.env.BASIC_AUTH_SECRET as string,
  };

  const validationErrors = getValidateMessages(envValidators, envVars);

  if (validationErrors.length) {
    throw new CustomError(
      'InvalidEnvironmentVariablesError',
      'Invalid Environment Variables please check your .env file',
      validationErrors
    );
  }

  return envVars;
};
