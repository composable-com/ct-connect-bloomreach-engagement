# Create a ConnectorStaged

ConnectorStaged is how non-certified versions of Connectors are stored. Even after being certified and listed, a ConnectorStaged can be modified (to fix bugs and add new features) and re-certified to update the production Connector.

ConnectorStaged are created by posting a ConnectorStagedDraft to the /connectors/drafts endpoint.

```bash
curl --location 'https://connect.us-central1.gcp.commercetools.com/connectors/drafts' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{ token }}' \
--data-raw '{
    "key": "orium-ct-connect-bloomreach-engagement",
    "name": "Bloomreach Engagement connector",
    "description": "Bloomreach Engagement connector",
    "creator": {
        "title": "Mr",
        "name": "IT",
        "email": "it@orium.com",
        "company": "Orium",
        "noOfDevelopers": 10
    },
    "repository": {
        "url": "git@github.com:composable-com/ct-connect-bloomreach-engagement.git",
        "tag": "v1.0.0"
    },
    "privateProjects": [],
    "supportedRegions": [
        "us-central1.gcp"
    ]
}'
```
