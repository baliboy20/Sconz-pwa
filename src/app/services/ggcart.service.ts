import {EventEmitter, Injectable} from '@angular/core';
import {GGBasket, GGBasketService} from '../model/GGCart.model';
import {GGStockProductOrder, GGStockProductOrderImpl} from '../model/GGOrderFacade.model';
import {Basket, BasketTotal, CartType} from '../model/types';
import {ReplaySubject, Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {ToCurrencyStringFn} from '../features/utils/computes';
import {CartItem, CartItemFacade} from '../model/CartItemFacade.model';
import {OrderSent} from "../stripe-payments-lib/services/stripe-pay.service";

// export type GGBasketTotal = { total: number, qty: number };


@Injectable({
  providedIn: 'root'
})
export class GGCartService implements GGBasketService {
  localStorageKey = environment.LOCAL_STORAGE_CLICK_COLLECT_ITEMS_KEY ?? 'ERROR_CLICK_COLLECT_CART_ITEMS';

  get basketItems(): GGStockProductOrder[] {
    return this._basketItems;

  }

  set basketItems(value: GGStockProductOrder[]) {
    this._basketItems = value;
  }

  constructor() {
    this.FromLocalStorage()
  }


  // readonly Items: GGStockProductOrder[] | undefined;
  private _basketItems: GGStockProductOrder[] = [];
  basketChanged: ReplaySubject<GGBasket> = new ReplaySubject();
  getTotal: string | undefined;
  objId: number | undefined;
  basket: GGBasket | undefined;

  _getBasket(): Basket | undefined {
    return undefined;
  }

  add(itm: GGStockProductOrder | GGStockProductOrder[]): void {
    // console.log('inside basket', 'color: red', itm.);
    if (Array.isArray(itm)) {
      this.basketItems.push(...itm.map(a => a.clone()));
    } else {
      console.log('%cADDD','color: purple', itm );
      this.basketItems.push(itm.clone());
    }
    this.reSync();
  }

  /**
   * ->>>>>> Clone of items in cart. <<<<<<<<<<
   */
  clone(): GGBasket {
    const arr = new Array(0);

    this.basketItems
      .forEach(a => {
        console.log('%cClone', 'color:red', a.clone);
       arr.push(a.clone());
      })
    const bsk: GGBasket = {
      total: this.basket?.total ?? 0,
      qty: this.basket?.qty ?? 0,
      basketItems: arr
    }
    return bsk;
  }
  clearout(): void {
    this.basketItems.splice(0, this.basketItems.length);
    this.reSync();
  }

  descriptionListDelimited(): string {
    return this.basketItems.map(a => (a.qty + ' x ' + a.name)).join(', ');
  }

  reSync(): void {
  //  console.log('resyncing...?')
    const fn = ToCurrencyStringFn;
    this._basketItems = [...this._basketItems];
    const initValue: BasketTotal = {total: 0, qty: 0};
    const redResFn: any = (acc: BasketTotal, val: GGStockProductOrder) => {
      acc.qty += val.qty;
      acc.total += val.total;
 //     console.log('computing total', acc.total, acc.qty);
      return acc;
    };
    const rs = this._basketItems.reduce(redResFn, initValue);
    rs.total = Math.round(rs.total * 100) / 100;
    const b: GGBasket = {
      basketItems: Object.assign([], this.basketItems),
      ...rs,
    };
    this.basket = b;
    console.log('inside basket', b)
    this.basketChanged.next(b);
    this.toLocalStorage();
  }

  removeAt(idx: number): void {
    if (idx < 0 || this.basketItems.length <= idx) {
      console.log('failed to remove');
      return;
    }
    this.basketItems.splice(idx, 1);
   // console.log('splicing for :', idx);
    this.reSync();
  }

  reset(): void {
    this.basketItems.splice(0, this.basketItems.length);
    this.reSync();
  }

  setQty(qty: number, idx: string | number): void {
    // console.log('setting qty', idx, qty, this.basketItems[+idx].qty);

    const val = this.basketItems[+idx].qty;
    if (isNaN(val) || val === qty) {
      console.log('is this the trap', !val, val, qty);
      return;
    }

    this.basketItems[+idx].qty = qty;
    // @ts-ignore
     // this.basketItems[+idx].updateTotal();
    this.reSync();
  }

  FromLocalStorage(): void {
    const lsStr = window.localStorage.getItem(environment.LOCAL_STORAGE_CLICK_COLLECT_ITEMS_KEY);
    if (!lsStr) {
      return;
    }
    const arr: any = JSON.parse(lsStr ?? '');

    console.log(' ::retrieveCartFromLocalStorage', arr);

    const bask: GGBasket = arr;


    if (Array.isArray(bask.basketItems) && bask.basketItems.length > 0) {
      const prodImpl = bask.basketItems.map(a => GGStockProductOrderImpl.create(a));
      bask.basketItems = prodImpl;
      console.log('Redtriedved', prodImpl);
      this.basketItems.push(...prodImpl);
      this.reSync();
    } else {
      return;
    }

  }

  toLocalStorage(): void {
    if (this.basketItems && this.basketItems.length > 0) {
      const str = JSON.stringify(this.basket ?? '');
      window.localStorage.setItem(environment.LOCAL_STORAGE_CLICK_COLLECT_ITEMS_KEY, str);
    }
  }
}
