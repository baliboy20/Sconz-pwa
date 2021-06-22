import {OrderItems} from './CoffeeOrderFacade';
import {GGStockProductFacade, GGStockProductOption, GGStockProductVariant} from './GGStockProducts.model';
import {EventEmitter} from '@angular/core';

export interface GGStockProductChoiceOrder extends GGStockProductVariant {
  qty: number;
  amount: number;
  total: () => number;
}

export interface GGStockProductOptiontOrder extends GGStockProductOption {
  qty: number;
  amount: number;
}

export interface GGStockProductOrder {
  productId: string;
  name: string;
  id: string;
  thumbImg: { url?: string, _url?: string };
  thumbImgUrl: string;
  choice: GGStockProductVariant;
  options: GGStockProductOption[];
  optionsDescList: string | undefined;
  total: number;
  qty: number;
  instructions: string;
  clone: () => GGStockProductOrder;
  nameChoice: () => string;

  updateTotal(): void;
}


export class GGStockProductOrderImpl implements GGStockProductOrder {
  get thumbImgUrl(): string {
    if (typeof this.thumbImg == 'string') {
      return this.thumbImg as string;

    } else if ('_url' in this.thumbImg) {
      return this.thumbImg._url as string;

    } else if ('url' in this.thumbImg) {
      return this.thumbImg.url as string;
    } else {
      return '';
    }
  }

  constructor(data: GGStockProductOrder | GGStockProductOrderImpl) {
    this.instructions = data.instructions;
    this.qty = data.qty;
    this.choice = data.choice;
    this.id = data.id;
    this.productId = data.productId;
    this.total = data.total;
    this.name = data.name;
    this.thumbImg = data.thumbImg;
    this.options = data.options;
    this._thumbImgUrl = (data.thumbImg._url ?? data.thumbImg._url) as string;
    this.reCompute(this as GGStockProductOrder);
  }

  choice: GGStockProductVariant;
  id: string;
  name: string;
  options: GGStockProductOption[];
  productId: string;
  thumbImg: { url?: string, _url?: string };
  total: number;
  qty: number;
  instructions: string;
  private _thumbImgUrl: string;


  get optionsDescList(): string | undefined {
    // return 'a spoon full of henley';
    return !this.options || this.options.length == 0 ? '' :
            this.options.map(this. _GbpFmt).join(', ');
  }

private _GbpFmt(it: GGStockProductOption) : string {
    return it.price <= 0 ? it.name:  ` ${it.name} @ £${it.price.toString().padStart(2,'0')}`;

  // '£' + it.toString().padStart(2, '0')
}
  /**  */
  static totalOfOptions(options: GGStockProductOption[]): number {
    const total = options
      .map(a => (a.price))
      .reduce((agg: number, b) => (agg + b), 0);
    return total;
  }

  static create(a: GGStockProductOrder): GGStockProductOrder {
    return new GGStockProductOrderImpl(a);
  }

  public reCompute(data: GGStockProductOrder): void {
    this.total = Math.round((this.choice.price * this.qty * 100) +
      GGStockProductOrderImpl.totalOfOptions(this.options) * 100) / 100;
  }

  nameChoice(): string {
    return `${this.name}/${this.choice.name}`;
  }

  public clone(): GGStockProductOrder {
    const choice = Object.assign({}, this.choice) as GGStockProductChoiceOrder;
    const options = this.options.map(a => Object.assign({}, a) as GGStockProductOptiontOrder);
    return new GGStockProductOrderImpl(this);
  }

  updateTotal(): void {
    this.reCompute(this);
  }
}
