import {GGStockProductChoice, GGStockProductOption} from './GGStockProducts.infc';
import {MyLogger} from "../../service/logging/myLogging";
import {ThumbImageReader} from "../ThumbImageReader";
import {Pipe, PipeTransform} from "@angular/core";

export interface GGStockProductChoiceOrder extends GGStockProductChoice {
  qty: number;
  amount: number;
  total: () => number;
}

export interface GGStockProductOptionOrder extends GGStockProductOption {
  qty: number;
  amount: number;
}

export interface GGStockProductOrder {
  productId: string;
  name: string;
  id: string;
  thumbImg: ThumbImageReader;
  choice: GGStockProductChoice;
  options: GGStockProductOption[];
  optionsDescList: string | undefined;
  total: number;
  qty: number;
  instructions: string;
  clone: () => GGStockProductOrder;
  nameChoice: string;

  updateTotal(): void;
}


export class GGStockProductOrderImpl implements GGStockProductOrder {
  get qty(): number {
    return this._qty;
  }

  set qty(value: number) {
    this._qty = value;
    this.updateTotal();
  }

  get thumbImgUrl(): any {
    return this.thumbImg.url;
  }

  constructor(itm: GGStockProductOrder | GGStockProductOrderImpl) {
    this.instructions = itm.instructions;
    this._qty = itm.qty;
    this.choice = itm.choice;
    this.id = itm.id;
    this.productId = itm.productId;
    this.total = itm.total;
    this.name = itm.name;
//   MyLogger.large('reader')(itm.thumbImg)
    this.thumbImg = ThumbImageReader.createFromUrl(itm.thumbImg.url ?? itm.thumbImg._url)
    this.options = itm.options;
    this.reCompute(this as GGStockProductOrder);
  }


  get optionsDescList(): string | undefined {
    // return 'a spoon full of henley';
    return !this.options || this.options.length === 0 ? '' :
      this.options.map(this._GbpFmt).join(' ~ ');
  }

  choice: GGStockProductChoice;
  id: string;
  name: string;
  options: GGStockProductOption[];
  productId: string;
  thumbImg: ThumbImageReader;
  total: number;
  private _qty: number;
  instructions: string;
  // private _thumbImgUrl: string;

  /**  */
  static totalOfOptions(options: GGStockProductOption[]): number {
    const total = options
      .map(a => (+a.price))
      .reduce((agg: number, b) => (agg + b), 0);
    return total;
  }

  static create(a: GGStockProductOrder): GGStockProductOrder {

    return new GGStockProductOrderImpl(a);
  }

  private _GbpFmt(it: GGStockProductOption): string {
    const value = (Math.round(it.price * 100) / 100).toFixed(2).padStart(2, '0');
    return it.price <= 0 ? it.name : ` ${it.name} @ £${value}`;
  }

  public reCompute(data: GGStockProductOrder): void {
    this.total = Math.round((this.choice.price * this._qty * 100) +
      GGStockProductOrderImpl.totalOfOptions(this.options) * 100) / 100;
  }

  get nameChoice(): string {
    return `${this.name}${this.choice.name === '[default]' ? '' : '/' + this.choice.name}`;
  }

  public clone(): GGStockProductOrder {
    const choice = Object.assign({}, this.choice) as GGStockProductChoiceOrder;
    const options = this.options.map(a => Object.assign({}, a) as GGStockProductOptionOrder);
    const cln = new GGStockProductOrderImpl(this);
    cln.qty = this.qty;
    return cln;
  }

  updateTotal(): void {
    this.reCompute(this);
  }
}


