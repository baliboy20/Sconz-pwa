import {StockProductVariant} from './StockProducts';
import {CartItem, CartItemFacade} from './CartItemFacade.model';

export type BasketTotal = { total: number, qty: number };
export type CartType = CartItem;
export interface Basket {
  cart: CartItemFacade[];
  qty: number;
  total: number;
}


// todo Type 'StockProductVariant' is missing the following properties
// from type 'CartType': img, qty, description, thumbUrl
export type FlatternedCartItem = CartType | StockProductVariant;


