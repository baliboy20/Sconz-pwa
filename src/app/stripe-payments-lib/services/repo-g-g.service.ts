import {Injectable} from '@angular/core';
import * as Parse from 'parse';
import {from, Observable} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {map, mergeMap, reduce, take, tap, toArray} from 'rxjs/operators';
import {GGStockProductFacade} from '../../model/GGStockProducts.model';
import {CoffeeOrderFacade} from '../../model/CoffeeOrderFacade';
import {OrderSent, StripePaymentDetails} from "./stripe-pay.service";
import {GGCartService} from "../../services/ggcart.service";

// import {CoffeeOrderFacade} from '';
// import {GGStockProductFacade} from '../model/GGStockProducts.model';

const STOCK_COLLECTION_NAME: string = 'GGStockProducts';

@Injectable({
  providedIn: 'root'
})
export class RepoGGService {
  get orderInProcess(): OrderSent | undefined {
    return this._orderInProcess ;
  }

  set orderInProcess(value: OrderSent | undefined) {
    this._orderInProcess = value;
  }

  private _orderInProcess: OrderSent | undefined;

  constructor(
  ) {
  }


  async _findProductItems(): Promise<any> {
    const query = new Parse.Query(STOCK_COLLECTION_NAME);
    return await query.find();
  }

  listProductItems(): Observable<GGStockProductFacade[]> {
    return fromPromise(this._findProductItems())
      .pipe(
        take(1),
        mergeMap((a: any) => from((a))),
        // tap(a => console.log('items', a)),
        map((a: any) => (GGStockProductFacade.create(a))),
        toArray(),
      );
  }

  public _collateByCategory(arg: GGStockProductFacade[]): [string, GGStockProductFacade[]] {
    const catSet: { [name: string]: GGStockProductFacade[] } = {};
    arg.forEach(a => a.categories.forEach((b: string) => {
      if (b in catSet) {
        catSet[b].push(a);
      } else {
        catSet[b] = [a];
      }
    }));
    const arr: any[] = [];
    Object.entries(catSet).forEach(([a, b]) => {
      arr.push([a, b]);
    });
    // console.log('%c Collation result', 'color: orange', arr);
    return arr as [string, GGStockProductFacade[]];
  }

  //
  //   Coffee order Itemss
  //
  private async _findCoffeeOrderItems(): Promise<any> {
    // console.log('repo inited...');
    const query = new Parse.Query('CoffeeOrders');
    return await query.find();
  }

  public listCoffeeOrderItems(): Observable<any> {
    return fromPromise(this._findCoffeeOrderItems())
      .pipe(
        take(1),
        map((a: any) => a.map((b: any) => (CoffeeOrderFacade.create(b)))),
        // tap(a => console.log('items transformed', a)),
      );
  }

  async findById(id: string): Promise<any> {
    return (new Parse.Query(STOCK_COLLECTION_NAME)).get(id);
  }

  async findPi(): Promise<void> {
    const pi = 'pi_1IVRQfFSRZP1GrxVV1YX1yxA';
    const query = new Parse.Query('Payments');
    const result = await query.equalTo('payment_intent', pi)
      .find();
    result.forEach(async a => {
      a.set('payment_status', 'paid');
      await a.save();
    });
    // console.log('result of query', result);
  }

  public async uploadImage(imgUrl: Partial<{ name: string }>): Promise<any> {
    try {
      // @ts-ignore
      const qry = new Parse.File(imgUrl.name ?? '', imgUrl, 'image/webp');
      const link = await qry.save();
      const mdl = Parse.Object.extend('images');
      const pics = new mdl();
      pics.set('image', link);
      return pics.save();
    } catch (error) {
      return error;
    }
  }

  private async _findProductItem(id: string): Promise<any> {
    const query = new Parse.Query(STOCK_COLLECTION_NAME);
    const result = await query.get(id);
    return result;
  }

  public findOne(id: string): Observable<GGStockProductFacade> {
    return fromPromise(this._findProductItem(id))
      .pipe(
        map(a => GGStockProductFacade.create(a))
      );
  }

  private async _listCategories(): Promise<any[]> {

    const query = new Parse.Query(STOCK_COLLECTION_NAME);
    try {
      const result = await query.find();
      return result;
    } catch (e) {
      throw e;
    }

  }

  public listCategories(): Observable<Array<string>> {
    return fromPromise(this._listCategories())
      .pipe(
        take(1),
        mergeMap(a => from(a)),
        map(a => a.get('categories')),
        map(a => a),
        reduce((acc, val: string[]) => {
          val.forEach(s => acc.add(s));
          return acc;
        }, new Set<any>()),
        map(a => Array.from(a)),
        // tap(a => console.log('%cCATEGORES', 'color:green', a)),
      );
  }

  async removeImage(thumb: string, id: string): Promise<any> {
    const fn = await Parse.Cloud.run('IAmACloud');
    // console.log('run i am cloud', fn);
    return null;
  }

  async deletStockProductImage(thumb: string, id: string): Promise<any> {
    // console.log('run i am cloud: id =>', {id});
    const fn = await Parse.Cloud.run('deletStockProductImage', {id});
    // console.log('deletStockProductImage', fn);
    return fn;
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

  public async ggPostToCloudFunction(payload: { payment: StripePaymentDetails; shippingInfo: any; basket: any; }): Promise<any> {
    console.log('postToCloud Functionz', payload);
    const result = await this.postToOrders(payload);
    return result.id;
  }

}
