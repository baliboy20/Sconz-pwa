import {EventEmitter, Injectable} from '@angular/core';
import {GGBasket, GGCart} from '../model/GGCart.model';
import {GGStockProductOrder, GGStockProductOrderImpl} from '../model/GGOrderFacade.model';
import {Basket, BasketTotal, CartType} from '../model/types';
import {Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {ToCurrencyStringFn} from '../features/utils/computes';
import {CartItem, CartItemFacade} from '../model/CartItemFacade.model';

// export type GGBasketTotal = { total: number, qty: number };


@Injectable({
  providedIn: 'root'
})
export class GGCartService implements GGCart {
  localStorageKey = environment.LOCAL_STORAGE_CART_ITEMS_KEY ?? 'DEV_CART_ITEMS';

  get cartItems(): GGStockProductOrder[] {
    return this._cartItems;
  }

  set cartItems(value: GGStockProductOrder[]) {
    this._cartItems = value;
  }

  constructor() {
  }

  readonly Items: GGStockProductOrder[] | undefined;
  private _cartItems: GGStockProductOrder[] = [];
  basketChanged: Subject<GGBasket> = new EventEmitter();
  getTotal: string | undefined;
  objId: number | undefined;

  _getBasket(): Basket | undefined {
    return undefined;
  }

  add(itm: GGStockProductOrder | GGStockProductOrder[]): void {
    // console.log('inside basket', 'color: red', itm.);
    if (Array.isArray(itm)) {
      this.cartItems.push(...itm.map(a => a.clone()));
    } else {
      this.cartItems.push(itm.clone());
    }
    this.reSync();
  }

  clearout(): void {
  }

  descriptionListDelimited(): string {
    return this.cartItems.map(a => (a.qty + ' x ' + a.name)).join(', ');
  }

  reSync(): void {
    console.log('recomputing...');
    const fn = ToCurrencyStringFn;
    this._cartItems = [...this._cartItems];
    const initValue: BasketTotal = {total: 0, qty: 0};
    const redResFn: any = (acc: BasketTotal, val: GGStockProductOrder) => {
      acc.qty += val.qty;
      acc.total += val.total;
      return acc;
    };
    const rs = this._cartItems.reduce(redResFn, initValue);
    rs.total = Math.round(rs.total * 100) / 100;
    const b: GGBasket = {
      cart: Object.assign([], this.cartItems),
      ...rs,
    };
    this.basketChanged.next(b);
    this.toLocalStorage();
    console.log('recomputing...');
  }

  removeAt(idx: number): void {
    if (idx < 0 || this.cartItems.length <= idx) {
      console.log('failed to remove');
      return;
    }
    this.cartItems.splice(idx, 1);
    console.log('splicing for :', idx);
    this.reSync();
  }

  reset(): void {
    this.cartItems.splice(0, this.cartItems.length);
    this.reSync();
  }

  setQty(qty: number, idx: string | number): void {
    console.log('setting qty', idx, qty);
    // @ts-ignore
    const val = this.cartItems[idx].qty;
    if (!val || val === qty) {
      return;
    }
    // @ts-ignore
    this.cartItems[idx].qty = qty;
    // @ts-ignore
    this.cartItems[idx].updateTotal();
    this.reSync();
  }

  FromLocalStorage(): void {
    const lsStr = window.localStorage.getItem(environment.LOCAL_STORAGE_CART_ITEMS_KEY);

      const arr: any = JSON.parse(lsStr ?? '');

    console.log(' ::retrieveCartFromLocalStorage', arr);
    if (Array.isArray(arr) && (arr as Array<CartType>).length > 0) {
      this.cartItems.push(...arr);
    } else {
      return;
    }
    this.reSync();
  }


  toLocalStorage(): void {
    if (this.cartItems && this.cartItems.length > 0) {
      const str = JSON.stringify(this.cartItems);
      window.localStorage.setItem(environment.LOCAL_STORAGE_CART_ITEMS_KEY, str);
    }
  }
}
