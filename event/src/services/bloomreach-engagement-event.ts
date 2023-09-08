import {
  getBloomreachAuthHeader,
  getBloomreachProjectToken,
} from '../utils/bloomreach.utils';

export async function bloomreachEngagementEvent(params: {
  customerIds: string;
  eventType: 'purchase';
  properties: Record<string, any>;
}) {
  const res = await fetch(
    `https://api-engagement.bloomreach.com/track/v2/projects/${getBloomreachProjectToken()}/customers/events`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getBloomreachAuthHeader(),
      },
      body: JSON.stringify({
        customer_ids: {
          registered: params.customerIds,
        },
        properties: params.properties,
        event_type: params.eventType,
      }),
    }
  );

  const data = (await res.json()) as unknown as {
    success: boolean;
    errors: [];
  };

  return data;
}
