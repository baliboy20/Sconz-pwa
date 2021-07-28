import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {GGCartService} from "../../services/ggcart.service";
import {BasketServiceUtils} from "../../services/basket.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PageBase} from "../../framework/pages/page-base/page-base";
import {GGBasket} from "../../model/shared/GGCart.model";
import {StripePayService} from "../../stripe-payments-lib/services/stripe-pay.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {environment} from "../../../environments/environment";
import {ShippingInfo} from "../../model/shared/ShippingInfo.interface";
import * as Parse from "parse";
import {MyLogger} from "../../service/logging/myLogging";
import {GGStockProductOrder} from "../../model/shared/GGOrderFacade.model";

@Component({
  selector: 'app-ggcheckout',
  templateUrl: './ggcheckout.component.html',
  styleUrls: ['./ggcheckout.component.scss']
})
export class GGCheckoutComponent extends PageBase implements OnInit {
  showSpinner = false;
  labelStyleConfig = {
    backgroundColor: 'white',
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
  styleConfigLabelForNumtor = {...this.labelStyleConfig, top: '-23px'};
  basket: GGBasket | undefined;
  formGroup: FormGroup = new FormGroup({
    email: new FormControl('william@happyplace.co.uk', Validators.required),
    firstName: new FormControl('Vill', Validators.required),
    lastName: new FormControl('Pills', Validators.required),
    saveDetails: new FormControl('', Validators.required),
  });

  constructor(
    private cartService: GGCartService,
    private orders: BasketServiceUtils,
    private ref: ChangeDetectorRef,
    private stripeService: StripePayService,
    private sb: MatSnackBar,
  ) {
    super();
  }

  ngOnInit(): void {

    super.subscription = this.cartService.basketChanged
      .subscribe(a => {
        this.basket = a;
        MyLogger.large()('bscket', a);
        this.ref.detectChanges();
      });
  }

  async placeOrderClicked(payLater = false) {
    const shipinfo: ShippingInfo =  this.formGroup.getRawValue();
    const id = await this.stripeService
      .ggOneTimeCheckout(
        payLater,
        shipinfo,
        this.cartService.clone()
      );

  }

  asItm(itm:  GGStockProductOrder): GGStockProductOrder {
    return itm;
  }
  ngOnDestroy(): void {
    Parse.Object.unPinAllObjects();
   // MyLogger.logCol({symbol: '±±±±', fontSize: '40px', color: 'orange'})('on destroy')
  }
  /*
   w@c.co
   4242424242424242
   */
  // }
  asBasketItem(basketItems: GGStockProductOrder[]): GGStockProductOrder[] {
   return basketItems;
  }
}
