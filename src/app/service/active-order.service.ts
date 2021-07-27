import {Injectable} from '@angular/core';
import {Deprecate, OrderSent} from "../stripe-payments-lib/services/stripe-pay.service";
import {MyLogger} from "./logging/myLogging";
import {CustomerOrder} from "../model/shared/CoffeeOrder.infc";
import * as Parse from 'parse';
import {CustomerOrderFacade} from "../model/shared/CustomerOrderFacade";
@Injectable({
  providedIn: 'root'
})

export class ActiveOrderService {
  constructor() {
   this._lastOrder =  this. lookupStoredOrder()
  }
  get lastOrder(): CustomerOrder | undefined {
    return this._lastOrder;
  }

  set lastOrder(value: CustomerOrder | undefined) {
    this._lastOrder = value;
  }
  subs: any;
 private _lastOrder: CustomerOrder| undefined;

 async initSubscription() {
   if(this.subs){
     this.subs.unsuscribe();
   }
   const lq: Parse.Query = new Parse.Query('CoffeeOrders');
   //  lq.get('sIx3zRRKIy');
   lq.equalTo('objectId', this._lastOrder?.id);
   this.subs = await lq.subscribe();
   this.subs.on('update', (po: Parse.Object) => {
     console.log('ORDERR UPDATED', po);
   });
 }

  private lookupStoredOrder() {
    return undefined;
  }
  private storeLastOrder(o: CustomerOrder): void {

  }
}

 function Deprecates(arg?: string) {

  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("%cDEPRECATE: " + arg, 'color: orange; fontSize: 23px', propertyKey, descriptor);
  };
}
