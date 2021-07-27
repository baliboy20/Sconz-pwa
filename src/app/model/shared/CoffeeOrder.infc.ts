import {ShippingInfo} from './ShippingInfo.interface';
import {Order} from './Order.infc.';
import {Payment} from './Payment.infc';
import {GGBasket} from "./GGCart.model";
import {GGStockProductOrder} from "./GGOrderFacade.model";


export interface CustomerOrder {
  shippingInfo: ShippingInfo;
// @ts-ignore
  id: string;
  updatedAt: string;
  order: Order;
  payment?: Payment | undefined;  //Stripe payment feedback info
  paymentIntent?: string; // Stripe payment feedback info
  paymentStatus?: string;
  orderStatus: 'suspended' | 'open' | 'completed' | 'cancelled';  // suspended, open, closed
}
