import {ThumbImageReader} from "../ThumbImageReader";


export const NoImgPath = '../../../assets/images/NO_Image_available.jpeg';

/**
 * Priced related variants of a product that can be chosen by the customer. Is part of StockProduct
 */
export interface GGStockProductChoice {
  name: string;
  vId: string;
  description: string;
  price: number;
  notes: string;
}

export interface GGStockProductOption extends GGStockProductChoice {
  oId: string;
}




/**
 * ~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==
 *      StockProduct
 */
/**
 * Interface for StockProducts retrieved from Db. Main implementations is
 * StockProductFacade
 */
export interface GGStockProduct {
  productId: string;
  categories: string[];
  name: string;
  description: string;
  id: string;
  thumbImg: ThumbImageReader | undefined;
  choices: GGStockProductChoice[];
  options: GGStockProductOption[];
}






