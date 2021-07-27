import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  NgZone,
  OnInit
} from '@angular/core';
import {GGCartService} from "../../services/ggcart.service";
import {PageBase} from "../../framework/pages/page-base/page-base";
import {GGBasket} from "../../model/shared/GGCart.model";
import {GGStockProductOrder, GGStockProductOrderImpl} from "../../model/shared/GGOrderFacade.model";
import {Router} from "@angular/router";
import {MatSidenav} from "@angular/material/sidenav";
import {map} from "rxjs/operators";

@Component({
  selector: 'v69-shopcart-drawer',
  templateUrl: './shop-cart-side-nav.component.html',
  styleUrls: ['./shop-cart-side-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopCartSideNavComponent extends PageBase implements OnInit {
  @Input('cartSideNav') sideNav: MatSidenav | undefined;
 basket: GGBasket | undefined;
  constructor(
    public cartService: GGCartService,
    private router: Router,
    private ref: ChangeDetectorRef
  ) {
    super();
    this.ref.detach()
  }


  public e(a: GGStockProductOrderImpl | GGStockProductOrder) : GGStockProductOrderImpl {
    // console.log('instance of', a.thumbImg?.url);
    return a as GGStockProductOrderImpl;
  }
  ngOnInit(): void {
   super.subscription = this.cartService.basketChanged


      .subscribe(a => {
        this.basket = a;
        this.ref.reattach();
        this.ref.markForCheck();
        this.ref.detectChanges();
        console.log('basket changed subscription');
      });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  onCheckout(): void{
    // this.router.navigate(['/gg-checkout']);
    this.sideNav?.close();
    this.router.navigate(['/gg-checkout']);
  }


  onQtyChanged(qty: number, idx: number) {
   console.log('qty changed', qty, idx);
    this.cartService.setQty(qty,idx )
  }

  removeAction(idx: number): void {
    this.cartService.removeAt(idx)
  }

  removeAllAction(): void {
    this.cartService.clearout();
    this.sideNav?.close();
  }
}
