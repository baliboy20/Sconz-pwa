import * as Parse from 'parse';
import {NonPriceOption, NonPriceOptions} from './StockProducts';
import {T} from "@angular/cdk/keycodes";
import {isNullOrUndefined} from "util";

export const NoImgPath = '../../../assets/images/NO_Image_available.jpeg';

/**
 * Priced related variants of a product that can be chosen by the customer. Is part of StockProduct
 */
export interface GGStockProductVariant {
  name: string;
  vId: string;
  description: string;
  price: number;
  notes: string;
}

export interface GGStockProductOption extends GGStockProductVariant{
oId: string;
}

export interface GGStockProductVariants {
  vars: Array<GGStockProductVariant>;
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
  thumbImg: string;
  // @deprecated
  // variants?: GGStockProductVariants | GGStockProductVariant[];
  // nonPriceOptions?: NonPriceOptions | NonPriceOption[];
  choices: GGStockProductVariant[];
  options: GGStockProductOption[];
}

/**
 * ~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==
 *      GGStockProductFacade
 */
export class GGStockProductFacade implements GGStockProduct {

  constructor(private item: Parse.Object) {
  }

  get options(): GGStockProductOption[] {
    return this.item.get('options');
  }

  set options(value: GGStockProductOption[]) {
    this.item.set('options', value as any);
  }

  get choices(): GGStockProductVariant[] {
    return this.item.get('choices');
  }
  set choices(value: GGStockProductVariant[]) {
    this.item.set('choices', value as any);
  }
  get categories(): string[] {
    return this.item.get('categories');
  }

  set categories(value: string[]) {
    this.item.set('categories', value as any);
  }

  get thumbImg(): any {
console.log('thumbimg', this.item.get('thumbImg'));
    if (!this.item.get('thumbImg')) {
      return {_url: `https://parsefiles.back4app.com/fZTnKcHmI10Bqv2avtNiRQzaxFotKVFMLTF9tR7i/22d775cdda6dbe865ba814d7900561ee_no_image-sm.jpg`};
    } else {
      return this.item.get('thumbImg');
    }

  }

  set thumbImg(value: any) {
    this.item.set('thumbImg', value);
    console.log('thumbImg sert', this.item);
  }

  get mediumImg(): any {
    return this.item.get('mediumImg');
  }

  set mediumImg(value: any) {
    this.item.set('mediumImg', value);
  }

  get name(): string {
    return this.item.get('name');
  }

  set name(value: string) {
    this.item.set('name',value as any);
  }

  get description(): string {
    return this.item.get('description') ?? this.item.get('size');
  }

  set description(value) {
    this.item.set('description', value as any);
    // console.log('setting desc', value, this.item);
  }

  get productId(): string {
    return this.item.get('productId');
  }

  set productId(value) {
    this.item.set('productId', value as any);
  }

  get id(): string {
    return this.item.id;
  }

  set id(value: string) {
    this.item.id = value;
  }
  static create(b: Parse.Object<Parse.Attributes>): GGStockProductFacade {
    const retval = new GGStockProductFacade(b);
    return (retval);
  }

  public static restrucVariantFormVals(value: { variants: any[] }): any {
    return {...value, variants: {vars: value.variants}};
  }

  static createFromJson(rawValue: GGStockProduct & { options: any[] }): GGStockProductFacade {

    const clz = Parse.Object.extend('GGStockProducts');
    const inst = new clz();
    const fad = new GGStockProductFacade(inst);
    fad.id = rawValue.id;
    fad.description = rawValue.description;
    fad.name = rawValue.name;
    // fad.adaptToObjectVariants(rawValue.variants as GGStockProductVariant[]);
    // fad.adaptToObjectNonPricedOptions(rawValue.options as NonPriceOption[]);
    return fad;
  }

  getThumbImgUrl(): string {
    return this.thumbImg._url;
  }

  /**
   * Adaptesr to {var:variant[]} from  variant[] for storage as a json object
   */
  getFieldOfVariant(fieldName: string): any[] {
    // @ts-ignore
    return this.choices.map(a => a[fieldName]);
  }

  lowestPrice<T>(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): number | string {
    const a = 10e7;
    const tst = (c: { price: number; }, b: { price: number; }) => (c.price < b.price ? c.price : b.price);
    // @ts-ignore
    const lp = this.choices.reduce(tst, 1e10);
    // @ts-ignore
    return lp;
  }

  public async save(): Promise<void> {
    console.log('%cSAVING', 'color:red', this.item);
    try {
     await this.item.save({ useMasterKey : true});
    } catch (e) {
      console.log('Error on saving parse object', e.message);

    }finally {

    }
  }
}




