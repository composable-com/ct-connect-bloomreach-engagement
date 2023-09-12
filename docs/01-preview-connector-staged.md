# Preview your connector

After creating your ConnectorStaged you can request previewable status. This status will allow you to deploy your ConnectorStaged for testing/preview purposes without requiring certification.

## Request previewable status for ConnectorStaged

Use the Preview Connector update action to request previewable status for your ConnectorStaged.

```bash
curl --location 'https://connect.us-central1.gcp.commercetools.com/connectors/drafts/key=orium-ct-connect-bloomreach-engagement' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{ token }}' \
--data-raw '{
  "version" : 1,
  "actions" : [ {
    "action" : "updatePreviewable"
  } ]
}'
```
