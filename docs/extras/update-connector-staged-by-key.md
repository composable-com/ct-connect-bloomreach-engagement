# Update ConnectorStaged by Key

```bash
curl https://connect.{region}.commercetools.com/connectors/drafts/key={key} -i \
--header 'Authorization: Bearer {{ token }}' \
--header 'Content-Type: application/json' \
--data-binary '{
  "version" : 1,
  "actions" : [ {
    "action" : "{{ action }}",
    "{{ key }}" : "{{ value }}"
  } ]
}'
```

See all actions: https://docs.commercetools.com/connect/connectors-staged#update-actions

## Update GitHub repository

```bash
curl https://connect.us-central1.gcp.commercetools.com/connectors/drafts/key=orium-ct-connect-bloomreach-engagement -i \
--header 'Authorization: Bearer {{ token }}' \
--header 'Content-Type: application/json' \
--data-binary '{
  "version" : 1,
  "actions" : [{
    "action": "setRepository",
    "url": "git@github.com:composable-com/ct-connect-bloomreach-engagement.git",
    "tag": "v1.0.1"
  }]
}'
```

## Update Creator Name

```bash
curl https://connect.us-central1.gcp.commercetools.com/connectors/drafts/key=orium-ct-connect-bloomreach-engagement -i \
--header 'Authorization: Bearer {{ token }}' \
--header 'Content-Type: application/json' \
--data-binary '{
  "version" : 1,
  "actions" : [{
    "action": "setCreatorName",
    "creatorName": "IT"
  }]
}'
```

## Update Creator Email

```bash
curl https://connect.us-central1.gcp.commercetools.com/connectors/drafts/key=orium-ct-connect-bloomreach-engagement -i \
--header 'Authorization: Bearer {{ token }}' \
--header 'Content-Type: application/json' \
--data-binary '{
  "version" : 1,
  "actions" : [{
    "action": "setCreatorEmail",
    "creatorEmail": "it@orium.com"
  }]
}'
```
