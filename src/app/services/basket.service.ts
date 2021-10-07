import {EventEmitter, Injectable} from '@angular/core';
import {ReplaySubject, Subject} from 'rxjs';
import {Basket, BasketTotal} from '../model/types';
import {ToCurrencyStringFn} from '../features/utils/computes';
import {environment} from '../../environments/environment';
import {CartItem, CartItemFacade} from '../model/CartItemFacade.model';


@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor() {
  }


  get basketItems(): CartItemFacade[] {
    // console.log('cart items getter is deprecated use observable instead');
    return this._basketItems;
  }

  private readonly _computedTotal: BasketTotal = {qty: 0, total: 0};

  BasketChanged: EventEmitter<any> = new EventEmitter<any>();
  objId = Math.random() * 10000;
  _basketItems: CartItemFacade[] = [];
  basket: ReplaySubject<Basket> = new ReplaySubject<Basket>();

  getComputedTotal(): { qty: number, total: number } {
    return this._computedTotal;
  }

  _retrieveCartFromLocalStorage(): void {
    const lsStr = window.localStorage.getItem(environment.LOCAL_STORAGE_CART_ITEMS_KEY);
    // @ts-ignore
    const arr: any = JSON.parse(lsStr);
    console.log(' ::retrieveCartFromLocalStorage', arr);
    if (Array.isArray(arr) && (arr as Array<CartItem>).length > 0) {
      this.basketItems.push(...arr);
    } else {
      return;
    }
    this.recompute();
  }


  _getBasket(): Basket {
    // @ts-ignore
    return {cart: this.basketItems, qty: 2, ...this._computedTotal};
  }

  _setBasketInLocalStorage(): void {
    if (this.basketItems && this.basketItems.length > 0) {
      console.log('_setBasketInLocalStorage', this.basketItems[0].qty);
      const str = JSON.stringify(this.basketItems);
      window.localStorage.setItem(environment.LOCAL_STORAGE_CART_ITEMS_KEY, str);
    }
  }

  add(itm: CartItemFacade | CartItemFacade[]): void {
    const itms: Array<CartItemFacade> = Array.isArray(itm) ? itm : [itm];
    for (const i of itms) {
      const idx: number = BasketServiceUtils.findExisting(i, this.basketItems);
      if (idx === -1) {
        this.basketItems.unshift(i);
      } else {
        this.basketItems[idx].qty += i.qty;
      }
    }
    this.recompute();
  }

  clear(): void {
    this.basketItems.splice(0, this.basketItems.length);
    this.recompute();
  }

  descriptionListDelimited(): string {
    return '';
  }

  getBasketTotal(): BasketTotal | undefined {
    return undefined;
  }

  recompute(): void {
    console.log('recomputing')
    const fn = ToCurrencyStringFn;
    this._basketItems = [...this._basketItems];
    const initValue: BasketTotal = {total: 0, qty: 0};
    const redResFn: any = (acc: BasketTotal, val: CartItemFacade) => {
      acc.qty += val.qty;
      acc.total += val.amount;
      return acc;
    };
    const rs = this._basketItems.reduce(redResFn, initValue);
    this._computedTotal.qty = rs.qty;
    this._computedTotal.total = Math.round(rs.total * 100) / 100;
    console.log('compouted total', rs);
    this.BasketChanged.emit(rs);
    this._setBasketInLocalStorage();
    this.basket.next(this._getBasket());
  }

  removeAt(idx: number): void {

    if (idx < 0 || this.basketItems.length <= idx) {
      return;
    }
    this.basketItems.splice(idx, 1);
    console.log('splicing for :', idx);
    this.recompute();
  }

  setQty(qty: number, idx: string | number): void {
    // @ts-ignore
    const val = this.basketItems[idx].qty;
    if (val === undefined || val === qty) {
      return;
    }
    // @ts-ignore
    this.basketItems[idx].qty = qty;
    this.recompute();
  }
}

// ~~_ ~~_ ~~_ ~~_ ~~_ ~~_ ~~_ ~~_ ~~_ ~~_ ~~_ ~~_ ~~_ ~~_ ~~_ ~~_ ~~_ ~~_ ~~_ ~~_ ~~_ ~~_
//          BasketServiceUtils
// ~~_ ~~_ ~~_ ~~_ ~~_ ~~_ ~~_ ~~_ ~~_ ~~_ ~~_ ~~_ ~~_ ~~_ ~~_ ~~_ ~~_ ~~_ ~~_ ~~_ ~~_ ~~_
@Injectable({
  providedIn: 'root'
})
export class BasketServiceUtils {
  static findExisting(newItm: CartItem, cart: CartItem[]): number {
    const comparator = (cartItem: CartItem) => {
      return newItm.productId === cartItem.productId
        && newItm.vId === cartItem.vId;
    };
    return cart.findIndex(comparator);
  }
}
