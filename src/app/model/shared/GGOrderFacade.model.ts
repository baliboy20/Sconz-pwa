import {GGStockProductChoice, GGStockProductOption} from './GGStockProducts.infc';

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
  thumbImg: { url?: string, _url?: string };
  thumbImgUrl: string;
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
  get thumbImgUrl(): string {
    if (typeof this.thumbImg === 'string') {
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
    this._qty = data.qty;
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


  get optionsDescList(): string | undefined {
    // return 'a spoon full of henley';
    return !this.options || this.options.length === 0 ? '' :
            this.options.map(this. _GbpFmt).join(', ');
  }

  choice: GGStockProductChoice;
  id: string;
  name: string;
  options: GGStockProductOption[];
  productId: string;
  thumbImg: { url?: string, _url?: string };
  total: number;
  private _qty: number;
  instructions: string;
  private _thumbImgUrl: string;
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

private _GbpFmt(it: GGStockProductOption): string {
    return it.price <= 0 ? it.name : ` ${it.name} @ £${it.price.toString().padStart(2, '0')}`;
}

  public reCompute(data: GGStockProductOrder): void {
    this.total = Math.round((this.choice.price * this._qty * 100) +
      GGStockProductOrderImpl.totalOfOptions(this.options) * 100) / 100;
  }

  get nameChoice(): string {
    return `${this.name}/${this.choice.name === '[default]' ? '' : this.choice.name}`;
  }

  public clone(): GGStockProductOrder {
    const choice = Object.assign({}, this.choice) as GGStockProductChoiceOrder;
    const options = this.options.map(a => Object.assign({}, a) as GGStockProductOptionOrder);
    const cln =  new GGStockProductOrderImpl(this);
    cln.qty = this.qty;
    return cln;
  }

  updateTotal(): void {
    this.reCompute(this);
  }
}
