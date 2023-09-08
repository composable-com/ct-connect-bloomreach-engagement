import {
  getBloomreachAuthHeader,
  getBloomreachProjectToken,
} from '../utils/bloomreach.utils';

export async function bloomreachEngagementApiTest() {
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
          registered: 'api-test@test.test',
        },
        event_type: 'consent',
        timestamp: 1620139769,
        properties: {
          action: 'reject',
          category: 'sms_marketing',
        },
      }),
    }
  );

  const data = (await res.json()) as unknown as {
    success: boolean;
    errors: [];
  };

  return data;
}
