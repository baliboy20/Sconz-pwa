import {Subject} from 'rxjs';
import {Basket, BasketTotal, CartType} from '../types';
import {EventEmitter} from '@angular/core';
import {GGStockProductOrder} from './GGOrderFacade.model';
import {CartItemFacade} from '../CartItemFacade.model';

export interface GGBasket {
  basketItems: GGStockProductOrder[];
  qty: number;
  total: number;
}

export interface GGBasketService {
  basketChanged: Subject<GGBasket>;
  // readonly Items: GGStockProductOrder[] | undefined;

  objId: number | undefined;

  basketItems: GGStockProductOrder[] | undefined;

  add(itm: GGStockProductOrder | GGStockProductOrder[]): void;

  _getBasket(): Basket | undefined;

  removeAt(idx: number): void;

  setQty(qty: number, idx: number): void;

  reset(): void;

  reSync(): void;

  descriptionListDelimited(): string;

  FromLocalStorage(): void;

  toLocalStorage(): void;

  clearout(): void;
}
