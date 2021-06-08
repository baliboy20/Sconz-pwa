import {Component, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CartService} from '../../services/cart.service';
import {Portal, TemplatePortal} from '@angular/cdk/portal';
import {StripePayService} from '../../stripe-payments-lib/services/stripe-pay.service';
import {Router} from '@angular/router';
import {mergeMap} from 'rxjs/operators';
import {RepoService} from '../../services/repo.service';
import {AppIcons} from '../../../assets/setting_configs/material-icons-sets';
import {CartType} from '../../model/types';

@Component({
  selector: 'app-shipping-information',
  templateUrl: './shipping-information.component.html',
  styleUrls: ['./shipping-information.component.scss']
})
export class ShippingInformationComponent implements OnInit {
  formGroup: FormGroup;
  @ViewChild('shippingSummary', {read: TemplateRef}) shippingSummary: TemplateRef<any> | undefined;
  @ViewChild('shippingInfoForm', {read: TemplateRef}) shippingInfoForm: TemplateRef<any> | undefined;
  activeTemplateRef: Portal<any> | undefined;
  cart: CartType[] | undefined;
  backArrow = AppIcons.left_arrow;
  appIcons = AppIcons;

  constructor(
    private vcr: ViewContainerRef,
    public service: CartService,
    private fb: FormBuilder,
    private stripeService: StripePayService,
    public router: Router,
    public repo: RepoService,
  ) {
    this.formGroup = fb.group({
      email: ['williampaulton@yahoo.co.uk', Validators.required],
      firstName: ['Jamie'],
      lastName: ['Theakston'],
      address: ['23 Shamrock drive'],
      apartment: ['The badlands'],
      city: ['Shannon'],
      country: ['Eire'],
      postCode: ['H3Y 2OP'],
      SaveInformation: [false],
      computedAddress: [''],
    });
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.cart = this.service.cartItems;
      // todo undo this deve code;
      this.computedAddress();

      this.activeTemplateRef =
        // @ts-ignore
        new TemplatePortal(this.shippingInfoForm, this.vcr);
    }, 50);

  }

  toShippingSummary(): void {
    // @ts-ignore
    this.activeTemplateRef = new TemplatePortal(this.shippingSummary, this.vcr);
    this.computedAddress();
  }

  private computedAddress = () => {
    const a = this.formGroup.getRawValue();
    this.formGroup.get('computedAddress')?.setValue(
      [a.address, a.apartment, a.city, a.postCode, a.country]
        .filter(b => b != null)
        .join(', '));
  }

  toShippingInfoForm(): void {
    setTimeout(() => {
      // @ts-ignore
      this.activeTemplateRef = new TemplatePortal(this.shippingInfoForm, this.vcr);
    }, 50);
  }

  async doCheckout(): Promise<void> {
    // const re = this.stripeService.formatLineItems(this.cart);
    const cart = {cart: this.cart, ...this.service.getBasketTotal()};
    const id = await this.stripeService.oneTimeCheckoutWithCheckoutSessionV2(this.formGroup.getRawValue(), cart);
    console.log('Checked out', id);
    // todo integrate this properly
    this.service.clearout();
    this.router.navigate(['/', 'order-statement', id]);
    /*
     w@c.co
     4242424242424242
     */
  }
}



