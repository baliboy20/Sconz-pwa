import * as Parse from 'parse';

export interface OrderItems {
  size: string;
  price: string;
  variant: string;
  vId: string;
  qty: number;
  grindType: string;
  description: string;
  thumbUrl: string;
  productItemUrl: string;
}

export interface Order {
  cart: OrderItems[];
  qty: number;
  total: number;
}


export interface ShippingInfo {
  email: string;
  lastName: string;
  firstName: string;
  address: string;
  apartment: string;
  city: string;
  country: string;
  postCode: string;
  computedAddress: string;
}

// Payment

export interface Payment {
  amount_total_pence: number;
  id: string;
  mode: string;
  payment_intent: string;
  payment_status: string;
}


// from type 'CartType': img, qty, description, thumbUrl

export interface Cart {
  qty: number;
  total_pence: number;
  items: OrderItems;
}

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

  static create(b: Parse.Object<Parse.Attributes> | Parse.Object<Parse.Attributes>[]): CoffeeOrderFacade {
    let retval;
    if (Array.isArray(b)) {
      retval = new CoffeeOrderFacade(b[0]);
    } else {
      retval = new CoffeeOrderFacade(b); //nearly done
    }
    return (retval);
  }

  public save(): Promise<any> {
    return this.item.save();
  }

}

