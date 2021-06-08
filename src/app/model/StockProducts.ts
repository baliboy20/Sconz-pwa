import * as Parse from 'parse';

export const NoImgPath = '../../../assets/images/NO_Image_available.jpeg';

/**
 * Priced related variants of a product that can be chosen by the customer. Is part of StockProduct
 */
export interface StockProductVariant {
  variant: string;
  vId: string;
  size: string;
  price: number;
  variantNotes: string;
}

export interface StockProductVariants {
  vars: Array<StockProductVariant>;
}

export interface NonPriceOption {
  typeName: string;
  options: string[];
}

/** from object colum with the format of
 *   {forTypes: [{typeName: 'grindType', options: ['Whole Bean', 'Espresso', 'V60', 'Ground']}] }
 */
export interface NonPriceOptions {
  forTypes: Array<NonPriceOption>;
}


/**
 * ~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==
 *      StockProduct
 */
/**
 * Interface for StockProducts retrieved from Db. Main implementations is
 * StockProductFacade
 */
export interface StockProduct {
  productId: string;
  name: string;
  description: string;
  id: string;
  thumbImg: string;
  variants?: StockProductVariants | StockProductVariant[];
  nonPriceOptions?: NonPriceOptions | NonPriceOption[];
}

/**
 * ~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==
 *      StockProductFacade
 */
export class StockProductFacade implements StockProduct {

  constructor(private item: Parse.Object | any) {
    console.log('%cGET the any type sorted', 'font-size:25px',item)
  }

  get thumbImg(): any {

    if (this.item.get('thumbImg') === null) {
      return {_url: `https://parsefiles.back4app.com/fZTnKcHmI10Bqv2avtNiRQzaxFotKVFMLTF9tR7i/22d775cdda6dbe865ba814d7900561ee_no_image-sm.jpg`};
    } else {
      return this.item.get('thumbImg');
    }

  } //hello

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
    this.item.set('name', value);
  }

  get description(): string {
    return this.item.get('description');
  }

  set description(value) {
    this.item.set('description', value);
    console.log('setting desc', value, this.item);
  }

  get productId(): string {
    return this.item.get('productId');
  }

  set productId(value) {
    this.item.set('productId', value);
  }

  get variants(): StockProductVariants {
    return this.item.get('variants');
  }

  set variants(value: StockProductVariants) {
    this.item.set('variants', value);
  }

  get nonPriceOptions(): NonPriceOptions {
    return this.item.get('non_price_options');
  }

  set nonPriceOptions(value: NonPriceOptions) {
    this.item.set('non_price_options', value);
  }

  get nonPriceOptionsArray(): NonPriceOption[] {
    return this.item.get('non_price_options').forTypes;
  }

  get id(): string {
    return this.item.id;
  }

  set id(value: string) {
    this.item.id = value;
  }

  static create(b: Parse.Object<Parse.Attributes>): StockProductFacade {
    const retval = new StockProductFacade(b);
    return (retval);
  }

  public static restrucVariantFormVals(value: { variants: any[] }): any {
    return {...value, variants: {vars: value.variants}};
  }

  static createFromJson(rawValue: StockProduct & {options: any[]}): StockProductFacade {

    const clz = Parse.Object.extend('StockProducts');
    const inst = new clz();
    const fad = new StockProductFacade(inst);
    fad.id = rawValue.id;
    fad.description = rawValue.description;
    // console.log('rqw', fad.description, fad);
    fad.name = rawValue.name;
    fad.adaptToObjectVariants(rawValue.variants as StockProductVariant[]);
    // console.log('%c 33', 'color: green', rawValue.options);
    fad.adaptToObjectNonPricedOptions(rawValue.options as NonPriceOption[]);
    return fad;
  }

  getThumbImgUrl(): string {
    return this.thumbImg._url;
  }

  getNonPricedOptions(typeName: string): NonPriceOption | null {
    const obj = this.nonPriceOptions;
    console.log('non price options', obj);
    if (obj === null || obj.forTypes === null) {
      return null;
    } else {
    }
    const options = obj.forTypes.filter(b => {
      return b.typeName === typeName;
    });
    if (options === undefined || options.length < 1) {
      return {typeName: 'Error not found ' + typeName, options: ['no options for ' + typeName]};
    } else {
      throw new Error('code to be completeed');
      return null;
    }
  }

  getVariantsArray(): StockProductVariant[] {
    return this.variants.vars;
  }

  // adapter transform json obj storage to useable array format.
  adaptToObjectVariants(vars: StockProductVariant[]): void {
    this.variants = {vars};
  }

  /**
   * Adapter from {var:variant[]} for storage to variant[]
   */
  adaptFromObjectVariants(): StockProductVariant[] {
    return this.variants.vars;
  }

  /**
   * Adapter to {var:nonpricedOption[]} from  nonpricedOption[] for storage as a json object
   */
  adaptToObjectNonPricedOptions(forTypes: NonPriceOption[]): void {
    console.log('%c non proced opt', 'color: green', forTypes);
    this.nonPriceOptions = {forTypes};
  }

  /**
   * Adaptesr to {var:nonpricedOption[]} from  nonpricedOption[] for storage as a json object
   */
  adaptFromObjectNonPricedOptions(): NonPriceOption[] {
    return this.item.get('non_price_options').forTypes;
  }

  /**
   * Adaptesr to {var:variant[]} from  variant[] for storage as a json object
   */
  getFieldOfVariant(fieldName: string): any[] {
    // @ts-ignore
    return this.getVariantsArray().map(a => a[fieldName]);
  }

  lowestPrice(): number | string {
    const tst = (c: { price: number; }, b: { price: number; }) => (c.price < b.price ? c.price : b.price);
    // @ts-ignore
    const lp = this.getVariantsArray().reduce(tst, 1000000000000);
    // @ts-ignore
    return lp;
  }

  public save(): void {
    console.log('%cSAVING', 'color:red');
    this.item.save();
  }
}




