# Query ConnectorStaged

```bash
curl --get https://connect.us-central1.gcp.commercetools.com/connectors/drafts/key=orium-ct-connect-bloomreach-engagement \
--header 'Authorization: Bearer {{ token }}' | json_pp
```

You'll get something like this:

```json
{
  "alreadyListed": false,
  "configurations": [
    {
      "applicationName": "service",
      "applicationType": "service",
      "securedConfiguration": [
        {
          "description": "commercetools Composable Commerce project key",
          "key": "CTP_PROJECT_KEY"
        },
        {
          "description": "commercetools Composable Commerce client ID",
          "key": "CTP_CLIENT_ID"
        },
        {
          "description": "commercetools Composable Commerce client secret",
          "key": "CTP_CLIENT_SECRET"
        },
        {
          "description": "commercetools Composable Commerce client scope",
          "key": "CTP_SCOPE"
        },
        {
          "description": "Bloomreach API key",
          "key": "BLOOMREACH_ENGAGEMENT_API_KEY"
        },
        {
          "description": "Bloomreach API secret",
          "key": "BLOOMREACH_ENGAGEMENT_API_SECRET"
        },
        {
          "description": "Bloomreach project token",
          "key": "BLOOMREACH_ENGAGEMENT_PROJECT_TOKEN"
        },
        {
          "description": "Bloomreach catalog locale",
          "key": "BLOOMREACH_ENGAGEMENT_CATALOG_LOCALE"
        },
        {
          "description": "HTTP basic auth password",
          "key": "BASIC_AUTH_SECRET"
        }
      ],
      "standardConfiguration": [
        {
          "description": "commercetools Composable Commerce API region",
          "key": "CTP_REGION"
        }
      ]
    },
    {
      "applicationName": "event",
      "applicationType": "event",
      "securedConfiguration": [
        {
          "description": "commercetools Composable Commerce project key",
          "key": "CTP_PROJECT_KEY"
        },
        {
          "description": "commercetools Composable Commerce client ID",
          "key": "CTP_CLIENT_ID"
        },
        {
          "description": "commercetools Composable Commerce client secret",
          "key": "CTP_CLIENT_SECRET"
        },
        {
          "description": "commercetools Composable Commerce client scope",
          "key": "CTP_SCOPE"
        },
        {
          "description": "Bloomreach API key",
          "key": "BLOOMREACH_ENGAGEMENT_API_KEY"
        },
        {
          "description": "Bloomreach API secret",
          "key": "BLOOMREACH_ENGAGEMENT_API_SECRET"
        },
        {
          "description": "Bloomreach project token",
          "key": "BLOOMREACH_ENGAGEMENT_PROJECT_TOKEN"
        },
        {
          "description": "Bloomreach catalog locale",
          "key": "BLOOMREACH_ENGAGEMENT_CATALOG_LOCALE"
        },
        {
          "description": "HTTP basic auth password",
          "key": "BASIC_AUTH_SECRET"
        }
      ],
      "standardConfiguration": [
        {
          "description": "commercetools Composable Commerce API region",
          "key": "CTP_REGION"
        }
      ]
    }
  ],
  "creator": {
    "company": "Orium",
    "email": "it@orium.com",
    "name": "IT",
    "title": "Mr"
  },
  "description": "Bloomreach Engagement connector",
  "hasChanges": true,
  "id": "df328165-3684-4d22-8dc9-fc8bd466115b",
  "isPreviewable": "true",
  "key": "orium-ct-connect-bloomreach-engagement",
  "name": "Bloomreach Engagement connector",
  "previewableReport": {
    "entries": [
      {
        "createdAt": "2023-09-11T16:31:44.963Z",
        "title": "Image security analysis check succeeded",
        "type": "Information"
      },
      {
        "createdAt": "2023-09-11T16:31:44.967Z",
        "title": "SAST and SCA analysis check succeeded",
        "type": "Information"
      },
      {
        "createdAt": "2023-09-11T16:31:44.967Z",
        "title": "Connector specification file validation check succeeded",
        "type": "Information"
      }
    ]
  },
  "private": true,
  "repository": {
    "tag": "v1.0.0",
    "url": "git@github.com:composable-com/ct-connect-bloomreach-engagement.git"
  },
  "status": "Draft",
  "supportedRegions": ["us-central1.gcp"],
  "version": 7
}
```
