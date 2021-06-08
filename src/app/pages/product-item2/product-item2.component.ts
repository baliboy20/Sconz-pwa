import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn} from '@angular/forms';
import {CartService} from '../../services/cart.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RepoService} from '../../services/repo.service';
import {StockProductFacade, StockProductVariant, StockProductVariants} from '../../model/StockProducts';
import {mergeMap} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {BasketService} from '../../services/basket.service';
import {CartItem, CartItemFacade} from '../../model/CartItemFacade.model';

// @ts-ignore
declare const Stripe;



@Component({
  selector: 'app-product-item2',
  templateUrl: './product-item2.component.html',
  styleUrls: ['./product-item2.component.scss'],
})
export class ProductItem2Component implements OnInit {

  panelOpenState: boolean = false;
  formGroup: FormGroup;
  stockProduct: StockProductFacade | undefined;
  selectedVariant: StockProductVariants | undefined;
  variants: StockProductVariant[] | undefined;
  accordionVisibility = 'none';
  locationUrl: string;
  showErrors = false;
  isMousedown = false;
  @ViewChild('CartAddedDialong', {read: TemplateRef}) dialogTmpl: TemplateRef<any> | undefined;

  constructor(
    private basket: BasketService,
    private cart: CartService,
    private fb: FormBuilder,
    private acr: ActivatedRoute,
    private repo: RepoService,
    public dialog: MatDialog,
    public router: Router) {

    this.formGroup = GenFormProductItem.genformBlank(this.fb);
    this.locationUrl = window.location.href;
  }

  ngOnInit(): void {
    // const fn = this._initFormGroup;
    this.acr.params
      .pipe(
        mergeMap(a => this.repo.findOne(a.id)),
      )
      .subscribe((spf: StockProductFacade) => {
          if (!spf) {
            console.log('%cIsnull', 'color: red', spf);
            return;
          }
          console.log('dod er ger here', spf);
          this.formGroup = GenFormProductItem.genFormPopulate(this.fb, spf);
          this.stockProduct = spf;
          this.variants = spf.variants.vars;
        }
      );
  }
/////
  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit(): void {
    this.accordionVisibility = 'hidden';
  }

  backButton(): void {
    this.router.navigate(['.', 'shop', 'coffee']);
  }

  addToCart(): void {

    this.showErrors = true;
    if ((this.formGroup.pristine) || (this.formGroup.status === 'INVALID')) {
      console.log('SHOW errors:', this.formGroup.status, this.formGroup);
      return;
    }

    if (this.formGroup.status === 'INVALID') {
      return;
    }

  }

  // addToBasket_dev(): void {
  //   this.dialog.open(this.dialogTmpl);
  //   return;
  // }

  addToBasket(): void {
    this.showErrors = true;
    if ((this.formGroup.pristine) || (this.formGroup.status === 'INVALID')) {
      console.log('SHOW errors:', this.formGroup.status, this.formGroup);
      return;
    }

    if (this.formGroup.status === 'INVALID') {
      return;
    }
    const vals = this.formGroup.getRawValue();
    console.log('Vals', vals);

    const prod: CartItem = {
      productId: vals.productId,
      qty: vals.qty,
      nonPriceOptions: {forTypes: [{typeName: 'grindType', options: [vals.grindType]}]},
      description: vals.description,
      name: vals.name,
      thumbImg: vals.url,
      productItemUrl: window.location.href, // Todo remove this
      ...vals.variant,
    };
    const fc: CartItemFacade = CartItemFacade.create(prod);
    console.log('fc', prod);
    console.log('fc2', vals);
    this.basket.add(fc);
    // @ts-ignore
   this.dialog.open(this.dialogTmpl);
    return;
  }

  onValueChanged(varr: StockProductVariant): void {
    console.log('value changed', this.formGroup.controls.variant.value?.price);
  }

  onCheckout(): void {
    // sdf
  }
}

//  ~_-  ~_-  ~_-  ~_-  ~_-  VALIDATOR METHODS  ~_-  ~_-  ~_-  ~_-  ~_-  ~_-  ~_-  ~_-  ~_-
export function minValue(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const forbidden = control.value < 1;
    return forbidden ? {lessThanZero: {value: control.value}} : null;
  };
}

export function notNull(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isNull = control.value === null;
    const res = isNull ? {isNull: {value: control.value}} : null;
    //  console.log('isNull:', isNull, control, res);
    return res;
  };
}

//  ~_-  ~_-  ~_-  ~_-  ~_-  ~_-  ~_-  ~_-  ~_-  ~_-  ~_-  ~_-  ~_-  ~_-  ~_-  ~_-  ~_-  ~_-
//    Helper Class : GenFormProductItem
//  ~_-  ~_-  ~_-  ~_-  ~_-  ~_-  ~_-  ~_-  ~_-  ~_-  ~_-  ~_-  ~_-  ~_-  ~_-  ~_-  ~_-  ~_-
export class GenFormProductItem {
  public static genformBlank(fb: FormBuilder): FormGroup {
    return fb.group({
      isSubscription: [false],
      size: [],
      grindType: [],
      qty: [0],
      variant: [],
      price: [],
      name: [],
      url: [],
      id: []
    });
  }

  /**
   */
  public static genFormPopulate(fb: FormBuilder, sp: StockProductFacade): FormGroup {
    return fb.group({
      isSubscription: [false],
      // size: [null, notNull()],
      grindType: [null, notNull()],
      qty: [1, minValue()],
      variant: [null, notNull()],  // takes the variant object
      price: [],
      description: [sp.description],
      name: [sp.name],
      url: [sp.thumbImg._url],
      thumbImgUrl: [sp.thumbImg._url],
      productId: [sp.productId],   // the product code
      id: [sp.id],  // db object id
      vId: [], // selected vID
    });
  }
}
