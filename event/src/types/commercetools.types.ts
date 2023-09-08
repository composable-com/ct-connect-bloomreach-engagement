import { CreatedBy } from '@commercetools/platform-sdk';
import { Order } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/order';
import { MessageDeliveryPayload } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/subscription';

export interface CtEvent {
  id: string;
  source: string;
  specversion: string;
  type: string;
  time: string;
  data: {
    message: {
      attributes: {
        'content-type': string;
      };
      data: string;
      messageId: string;
      message_id: string;
      publishTime: string;
      publish_time: string;
    };
    subscription: string;
  };
  traceparent: string;
}

export interface CtEventData<Payload> {
  id: string;
  source: string;
  specversion: string;
  type: string;
  subject: string;
  time: string;
  dataref: string;
  sequence: string;
  sequencetype: string;
  data: Payload;
}

export interface CtOrderCreatedPayload extends MessageDeliveryPayload {
  notificationType: 'Message';
  projectKey: string;
  id: string;
  version: number;
  sequenceNumber: number;
  resource: {
    typeId: 'order';
    id: string;
  };
  resourceVersion: 1;
  type: 'OrderCreated';
  order: Order;
  createdAt: string;
  lastModifiedAt: string;
  createdBy: CreatedBy;
  lastModifiedBy: CreatedBy;
}
