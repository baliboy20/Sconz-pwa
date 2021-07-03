import {Injectable} from '@angular/core';
import * as Parse from 'parse';
import {fromPromise} from 'rxjs/internal-compatibility';
import {catchError, map, mergeMap, take, tap, toArray} from 'rxjs/operators';
import {from, Observable, of} from 'rxjs';
import {StockProductFacade} from '../model/StockProducts';
import {CartType} from '../model/types';

@Injectable({
  providedIn: 'root'
})
export class RepoService {

  constructor() {
  }

  public async _findProductItems(): Promise<any> {

    try {
      const query = new Parse.Query('StockProducts');
      const result = await query.find();
      return result;
    } catch (e) {
      console.log('Error', e.message);
    }
  }

  // private async _findProductItem(id: string): Promise<any> {
  //   const query = new Parse.Query('StockProducts');
  //   const result = await query.get(id);
  //   return StockProductFacade.create(result);
  // }

  private async _findByProductId(pid: string): Promise<StockProductFacade | null>{
    try {
      const query = new Parse.Query('StockProducts');
      query.equalTo('productId', pid);
      const result = await query.find();
      console.log('result', result);
      return StockProductFacade.create(result[0]);
    } catch (err) {
      return null;
    }
  }

  listProductItems(): Observable<any> {
    console.log('listStockProduct .....');
    return fromPromise(this._findProductItems())
      .pipe(
        catchError(async (err) => console.log('ERROR:', err.message)),
        tap(a => console.log('resaults', a)),
        take(1),
        mergeMap((a: Parse.Object[]) => from((a))),
        map((a: { id: string, attributes: any, className: string }) => ({id: a.id, ...a.attributes, className: a.className})),
        toArray(),
      );
  }

  listStockProductsFacade(): Observable<StockProductFacade[]> {
    console.log('listStockProduct .....');
    return fromPromise(this._findProductItems())
      .pipe(
        tap(a => console.log('resaults', a)),
        take(1),
        mergeMap((a: any) => from((a))),
        map(a => new StockProductFacade(a)),
        toArray(),
      );
  }

  // test code
  async findPi(): Promise<void> {
    const pi = 'pi_1IVRQfFSRZP1GrxVV1YX1yxA';
    const query = new Parse.Query('Payments');
    const result = await query.equalTo('payment_intent', pi)
      .find();
    result.forEach(async a => {
      a.set('payment_status', 'paid');
      await a.save();
    });
    console.log('result of query', result);
  }

  public findOne(id: string): Observable<StockProductFacade> {
    // @ts-ignore
    return fromPromise(this._findByProductId(id));
  }

  private async getHtmlContentAsync(pageName: string): Promise<any> {
    const query = new Parse.Query('HtmlContent');
    query.equalTo('fileName', pageName);
    const result = await query.find();
    console.log('file resilt', result);
    return (result);
  }

  public async addOrder(shippingInfo: any, session: { payment_intent: string }, cartItems: CartType[]): Promise<void> {
    const fn = (agg: number, itm: CartType) => (agg + (itm.qty * itm.price));
    try {
      const clz = Parse.Object.extend('CoffeeOrders');
      const inst = new clz();
      inst.set('shippingInfo', shippingInfo);
      inst.set('payment_intent', session.payment_intent);
      inst.set('orderItems', cartItems);
      inst.set('payment_status', 'payment initiating');
      inst.set('amount', cartItems.reduce(fn, 0).toFixed(2));
      await inst.save();
    } catch (error) {
      console.log('an Eror:', error.message);
    }
  }

  public getHtmlContent(fileName: string): Observable<any> {
    return fromPromise(this.getHtmlContentAsync(fileName));
  }

  public async postToOrders(payload: { payment: any; shippingInfo: any; basket: any; }): Promise<any> {
    console.log('postToCloudFunction ..2', payload);
    try {
      const claz = Parse.Object.extend('CoffeeOrders');
      const inst = new claz();
      inst.set('name', 'postPaymentInitiatedToDb');
      inst.set('shipping_info', payload.shippingInfo);
      inst.set('order', {cart: payload.basket});
      inst.set('payment_intent', payload.payment.payment_intent);
      inst.set('payment_status', payload.payment.payment_status);
      inst.set('payment', payload.payment);
      return await inst.save();
    } catch (error) {
      console.error('ERRROR', error.message);
    }
  }

  public async postToCloudFunction(payload: { payment: { id: string; amount_total: string; mode: string; payment_intent: string; payment_status: string; }; shippingInfo: any; basket: any; }): Promise<any> {
    console.log('postToCloudFunction', payload);
    const result = await this.postToOrders(payload);
    return result.id;
  }
  public async ggPostToCloudFunction(payload: { payment: { id: string; amount_total: string; mode: string; payment_intent: string; payment_status: string; }; shippingInfo: any; basket: any; }): Promise<any> {
    console.log('postToCloud Functionz', payload);
    const result = await this.postToOrders(payload);
    return result.id;
  }

  public async _getOrder(id: string): Promise<any> {

    try {
      const query = new Parse.Query('CoffeeOrders');

      // query.equalTo('objectId', id);
      const result = await query.get(id);
     // console.log('%c get coffee orders', 'color: brown', result);
      return result;
    } catch (e) {
      console.log('Error', e.message);
    }
  }

  public async getOrder(id: string): Promise<Parse.Object> {
    const rsul =  this._getOrder(id);


    return await rsul;
  }
}

/**
 w@c.co
 4242424242424242
 */
