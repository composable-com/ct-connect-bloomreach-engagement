# Request certification

After creating and/or previewing your ConnectorStaged, use the [Publish](https://docs.commercetools.com/connect/connectors-staged#publish-connector) update action with `certification` set to `true` to submit the ConnectorStaged for final certification and to be listed for production-ready deployments.

See more on [https://docs.commercetools.com/connect/getting-started#request-certification](https://docs.commercetools.com/connect/getting-started#request-certification).

## Request previewable status for ConnectorStaged

Use the Preview Connector update action to request previewable status for your ConnectorStaged.

```bash
curl --location 'https://connect.us-central1.gcp.commercetools.com/connectors/drafts/key=orium-ct-connect-bloomreach-engagement' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{ token }}' \
--data-raw '
{
  "version": 1,
  "actions": [
    {
      "action": "publish",
      "certification": true
    }
  ]
}'
```

### Monitor certification status

After triggering the certification process, your ConnectorStaged will be reviewed by the Connect team. The status of which can be monitored by [getting the ConnectorStaged](https://docs.commercetools.com/connect/connectors-staged#get-connectorstaged) and viewing the `status` field.

The Connect team may ask questions about your ConnectorStaged. This will change the `status` to `FEEDBACK_REQUIRED`. Comments can be viewed in the `certificationInfo` field of your ConnectorStaged. You can submit your own comments using the [Add Certification Comment](https://docs.commercetools.com/connect/connectors-staged#add-certification-comment) update action.

Once your ConnectorStaged is certified, a production [Connector](https://docs.commercetools.com/connect/connectors#connector) is created that contains the content of the ConnectorStaged. This production Connector then becomes available for deployment and the value of `alreadyListed` will change to `true`.

### Update your Connector

If you update your Connect application to fix bugs or add new features, you should follow these steps to update the Connector.

1. Update your GitHub repository with the new Connect application.
2. Generate a new Git tag/release.
3. Make changes in the GitHub repository as needed, ensuring that connect.yaml represents the new [ConnectorConfigurationApplication](https://docs.commercetools.com/connect/connectors-staged#connectorconfigurationapplication).
4. Use the [Set Repository](https://docs.commercetools.com/connect/connectors-staged#set-repository) update action and include the GitHub repository URL and the new Git tag.
5. Use the [Publish](https://docs.commercetools.com/connect/connectors-staged#publish-connector) update action to submit your updated application for certification.
