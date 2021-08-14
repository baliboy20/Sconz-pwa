import * as Parse from 'parse';
import {MyLogger} from "../../service/logging/myLogging";


/**
 * Type used in the internal operations of the ThumbImageReader.
 */
export type ParseFileFacadeCloneable = {
  parseFileOriginal?: Parse.File,
  parseFileCurrent?: Parse.File,
  isDirty: boolean,
  dirtyImg: any,
};

/**
 * ~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==~±§_==
 *                  CLASS
 */
/**
 * Facade to Wraps Parse.File object to manage mutations and url for display.
 * Mutable, to ensure the object can be reverted during edit mode.
 */

export class ParseFileFacade {
  constructor(cloneProps?: ParseFileFacadeCloneable, url?:  string) {
    if (cloneProps) {
      this.currParsefile = cloneProps.parseFileCurrent ?? cloneProps.parseFileOriginal;
      this.origParsefile = cloneProps.parseFileOriginal;
      this.isDirty = cloneProps.isDirty;
      this.dirtyImg = cloneProps.dirtyImg;
      this.isEmpty = !this.origParsefile;
    } else if (url){
      this.isDirty = false;
      this.isEmpty = true;
      this._url = url;
    } else {
      this.isDirty = false;
      this.isEmpty = true;
      this._url = undefined;
    }

  }
   private readonly _url: string | undefined;
  /**
   * Get the url to the image. If saved on the parser server uses _url of Parse.File object.
   * If updated image is inserted uses the dirty image.
   * If no Parse.file returns a default no image jpeg;
   */
  get url(): string {
    if( this._url) {
      return this._url;
    }
    if (this.isDirty && this.dirtyImg) {
      // because the current parse.file has not yet been saved.
      return this.dirtyImg;
    }
   const retval = this.origParsefile ?
      this.origParsefile._url :
      `https://parsefiles.back4app.com/fZTnKcHmI10Bqv2avtNiRQzaxFotKVFMLTF9tR7i/22d775cdda6dbe865ba814d7900561ee_no_image-sm.jpg`;
    return retval;
  }

  private readonly origParsefile: Parse.File | undefined;
  private currParsefile: Parse.File | undefined;
  private isDirty = false;
  // todo add is empty flag.
  private isEmpty = true;

  // dirtyImg is used to display the image of the selected file as
  // the parseFile has not been saved to the cloud.
  private dirtyImg: any;

  /*=====================*/
  /*  creational  methods */

  /*=====================*/
  static create(value: Parse.File): ParseFileFacade {
    return new ParseFileFacade({parseFileOriginal: value, isDirty: false, dirtyImg: undefined});
  }


  static empty(): ParseFileFacade {
    const nwFac = new ParseFileFacade();
    nwFac.isEmpty = true;
    return nwFac;
  }

  /**
   * Create a Parse.File from the first item in the FileList;
   */
  newInstFromFileList(lst: FileList): ParseFileFacade {
    const pff = new ParseFileFacade({
      isDirty: this.isDirty,
      dirtyImg: this.dirtyImg,
      parseFileCurrent: this.currParsefile ?? undefined,
      parseFileOriginal: this.currParsefile ?? undefined
    });
    pff.insertNewImgFile(lst);
    return pff;
  }

  /*=====================*/
  /*  state  methods     */

  /*=====================*/

  revert(): void {
    if (this.currParsefile && (this.currParsefile !== this.origParsefile)) {
      this.currParsefile = this.origParsefile;
      this.isDirty = false;
      this.dirtyImg = null;
    } else {
      console.log('Revert Failed');
    }
  }

  /**
   * Inserts a user select image File from FileList into instance of the facade.
   * Marks the facade as dirty.
   */
  public insertNewImgFile(lst: FileList): void {
    let pf: Parse.File;

    if (!lst || lst.length === 0) {
      // todo test this scenario;
      pf = new Parse.File('empty', []);
    } else if (lst instanceof FileList) {
      pf = new Parse.File((lst.item(0) as { name: string }).name, lst.item(0) as Blob);
      this.currParsefile = pf;
      this.isDirty = true;
      const reader: FileReader = new FileReader();
      reader.readAsDataURL(lst.item(0) as Blob);
      reader.onload = (e) => this.dirtyImg = reader.result;
      // console.log('currentParseFile', pf);
    } else {
      throw Error('not a FileList object');
    }
  }

  /*=====================*/
  /*  operation  methods */

  /*=====================*/
  /**
   *
   */
  async upsertToDb(stockProductsId?: string): Promise<Parse.File | undefined> {

    // if isdirty and orig & current then delete
    // if isdirty and current but no orig don't delete.
    // if isn't dirty and orgin return orig else return null;
    //
    // MyLogger.normal()('is dirty', this.isDirty, stockProductsId);
    if (!this.isDirty) {
      return this.origParsefile;
    }

    // todo implement this commented block deleting orignal parsefile image.
    if (stockProductsId && this.isDirty) {
      const fn = await Parse.Cloud.run('deletGGStockProductImage', {id: stockProductsId});
    }

    if (this.currParsefile && this.origParsefile !== this.currParsefile) {
      try {
        const savedFile = await this.currParsefile.save();
        return savedFile;
      } catch (e) {
        console.log('%cError', e.message);
      }
    } else {
      console.log('no changes');
      return undefined;
    }

  }

  async saveOnly(): Promise<Parse.File | null> {
    try {
      if (this.currParsefile) {
       return await this.currParsefile.save();
      }
    } catch (e) {
      console.log('%cError', e.message);
    }
    return null;
  }
}

