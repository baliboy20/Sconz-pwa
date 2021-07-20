import {ShippingInfo} from './ShippingInfo.interface';
import {Order} from './Order.infc.';
import {Payment} from './Payment.infc';


export interface CoffeeOrder {
  shipping_info: ShippingInfo;
// @ts-ignore
  id: string;
  updatedAt: string;
  order: Order;
  payment: Payment;
  payment_intent: string;
  payment_status: string;
}
