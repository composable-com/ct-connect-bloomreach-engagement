import { Request, Response } from 'express';
import { bloomreachEngagementEvent } from '../services/bloomreach-engagement-event';
import { logger } from '../utils/logger.utils';
import { readConfiguration } from '../utils/config.utils';
import {
  CtEvent,
  CtEventData,
  CtOrderCreatedPayload,
} from '../types/commercetools.types';

/**
 * Exposed event POST endpoint.
 * Receives the Pub/Sub message and works with it
 *
 * @param {Request} request The express request
 * @param {Response} response The express response
 * @returns
 */
export async function post(request: Request, response: Response) {
  logger.info('Event message received');
  const { projectKey } = readConfiguration();
  try {
    const body: CtEvent = request.body;
    const payload: CtEventData<CtOrderCreatedPayload> = JSON.parse(
      Buffer.from(body.message.data, 'base64').toString()
    );
    const order = payload.data.order;

    if (payload.data.type === 'OrderCreated' && order.customerEmail) {
      logger.info('Processing OrderCreated');
      await bloomreachEngagementEvent({
        customerIds: order.customerEmail,
        eventType: 'purchase',
        properties: {
          purchase_id: order.id,
          purchase_source_name: projectKey,
          product_ids: order.lineItems.map((lineItem) => lineItem.productId),
          total_price: order.totalPrice.centAmount,
          local_currency: order.totalPrice.currencyCode,
          total_quantity: order.lineItems.reduce((total, lineItem) => {
            total += lineItem.quantity;
            return total;
          }, 0),
          payment_type: order.paymentInfo,
          shipping_type: order.shippingInfo?.shippingMethodName ?? '',
          shipping_cost: order.shippingInfo?.price.centAmount ?? '',
          shipping_country: order.shippingAddress?.country ?? '',
          shipping_city: order.shippingAddress?.city ?? '',
          voucher_code: order.discountCodes
            ?.map((item) => item.discountCode.obj?.code)
            .join(', '),
        },
      });
    }

    response.status(200);
    response.send();
  } catch (error) {
    logger.info(`Event message error: ${(error as Error).message}`);
    response.status(400);
    response.send();
  }
}
