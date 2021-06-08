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
  thumbImg: string;
  choice: GGStockProductVariant;
  options: GGStockProductOption[];
  optionsDescList: string  | undefined;
  total: number;
  qty: number;
  instructions: string;
  clone: () => GGStockProductOrder;
  nameChoice: () => string;
  updateTotal(): void;
}


export class GGStockProductOrderImpl implements GGStockProductOrder {
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
    this.reCompute(this as GGStockProductOrder);
  }

  choice: GGStockProductVariant;
  id: string;
  name: string;
  options: GGStockProductOption[];
  productId: string;
  thumbImg: string;
  optionsDescList: string | undefined;
  total: number;
  qty: number;
  instructions: string;

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

  private reCompute(data: GGStockProductOrder): void {
    this.total = Math.round((this.choice.price * this.qty * 100) +
      GGStockProductOrderImpl.totalOfOptions(this.options) * 100) / 100;
  }

  nameChoice(): string {
    return `${this.name}/${this.choice.name}`;
  }
  public clone(): GGStockProductOrder {
    const choice = Object.assign({}, this.choice) as GGStockProductChoiceOrder;
    const options = this.options.map(a => Object.assign({}, a) as GGStockProductOptiontOrder);
    return{...this, choice, options};
  }

  updateTotal(): void {
    this.reCompute(this);
  }
}
