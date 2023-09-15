import { CreatedBy } from '@commercetools/platform-sdk';
import { Order } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/order';
import { MessageDeliveryPayload } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/subscription';

export interface CtEvent {
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
  order?: Order;
  createdAt: string;
  lastModifiedAt: string;
  createdBy: CreatedBy;
  lastModifiedBy: CreatedBy;
}
