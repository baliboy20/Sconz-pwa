import {CustomerOrder} from './CoffeeOrder.infc';
import {Order} from './Order.infc.';
import {Payment} from './Payment.infc';
import {ShippingInfo} from './ShippingInfo.interface';
import * as Parse from 'parse';
import {MyLogger} from "../../service/logging/myLogging";

export class CustomerOrderFacade implements CustomerOrder {

  get shippingInfo(): ShippingInfo {
    return this.item.get('shippingInfo');
  }

  set shippingInfo(value: ShippingInfo) {
    this.item.set('shippingInfo', value as any);
  }

  get orderStatus(): 'suspended' | 'open' | 'completed' | 'cancelled' {
    return this.item.get('orderStatus');
  }

  set orderStatus(value: 'suspended' | 'open' | 'completed' | 'cancelled') {
    this.item.set('orderStatus', value as any);
  }

  get order(): Order {
    return this.item.get('order');
  }

  set order(value: Order) {
    this.item.set('order', value as Order | any);
  }


  get payment(): Payment {
    return this.item.get('payment');
  }

  set payment(value: Payment) {
    this.item.set('payment', value as any);
  }

  set paymentIntent(value: string) {
    this.item.set('paymentIntent', value as any);
  }

  get paymentIntent(): string {
    return this.item.get('paymentIntent');
  }

  get paymentStatus(): 'paid' | 'unpaid' {
    return this.item.get('paymentStatus') as 'paid' | 'unpaid';
  }

  set paymentStatus(value: 'paid' | 'unpaid') {
    this.item.set('paymentStatus', value as any);
  }

  get ShippingInfo(): ShippingInfo {
    return this.item.get('ShippingInfo');
  }

  set ShippingInfo(value: ShippingInfo) {
    this.item.set('ShippingInfo', value as any);
  }

  get updatedAt(): string {
    return this.item.get('updatedAt');
  }

  set updatedAt(value: string) {
    this.item.set('updatedAt', value as any);
  }

  /**
   * Transform reactive form raw data to Parse object struc and assign to Variant property.
   * @param value
   */

  get id(): string {
    return this.item.id;
  }

  set id(value: string) {
    this.item.id = value;
  }

  constructor(private item: Parse.Object) {
  }

  /**
   * Create from an object shaped into a Customer order.
   * @param value
   */
  static createFrom(value: CustomerOrder): CustomerOrderFacade {
    const mdl = Parse.Object.extend('CoffeeOrders');
    const inst = new mdl();
    if (value.id) {
      inst.id = value.id;
    }
    inst.set('updatedAt', value.updatedAt);
    inst.set('order', value.order);
    inst.set('shippingInfo', value.shippingInfo);
    inst.set('paymentStatus', value.paymentStatus);
    inst.set('paymentIntent', value.paymentIntent);
    inst.set('orderStatus', value.orderStatus);

    console.log('id in createfrom func', 'value.description');

    return CustomerOrderFacade.create(inst);
  }

  /**
   * Returns a new Facade wrapping the supplied Parse.object argument.
   * @param b
   */
  static create(b: Parse.Object): CustomerOrderFacade {
    const retval = new CustomerOrderFacade(b as Parse.Object);
    return (retval);
  }

  public async saveToDb(): Promise<any> {

    const res = await this.item.save();
    MyLogger.large()('are we in here', res);
    this.item = res;
    return res;
  }


  // private _orderStatus: "suspended" | "open" | "completed" | "cancelled";

}

