import {EventEmitter, Injectable} from '@angular/core';
import {Basket, BasketTotal, CartType} from '../model/types';
import {ToCurrencyStringFn} from '../features/utils/computes';
import {environment} from '../../environments/environment';
import {ReplaySubject, Subject} from 'rxjs';
import {GGBasketService} from '../model/shared/GGCart.model';

// import {LOCAL_STORAGE_CART_ITEMS_KEY} from '../pages/shop-cart/shop-cart.component';



@Injectable({
  providedIn: 'root'
})
export class CartService  {

  basket: Subject<Basket> = new ReplaySubject<Basket>();

  constructor() {
  //  this._retrieveCartFromLocalStorage();
    if (this._cartItems.length < 1) {
      environment.useDevCart = true;
      this._cartItems.push( ...devCartData);
    }
  }

  get cartItems(): CartType[] {
    console.log('cart items getter is deprecated use observable instead');
    return this._cartItems;
  }

  getTotal = '-----';

  _computedTotal: BasketTotal = {qty: 0, total: 0};

  cartChanged: EventEmitter<any> = new EventEmitter<any>();
  objId = Math.random() * 10000;
  _cartItems: CartType[] = [];

  getBasketTotal(): BasketTotal {
    return this._computedTotal;
  }

  add(itm: CartType | CartType[]): void {
    if (Array.isArray(itm)) {
      this.cartItems.push(...itm);
    } else {
      this.cartItems.push(itm);
    }
    this.recompute();

  }

  _getBasket(): Basket | undefined {
    // return {cart: this.cartItems, qty: 2, ...this._computedTotal};
    return undefined; //  {cart: this.cartItems, qty: 2, ...this._computedTotal};
  }

  removeAt(idx: number): void {

    if (idx < 0 || this.cartItems.length <= idx) {
      console.log('failed to remove');
      return;
    }
    this.cartItems.splice(idx, 1);
    console.log('splicing for :', idx);
    this.recompute();
  }

  setQty(qty: number, idx: number): void {
    console.log('setting qty', idx, qty);
    const val = this.cartItems[idx].qty;
    if (val === undefined || val === qty) {
      return;
    }
    this.cartItems[idx].qty = qty;
    this.recompute();
  }

  clear(): void {
    this.cartItems.splice(0, this.cartItems.length);
    this.recompute();
  }

  recompute(): void {
    console.log('recomputing...');
    const fn = ToCurrencyStringFn;
    this._cartItems = [...this._cartItems];
    const initValue: BasketTotal = {total: 0, qty: 0};
    const redResFn: any = (acc: BasketTotal, val: CartType) => {
      acc.qty += val.qty;
      acc.total += (val.price * val.qty);
      return acc;
    };
    const rs = this._cartItems.reduce(redResFn, initValue);
    this._computedTotal = rs;
    this.cartChanged.emit(rs);
    this._setCartInLocalStorage();
    this.basket.next(this._getBasket());
    console.log('recomputing...');
  }

  descriptionListDelimited(): string {
    return this.cartItems.map(a => (a.qty + ' x ' + a.description)).join(', ');
  }

  _retrieveCartFromLocalStorage(): void {
    const lsStr = window.localStorage.getItem(environment.LOCAL_STORAGE_CART_ITEMS_KEY) as string;
    const arr: any = JSON.parse(lsStr);
    console.log(' ::retrieveCartFromLocalStorage', arr);
    if (Array.isArray(arr) && (arr as Array<CartType>).length > 0) {
      this.cartItems.push(...arr);
    } else {
      return;
    }
    this.recompute();
  }

  _setCartInLocalStorage(): void {
    if (this.cartItems && this.cartItems.length > 0) {
      console.log('_setCartInLocalStorage', this.cartItems[0].qty);
      const str = JSON.stringify(this.cartItems);
      window.localStorage.setItem(environment.LOCAL_STORAGE_CART_ITEMS_KEY, str);
    }
  }

  clearout(): void {
    this.clear();
  }
}

// w@com.oc

// 4242424242424242 42424242
export const devCartData: CartType[] = [


];
