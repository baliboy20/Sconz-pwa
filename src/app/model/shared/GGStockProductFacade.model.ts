import * as Parse from 'parse';
import {GGStockProduct, GGStockProductChoice, GGStockProductOption} from './GGStockProducts.infc';
import {MyLogger} from "../../service/logging/myLogging";
import {ThumbImageReader} from "../ThumbImageReader";
import {ParseFileFacade} from "./ParseFileFacade.model";


/**
 * ~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==
 * StockProductFacade
 */
export class GGStockProductFacade implements GGStockProduct {

  /*==============*/
  /* stuctural;   */
  /*==============*/

  constructor(private item: Parse.Object) {
    const im = item.get('thumbImg');
  //  MyLogger.large('thumbImg')(item);
    if ( !!im && '_url' in im) {

      this._thumbImgReader = ThumbImageReader.createFromUrl(im._url);
      MyLogger.log('- + -')(im);
    } else {
      this._thumbImgReader = ThumbImageReader.createEmpty();
      // MyLogger.large('- + -')(this._thumbImgReader);
    }
  }


  /* ========================*/
  /*  properties and state   */
  /*======================== */


  get options(): GGStockProductOption[] {
    return this.item.get('options');
  }

  set options(value: GGStockProductOption[]) {
    this.item.set('options', value);
  }

  get choices(): GGStockProductChoice[] {
    return this.item.get('choices');
  }

  set choices(value: GGStockProductChoice[]) {
    this.item.set('choices', value);
  }

  get categories(): string[] {
    return this.item.get('categories');
  }

  set categories(value: string[]) {
    this.item.set('categories', value);
  }

  get imageParseFile(): ParseFileFacade {
    return this._imageParseFile;
  }

  set imageParseFile(value: ParseFileFacade) {
    this._imageParseFile = value;
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

  get id(): string {
    return this.item.id;
  }

  set id(value: string) {
    this.item.id = value;
  }

  private _category: string = '';
  private _thumbImgReader: ThumbImageReader;


  /* ========================*/
  /*  Creational             */
  /*======================== */



  static create(b: Parse.Object): GGStockProductFacade {
    const retval = new GGStockProductFacade(b);
    return (retval);
  }

  // Todo remove this
  // public static restrucVariantFormVals(value: { variants: any[] }): any {
  //   return {...value, variants: {vars: value.variants}};
  // }

  /**
   * Created from form data.
   * @param rawValue
   */
  static createFromJson(rawValue: GGStockProduct & { options: any[] }): GGStockProductFacade {

    const clz = Parse.Object.extend('GGStockProducts');
    const inst = new clz();
    const fad = new GGStockProductFacade(inst);
    fad.id = rawValue.id;
    fad.productId = rawValue.productId;
    fad.description = rawValue.description;
    fad.name = rawValue.name;
    fad.categories = rawValue.categories;
    fad.choices = (rawValue.choices as GGStockProductChoice[]);
    fad.options = rawValue.options as GGStockProductOption[];

    return fad;
  }


  /* ========================*/
  /*  Operations methods     */
  /*======================== */


  /**
   * Save Image if dirty;
   * @param value
   * @private
   */
  async saveImgIfDirty(): Promise<any> {
    try {
      return  await this._imageParseFile.save();
    } catch (e) {
      console.log('%cError', e.message);
    }
  }

  private _setThumbImg(value: any): void {
    this.item.set('thumbImg', value);
    if (value instanceof Parse.File) {
      this._thumbImgReader = ThumbImageReader.createFromUrl(value._url);
      console.log('thumbImgFacade', this._thumbImgReader);
    } else {
      console.log('thumbImgFacade', value instanceof Parse.File, value);
    }

  }

  getThumbImgUrl(): string {
    return this._thumbImgReader.url;
  }

  private _imageParseFile: Parse.File | any;

  /**
   * Adaptesr to {var:variant[]} from  variant[] for storage as a json object
   */
  // getFieldOfVariant(fieldName: string): any[] {
  //   return this.choices.map(a => a[fieldName]);
  // }

  lowestPrice(): number | string {
    const a = 10e7;
    const tst = (c: any, b: any) => (c.price < b.price ? c.price : b.price);
    const lp = this.choices.reduce(tst, 1e10);
    return lp;
  }

  public async save(): Promise<void> {
    try {
      const ff: ParseFileFacade = ParseFileFacade.create(this._imageParseFile)
      const savedfile = await ff.saveOnly();
      MyLogger.normal()('savedfile', savedfile);
      this.item.set('thumbImg', savedfile);
      await this.item.save({useMasterKey: true});
    } catch (e) {
      console.log('Error on saving parse object', e.message);

    } finally {

    }
  }

  async remove(): Promise<any> {
    try {
      MyLogger.log('++')('prod', this.item);
      return await this.item.destroy({});
    } catch (e) {
      MyLogger.normal()(e.message);
    }
  }

 get thumbImg(): ThumbImageReader | undefined {
    return this._thumbImgReader;
 }
}
