import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  Inject,
  Input,
  OnInit, Pipe, PipeTransform
} from '@angular/core';
import {GGCartService} from "../../services/ggcart.service";
import {PageBase} from "../../framework/pages/page-base/page-base";
import {GGBasket} from "../../model/shared/GGCart.model";
import {GGStockProductOrder, GGStockProductOrderImpl} from "../../model/shared/GGOrderFacade.model";
import {Router} from "@angular/router";
import {MatSidenav} from "@angular/material/sidenav";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MyLogger} from "../../service/logging/myLogging";
import {first} from "rxjs/operators";


@Pipe({
  name: 'emptyTotal'
})
export class EmptyTotalPipe implements PipeTransform{
  transform(value: any, ...args: any[]): any {
   if (!value) {
     return 0;
   }
    return  10.00;
  }
}

@Component({
  selector: 'click-collect-cart',
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
    private ref: ChangeDetectorRef,
    private dlg: MatDialog,
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
      });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  onCheckout(): void{
    this.sideNav?.close();
    this.router.navigate(['/gg-checkout']);
  }


  onQtyChanged(qty: number, idx: number) {
    this.cartService.setQty(qty,idx )
  }

  removeAction(idx: number): void {
    this.cartService.removeAt(idx)
  }

  removeAllAction(): void {
    const ref = this.dlg.open(DeleteDialongComponent)
    ref.afterClosed()
      .subscribe(a => {
        if(a === 'ok'){
          this.cartService.clearout();
          this.sideNav?.close();
        } else {
          this.sideNav?.close();
        }
      })

  }

  isEmptyBasket(): boolean {
    const bsk = this.basket?.basketItems.length ?? -1;
    return bsk < 1;
  }
}
/*  ===================================================================================================
                                      DeleteDialongComponent
    ===================================================================================================
 */
@Component({
  selector: '',
  template: `
    <span>Clear all basket items?</span>
    <div> <button mat-stroked-button (click)="this.onNoClick('ok')">CONTINUE</button>
     <button mat-stroked-button (click)="this.onNoClick('cancel')">CANCEL</button></div>
  `,

})
export class DeleteDialongComponent {
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: { }) {}

  onNoClick(re: 'ok' | 'cancel'): void {
    this.dialogRef.close(re);
  }

}
