import {Injectable, OnDestroy} from '@angular/core';
import * as Parse from 'parse';
import {from, Observable, ReplaySubject} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {map, mergeMap, reduce, take, toArray} from 'rxjs/operators';
import {OrderSent, StripePaymentDetails} from "./stripe-pay.service";
import {GGBasket} from "../../model/shared/GGCart.model";
import {GGStockProductFacade} from "../../model/shared/GGStockProductFacade.model";
import {MyLogger} from "../../service/logging/myLogging";
import {GGStockProductOrderImpl} from "../../model/shared/GGOrderFacade.model";
import {CustomerOrder} from "../../model/shared/CoffeeOrder.infc";
import {CustomerOrderFacade} from "../../model/shared/CustomerOrderFacade";


const STOCK_COLLECTION_NAME: string = 'GGStockProducts';
const PIN_NAME: string = 'XXW';

@Injectable({
  providedIn: 'root'
})
export class RepoGGService implements OnDestroy {
  get orderInProcess(): OrderSent | undefined {
    return this._orderInProcess;
  }

  set orderInProcess(value: OrderSent | undefined) {
    this._orderInProcess = value;
  }

  private _orderInProcess: OrderSent | undefined;
  public cacheresults = false;
  public id = Math.round(Math.random() * 1000);
  public subject: ReplaySubject<any> = new ReplaySubject<any>();

  constructor() {
    // @ts-ignore
    Parse.serverURL = 'https://v69coffee.b4a.io';
    this._configLocalDatastore();
    this.initWebhookListener();
  }


  private _configLocalDatastore(): void {
  }

  async initWebhookListener(): Promise<any> {
    const qr = new Parse.Query(STOCK_COLLECTION_NAME);
    const sub = await qr.subscribe();
    sub.on('update', a => MyLogger.log('updates ==>')('trigger update event', a));
    sub.on('create', a => MyLogger.log('create ==>')('trigger create event', a));
    sub.on("enter", a => MyLogger.log('Enter ==>')('trigger Enter event', a));
    sub.on('delete', a => {
      a.unPin();
    });

  }

  async _findProductItems(): Promise<any> {
    if (!this.cacheresults) {

      let query = new Parse.Query(STOCK_COLLECTION_NAME);
      query.fromNetwork();
      const results = await query.find();

      this.cacheresults = true;
      return results;
    }
    //  Parse.Object.unPinAllObjects();
    const query = new Parse.Query(STOCK_COLLECTION_NAME);
 //   MyLogger.log('+++')('querey from local datastore')
    query.fromNetwork();
    const res = await query.find();
    return res;
    // }
  }

  listProductItems(): Observable<GGStockProductFacade[]> {
    return fromPromise(this._findProductItems())
      .pipe(
        take(1),
        mergeMap((a: any) => from((a))),
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
    return arr as [string, GGStockProductFacade[]];
  }




  private async _findCoffeeOrderItems(): Promise<any> {
    const query = new Parse.Query('CoffeeOrders');
    return await query.find();
  }

  public listCoffeeOrderItems(): Observable<any> {
    return fromPromise(this._findCoffeeOrderItems())
      .pipe(
        take(1),
        map((a: any) => a.map((b: any) => (GGStockProductOrderImpl.create(b)))),
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
      );
  }

  async removeImage(thumb: string, id: string): Promise<any> {
    const fn = await Parse.Cloud.run('IAmACloud');
    // console.log('run i am cloud', fn);
    return null;
  }

  async deletStockProductImage(thumb: string, id: string): Promise<any> {
    const fn = await Parse.Cloud.run('deletStockProductImage', {id});
    return fn;
  }

  public async postToOrders(payload: { payment: any; shippingInfo: any; basket: any; }): Promise<any> {
    try {
      const claz = Parse.Object.extend('CoffeeOrders');
      const inst = new claz();
      inst.set('name', 'postPaymentInitiatedToDb');
      inst.set('shipping_info', payload.shippingInfo);
      inst.set('order', payload.basket);
      inst.set('payment_intent', payload.payment.payment_intent);
      inst.set('payment_status', payload.payment.payment_status);
      inst.set('payment', payload.payment);

      const retval = await inst.save();
      const fn = await Parse.Cloud.run('UpdatelastCoffeeOrderDatetime');
      return 'retval';
    } catch (error) {
      MyLogger.log('&& Error &&')(error.message);
    }
  }

  public async ggPostToCloudFunction(payload: { payment: StripePaymentDetails; shippingInfo: any; basket: any; }): Promise<any> {
    const result = await this.postToOrders(payload);
    return result.id;
  }

  public async _getOrder(id: string): Promise<any> {

    try {
      const query = new Parse.Query('CoffeeOrders');
      const result = await query.get(id);
      return result;
    } catch (e) {
      MyLogger.error()(e.message, 'orderId', id);
    }
  }

  public async getOrder(id: string): Promise<Parse.Object> {
    const rsul = this._getOrder(id);
    return await rsul;
  }

  public async getCartOfOrder(id: string): Promise<CustomerOrderFacade> {
    const rsul: Parse.Object = await this._getOrder(id);
    return  CustomerOrderFacade.create(rsul);
  }

  ngOnDestroy(): void {
    Parse.Object.unPinAllObjects();
  }

}
