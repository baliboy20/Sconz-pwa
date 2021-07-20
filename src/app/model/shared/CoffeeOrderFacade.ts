import {CoffeeOrder} from './CoffeeOrder.infc';
import {Order} from './Order.infc.';
import {Payment} from './Payment.infc';
import {ShippingInfo} from './ShippingInfo.interface';


export class CoffeeOrderFacade implements CoffeeOrder {
  get order(): Order {
    return this.item.get('order');
  }

  set order(value: Order) {
    this.item.set('order', value);
  }


  get payment(): Payment {
    return this.item.get('payment');
  }

  set payment(value: Payment) {
    this.item.set('payment', value);
  }

  set payment_intent(value: string) {
    this.item.set('payment_intent', value);
  }

  get payment_intent(): string {
    return this.item.get('payment_intent');
  }

  get payment_status(): string {
    return this.item.get('payment_status');
  }

  set payment_status(value: string) {
    this.item.set('payment_status', value);
  }

  get shipping_info(): ShippingInfo {
    return this.item.get('shipping_info');
  }

  set shipping_info(value: ShippingInfo) {
    this.item.set('shipping_info', value);
  }

  get updatedAt(): string {
    return this.item.get('updatedAt');
  }

  set updatedAt(value: string) {
    this.item.set('updatedAt', value);
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

  static createFrom(value: CoffeeOrder): CoffeeOrderFacade {
    const mdl = Parse.Object.extend('CoffeeOrders');
    const inst = new mdl();
    inst.id = value.id;
    inst.set('updatedAt', value.updatedAt);
    inst.set('order', value.order);
    inst.set('shipping_info', value.shipping_info);
    inst.set('payment_status', value.payment_status);
    inst.set('payment_intent', value.payment_intent);

    console.log('id in createfrom func', 'value.description');
    return inst;
  }

  static create(b: Parse.Object): CoffeeOrderFacade {
    const retval = new CoffeeOrderFacade(b as Parse.Object);
    return (retval);
  }

  public save(): Promise<any> {
    return this.item.save();
  }

}

