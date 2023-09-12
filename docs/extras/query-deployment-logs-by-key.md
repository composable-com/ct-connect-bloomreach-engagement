# Query Deployment logs by Key

```bash
curl --get https://connect.us-central1.gcp.commercetools.com/composable-product-dev-sandbox/deployments/key=orium-ct-connect-bloomreach-engagement-deployment/logs \
--header 'Authorization: Bearer {{ token }}' | json_pp
```
