// Cart todo this interface needs to be sorted
import {NonPriceOptions, StockProductVariants} from './StockProducts';

export interface CartItem {
    size: string;
    price: number;
    // variant: string; // todo to be deprecated
    vId: string;
    description: string;
    name: string;
    productId: string;
    nonPriceOptions: NonPriceOptions;
    // thumbUrl: string;
    thumbImg: string;
    // thumbImgUrl: string;
    // img: string;
    qty: number;
    variantNotes?: string;
    // productCode?: string;
    // variantArr: StockProductVariant[];  // todo to supercede variant with Array
    productItemUrl?: string;  // @deprecated
}

/**
 * leaves the relationship of StockProduct and variants intact
 * Should deprecate CartItems interface next as CartItemFacadeModel facade can stand alone on this.
 */
export class CartItemFacade implements CartItem {

    get size(): string {
        return this._item.size;
    }

    get ProductId(): string {
        return this._item.productId;
    }

    get description(): string {
        return this._item.description;
    }

    get price(): number {
        return this._item.price;
    }

    get thumbImg(): string {
        return this._item.thumbImg;
    }

    get thumbUrl(): string {

        return this._item.thumbImg;
    }

    get vId(): string {
        return this._item.vId;
    }

    get name(): string {
        return this._item.name;
    }

    get productId(): string {
        return this._item.productId;
    }

    constructor(private _item: CartItem) {
    }

    get nonPriceOptions(): NonPriceOptions {
        return this._item.nonPriceOptions;
    }

    set nonPriceOptions(value: NonPriceOptions) {
        this._item.nonPriceOptions = value;
    }

    get amount(): number {
        if (this._item.qty > 0 && this._item.price > 0) {
            return Math.round(this._item.qty * this._item.price * 100) / 100;
        } else {
            return NaN;
        }
    }

    get qty(): number {
        return this._item.qty;
    }

    set qty(value: number) {
        this._item.qty = value;
    }
  id: string | undefined;
    objectId: string | undefined;
    variant: string | undefined;

    static create(_itm: CartItem): CartItemFacade {
        return new CartItemFacade(_itm);
    }

    getNamePlusVariation(): string {
        return this.name + '/' + this.variant;
    }

    private _nonPriceOptionsFlatterned(): string {
        const fltn = this.nonPriceOptions
            .forTypes.reduce((str, itm) => {
                return `${itm.typeName}:[${itm.options.join(', ')}]`;
            }, '');
        return fltn;
    }

    _locateMatch(ci: CartItemFacade, pid: string, vid: string, options: any): boolean {
        const flattenedOptions = (a: CartItemFacade) => a.nonPriceOptions;
        const matcher: (a: CartItemFacade, b: string, c: string)
            => boolean = (a: CartItemFacade, b, c) => a.productId === b && a.vId === c;
        return matcher(ci, pid, vid);
    }


}
