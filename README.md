# commercetools Bloomreach connector

<img height="110" src="https://github.com/oriuminc/ct-connect-bloomreach/blob/main/_logos.svg" />

## Overview

This connector syncs commercetools data with Bloomreach Engagement.

Upon deployment of this connector, your commercetools _products_ and _customers_ will be imported into Bloomreach Engagement.

Once per day your commercetools products and customers will be synchronized with Bloomreach Engagement.

## Pre-requisites

- commercetools Account
- [commercetools API keys](https://docs.commercetools.com/getting-started/create-api-client) (“Admin client”)
- Bloomreach Engagement Account
- [Bloomreach Engagement API keys](https://documentation.bloomreach.com/engagement/reference/authentication) (Private API access with full permissions)

## Installing the connector

In order to install the connector in your commercetools project, you'll need to deploy it. Refer to the [commercetools connect deployment documentation](https://docs.commercetools.com/connect/concepts#deployments).

Setup the required environment variables when you [create the deployment](https://docs.commercetools.com/connect/getting-started#create-a-deployment):

- `CTP_CLIENT_ID`
- `CTP_CLIENT_SECRET`
- `CTP_PROJECT_KEY`
- `CTP_SCOPE`
- `CTP_REGION`
- `BLOOMREACH_ENGAGEMENT_API_KEY`
- `BLOOMREACH_ENGAGEMENT_API_SECRET`
- `BLOOMREACH_ENGAGEMENT_PROJECT_TOKEN`
- `BLOOMREACH_ENGAGEMENT_CATALOG_LOCALE`
- `BASIC_AUTH_SECRET`

Once the connector is deployed, it should trigger the [`postDeploy` script](https://docs.commercetools.com/connect/convert-existing-integration#postdeploy).

The `postDeploy` script will set up the [Import](https://documentation.bloomreach.com/engagement/docs/data-import) cron jobs. One for customers, other for products and another for variants. Cron jobs will run every day at 00:00 UTC.

On the other hand, the connector will create a subscription to listen to “[Order Created](https://docs.commercetools.com/api/projects/messages#order-created)” [messages](https://docs.commercetools.com/api/projects/messages). Each time an order is created in commercetools, it will be imported as a [customer event](https://documentation.bloomreach.com/engagement/docs/custom-events#purchase) in Bloomreach.

## Uninstalling the connector

In order to uninstall the connector, you’ll need to [send the appropriate HTTP request and delete it](https://docs.commercetools.com/connect/deployments#delete-deployment).

This will trigger the [`preUndeploy` script](https://docs.commercetools.com/connect/convert-existing-integration#preundeploy) which will delete the Import cron jobs and messages subscriptions described on the “Installing the connector” section.

## FAQ

### Where is the mapping for _products_ defined?

- We pull and expose the commercetools product data in `service/src/services/commercetools-catalog-ingestion.ts` and then we map the exposed data into Bloomreach in `service/src/services/bloomreach-engagement-product-import.ts`

### Where is the mapping for _products_ defined?

- We pull and expose the commercetools product data in `service/src/services/commercetools-catalog-variants-ingestion.ts` and then we map the exposed data into Bloomreach in `service/src/services/bloomreach-engagement-product-import.ts`

### Where is the mapping for _customers_ defined?

- We pull and expose the commercetools customer data in `service/src/services/commercetools-customer-ingestion.ts` and then we map the exposed data into Bloomreach in `service/src/services/bloomreach-engagement-customer-import.ts`

### Where is the mapping for _orders_ defined?

- We map the commercetools order data into Bloomreach in `event/src/controllers/event.controller.ts`.

### What is the `BASIC_AUTH_SECRET` env variable for?

- Bloomreach will consume customers and products data from an endpoint exposed by the connector. This endpoint is secured using a [basic http authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication), where the username is the `CTP_PROJECT_KEY` and the password the `BASIC_AUTH_SECRET`.

### Why do we need the `BLOOMREACH_ENGAGEMENT_CATALOG_LOCALE` env variable?

- By default, commercetools has built-in i18n support. In order to consume the catalog data, we must specify the desired [`LocalizedString`](https://docs.commercetools.com/api/types#localizedstring).

### How can I modify settings of the import jobs setup in Bloomreach?

- See the services under `service/src/services` to modify settings like frequency, time of day, and other settings. See the [Useful Links](#useful-links) below for links to the Bloomreach API docs on how to configure the import jobs.

## Useful links

- https://documentation.bloomreach.com/engagement/reference/about
- https://documentation.bloomreach.com/engagement/docs/data-import
- https://documentation.bloomreach.com/engagement/reference/create-import
- https://documentation.bloomreach.com/engagement/docs/help-top-import-issues-and-solutions
- https://documentation.bloomreach.com/engagement/docs/custom-events
- https://documentation.bloomreach.com/engagement/reference/add-event-2
