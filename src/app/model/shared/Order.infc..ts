import {GGStockProductChoice, GGStockProductOption} from "./GGStockProducts.infc";
import {GGBasket} from "./GGCart.model";
import {GGStockProductOrder} from "./GGOrderFacade.model";

export interface OrderItems {
  size: string;
  price: string;
  variant: string;
  vId: string;
  qty: number;
  grindType: string;
  description: string;
  thumbUrl: string;
  productItemUrl: string;
}

export interface Order {
  basketItems: GGStockProductOrder[];
  qty: number;
  total: number;
}

