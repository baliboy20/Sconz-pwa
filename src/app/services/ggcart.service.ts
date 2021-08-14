import {Injectable} from '@angular/core';
import {GGBasket, GGBasketService} from '../model/shared/GGCart.model';
import {GGStockProductOptionOrder, GGStockProductOrder, GGStockProductOrderImpl} from '../model/shared/GGOrderFacade.model';
import {Basket, BasketTotal} from '../model/types';
import {ReplaySubject} from 'rxjs';
import {environment} from '../../environments/environment';
import {ToCurrencyStringFn} from '../features/utils/computes';
import {GGStockProductChoice, GGStockProductOption} from "../model/shared/GGStockProducts.infc";
import {MyLogger} from "../service/logging/myLogging";

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
    this.reSync();
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

  add(itm: GGStockProductOrder ): void {
    if (Array.isArray(itm)) {
      throw new Error('Dev error tried to add array of StockProductOrders to GGservice basket');
    }

    const idx = ItemInBasketExistsHelper.isMatched(itm, this.basketItems);

    // console.log('%c not inside', 'color: purple;  font-size: 20px', itm.qty, idx);
    if (idx !== -1) {
      this.basketItems[+idx].qty += itm.qty;
      // console.log('%c IS MATCHED', 'color: purple;  font-size: 20px', itm.qty, idx);
    } else {
      // console.log('%c ITEM ADDED', 'color: purple; font-size: 20px', itm);
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

  reSync(ignoreSaveToLocalStorage = false): void {
    //  console.log('resyncing...?')
    const fn = ToCurrencyStringFn;
    this._basketItems = [...this._basketItems];
    const initValue: BasketTotal = {total: 0, qty: 0};
    const redResFn: any = (acc: BasketTotal, val: GGStockProductOrder) => {
      acc.qty += val.qty;
      acc.total += val.total;
      return acc;
    };
    const rs = this._basketItems.reduce(redResFn, initValue);
    rs.total = Math.round(rs.total * 100) / 100;
    const b: GGBasket = {
      basketItems: Object.assign([], this.basketItems),
      ...rs,
    };
    this.basket = b;
    this.basketChanged.next(b);
    if ( !ignoreSaveToLocalStorage) {
      this.toLocalStorage();
    }

  }

  removeAt(idx: number): void {
    if (idx < 0 || this.basketItems.length <= idx) {
      return;
    }
    this.basketItems.splice(idx, 1);
    this.reSync();
  }


  reset(): void {
     this.basketItems.splice(0, this.basketItems.length);
    this.reSync();
  }

  setQty(qty: number, idx: string | number): void {
    const val = this.basketItems[+idx].qty;
    if (isNaN(val)) {
      this.basketItems[+idx].qty = 0;
    }
    if (isNaN(val) || val === qty) {
      console.log('is this the trap', !val, val, qty);
      return;
    }

    this.basketItems[+idx].qty = qty;
    this.reSync();
  }

  FromLocalStorage(): void {
    const lsStr = window.localStorage.getItem(environment.LOCAL_STORAGE_CLICK_COLLECT_ITEMS_KEY);
    if (!lsStr) {
      return;
    }
    let arr: any = JSON.parse(lsStr ?? '') as GGBasket;


    const bask: GGBasket = arr as GGBasket;


    if (Array.isArray(bask.basketItems) && bask.basketItems.length > 0) {
      const prodImpl = bask.basketItems.map(a =>  GGStockProductOrderImpl.create(a));
      //
      // const prodImpl = bask.basketItems.map(GGStockProductOrderImpl.create)
      bask.basketItems = prodImpl;
      console.log('Redtriedved', prodImpl);
      this.basketItems.push(...prodImpl);
      this.reSync(true);
    } else {
      return;
    }

  }

  toLocalStorage(): void {
    if (this.basketItems && this.basketItems.length > 0) {
      let str = JSON.stringify(this.basket ?? '');
      const reg = /_qty/g;
      str = str.replace(reg, 'qty');
   MyLogger.log('to local storage')(this.basketItems);
      window.localStorage.setItem(environment.LOCAL_STORAGE_CLICK_COLLECT_ITEMS_KEY, str);
    } else {
      window.localStorage.removeItem(environment.LOCAL_STORAGE_CLICK_COLLECT_ITEMS_KEY);
    }
  }
}

export type SelectionsType = GGStockProductChoice | GGStockProductOption;

/**
 * Determines whether a new product selection is added to an existing item in the cart incrementing qty or add a new element/
 */
export class ItemInBasketExistsHelper {
  static isMatched(item: GGStockProductOrder, basketItems: GGStockProductOrder[]): number {
    const hlp = ItemInBasketExistsHelper;
    const isEqual = hlp.selectionsAreEqual;
  for (const idx in basketItems)
    if (basketItems[idx].productId === item.productId
      && basketItems[idx].choice.vId === item.choice.vId) {
      if ( isEqual(item.options, basketItems[idx].options)){
        return +idx;
      }
    }
  return -1;
  }

  static selectionsAreEqual(item: SelectionsType[], choices: SelectionsType[]): boolean {
    if (!item || !choices) {
      return false;
    }

    if (item.length === 0 && choices.length === 0) {
      return true;
    }

    const longest = item.length >= choices.length ? item.map(a => a.vId).sort() : choices.map(a => a.vId).sort();
    const shortest = item.length < choices.length ? item.map(a => a.vId).sort() : choices.map(a => a.vId).sort();
    console.log(shortest, longest);
    for (const idx in longest) {
      if (shortest.length - 1 < +idx) {
        return false;
      } else if (shortest[idx] !== longest[idx]) {
        return false;
      }
    }
    return true;

  }


}
