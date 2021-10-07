import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {Router} from '@angular/router';
import {BasketService} from '../../services/basket.service';
import {CartItemFacade} from '../../model/CartItemFacade.model';
import {PageBase} from '../../framework/pages/page-base/page-base';
import {Basket} from '../../model/types';
import {tap} from 'rxjs/operators';
import {AppIcons} from '../../../assets/setting_configs/material-icons-sets';

// export const LOCAL_STORAGE_CART_ITEMS_KEY = 'DEV_v69_cart-items';

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopCartComponent extends PageBase implements OnInit {
  styleConfigLabel = {
    backgroundColor: 'var(--background-color1)',
    border: 'none 1px dotted var(--grey-50)',
    color: 'var(--grey-50)',
    top: '-10px',
    margin: 0,
    padding: '0 1ch'
  };
  styleConfigWrapper = {
    textAlign: 'justify',
    padding: '0 14px 8px 14px',
    color: 'var(--grey-30)'
  };
  styleConfigLabelForNumtor = {...this.styleConfigLabel, top: '-23px'};

  public rightArrow = AppIcons.right_arrow;
  public basket: Basket | undefined;

  constructor(
    public router: Router,
    public baskService: BasketService) {
    super();
  }


  ngOnInit(): void {
    super.subscription = this.baskService
      .basket
      .pipe(tap(a => console.log('a', a)))
      .subscribe(bsk => this.basket = bsk);
  }

  getProductUrl(item: CartItemFacade): string[] {
    // const str1: string = (this.cart.cartItems[0] as any).productItemUrl
    return ['/', 'product-item2', item.productId];
  }

  doCheckout(): void {
    this.router.navigate(['shipping-information']);
  }

  removeItm(idx: number): void {
    console.log('removeItm()', idx);
    this.baskService.removeAt(idx);
  }

  onQtyProperyChanged(event: any, idx: number): void {
    this.baskService.setQty(event, idx);
  }

  getGrindType(itm: CartItemFacade): string {
    const retval = itm.nonPriceOptions.forTypes.filter(a => a.typeName === 'grindType')[0].options[0];
    console.log('retval', retval);
    return retval;
  }
}

