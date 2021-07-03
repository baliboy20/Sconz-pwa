import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {LineItemsType} from '../model/LineItemsType';
import {fromPromise} from 'rxjs/internal-compatibility';
import {mergeMap, tap} from 'rxjs/operators';
import {RepoService} from '../../services/repo.service';
import {CartType} from '../../model/types';
import {CartItem} from '../../model/CartItemFacade.model';
import {GGStockProductOrder, GGStockProductOrderImpl} from "../../model/GGOrderFacade.model";
import {RepoGGService} from "./repo-g-g.service";
import {OrderStatmentService} from "../../service/order-statment.service";
import {Router} from "@angular/router";
import {GGBasket} from "../../model/GGCart.model";

declare const Stripe: new (arg0: string) => any;
/**
 * ~__== ~__== ~__== ~__== ~__== ~__== ~__== ~__== ~__== ~__== ~__== ~__== ~__==
 *
 *  LOCAL TYPES AND FACTORIES
 *  ~__== ~__== ~__== ~__== ~__== ~__== ~__== ~__== ~__== ~__== ~__== ~__== ~__==
 */


type StripeSessionResponse = {
  id: string,
  amount_total: string,
  mode: string,
  payment_intent: string,
  payment_status: string,
};

export type StripePaymentDetails = {
  amount_total: string,
  mode: string,
  payment_intent: string,
  payment_status: string,
  id: string
}

export function StripeSessionResponseFactory(session: StripeSessionResponse | undefined): StripePaymentDetails {
  if (!session) {
    return {
      amount_total: '',
      mode: '',
      payment_intent: '',
      payment_status: '',
      id: '',
    } as StripePaymentDetails;
  } else {
    return {
      amount_total: session.amount_total,
      mode: session.mode,
      payment_intent: session.payment_intent,
      payment_status: session.payment_status,
      id: session.id,
    } as StripePaymentDetails;
  }

}

export type OrderSent = {
  payment: StripePaymentDetails,
  shippingInfo: any,
  basket: GGBasket
}

const paymentStruc = (lineItems: LineItemsType[]) => {
  return {
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: environment.siteUrl + '/#/order-statement/succeeded',
    // success_url: `${environment.serverURL} /checkout/payment-success`,
    cancel_url: environment.siteUrl + '/#/order-statement/cancelled',
    // cancel_url: `${environment.serverURL} /checkout/payment-success`,
  };
};

/**
 *  ___---___---___---___---___---___---___---___---___---___---___---___---___---___---
 StripePayService
 *  ___---___---___---___---___---___---___---___---___---___---___---___---___---___---
 */

@Injectable({
  providedIn: 'root'
})
export class StripePayService {
  stripe = new Stripe(environment.stripe_pkey);
  lastSession = {};
  serverUrl = environment.ParseServerURL;
  ba4Hdr = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('X-Parse-Application-Id', environment.PARSE_APP_ID)
    .set('X-Parse-REST-API-Key', environment.PARSE_REST_API_KEY);

  constructor(
    public http: HttpClient,
    private router: Router,
    private orderStatementService: OrderStatmentService,
    public repo: RepoGGService) {
  }

  public testResponse(): void {
    this.http.get(this.serverUrl + 'small', {headers: this.ba4Hdr}).subscribe(console.log);
  }

  public createPaymentIntent(data: any): Observable<any> {
    return this.http.post(this.serverUrl + 'create-payment-intent', data);
  }

  @Deprecate('oneTimeCheckoutWithCheckoutSessionV2')
  public async oneTimeCheckoutWithCheckoutSessionV2(shippingInfo: any, basket: any): Promise<any> {
    const stripeCartItems = this.formatLineItems(basket.cart);
    const stripeFormatOrderDetails: any = paymentStruc(stripeCartItems);
    console.log('shipping infor', shippingInfo);
    // @ts-ignore
    return this.http.post(this.serverUrl + 'create-checkout-session', stripeFormatOrderDetails, {headers: this.ba4Hdr})
      .toPromise()
      .then((session: StripeSessionResponse | any) => {
        const payment: StripeSessionResponse = {
          amount_total: session.amount_total,
          mode: session.mode,
          payment_intent: session.payment_intent,
          payment_status: session.payment_status,
          id: session.id,
        };
        const payload = {
          payment,
          shippingInfo,
          basket,
        };

        try {
          return this.repo.ggPostToCloudFunction(payload);
        } catch (e) {
          console.log('error throw in postToCloudFunction', e.message);
          throw e;
        }
      });

  }

  /**
   * One Time Checkout With Checkout Session
   * @param enablePayment
   * @param shippingInfo
   * @param cartItems
   */
  public async ggOneTimeCheckout(enablePayment = false, shippingInfo: any,
                                 basket: GGBasket): Promise<any> {

    const stripeCartItems = this.ggFormatLineItems(basket.basketItems);
    const stripeFormatOrderDetails = paymentStruc(stripeCartItems);
    // console.log('INFO:',this.serverUrl, stripeFormatOrderDetails);

    // @ts-ignore
    return this.http
      .post(this.serverUrl + 'create-checkout-session',
        stripeFormatOrderDetails, {headers: this.ba4Hdr})
      .toPromise()
      .then((session: StripeSessionResponse | any) => {
        const payment: StripePaymentDetails = StripeSessionResponseFactory(session)
        console.log('%cBasket in pay service','color: yellow', basket);
        const payload: OrderSent = {
          payment,
          shippingInfo,
          basket,
        };
        try {

          // Post to parse server
          this.repo.ggPostToCloudFunction(payload).then(a => {
            console.log('ggPostToCloudFunction', a)
            this.orderStatementService.oId = a;
            if (enablePayment) {
              this.stripe.redirectToCheckout({sessionId: session.id});
            } else {
              this.router.navigate(['order-statement', 'succeeded'])
            }
          });

        } catch (e) {
          console.log('error throw in postToCloudFunction', e.message);
          throw e;
        }
      });
  }


  @Deprecate('formatLineItems')
  public formatLineItems(c: CartItem[]): LineItemsType[] {
    const lts: LineItemsType[] = [];
    for (const itm of c) {
      const nw: LineItemsType = {
        price_data: {
          currency: 'gbp',
          unit_amount: Math.round(itm.price * 100),
          product_data: {
            name: `${itm.description}/ ${itm.name}/ ${itm.size}`,
            images: [],
          },
        },
        quantity: itm.qty
      };
      lts.push(nw);
    }
    return lts;
  }

  public ggFormatLineItems(c: GGStockProductOrder[]): LineItemsType[] {
    const lts: LineItemsType[] = [];
    for (const itm of c) {
      const nw: LineItemsType = {
        price_data: {
          currency: 'gbp',
          unit_amount: Math.round(itm.choice.price * 100),
          product_data: {
            name: `${itm.name}/ ${itm.choice.name}/ ${itm.optionsDescList}`,
            images: [],
          },
        },
        quantity: itm.qty
      };
      lts.push(nw);
    }
    return lts;
  }
}


const testdata = {
  payment_method_types: ['card'],
  line_items: [{
    price_data: {currency: 'gbp', unit_amount: 980, product_data: {name: 'ground', images: ['mygob.png']}},
    quantity: 5
  }, {
    price_data: {currency: 'gbp', unit_amount: 1780, product_data: {name: 'wholebean', images: ['mygob.png']}},
    quantity: 2
  }],
  mode: 'payment',
  success_url: environment.siteUrl + '/order-statement',
  cancel_url: environment.siteUrl + '/checkout/payment-success',
};

const test2data = {
  "payment_method_types": ["card"],
  "line_items": [{
    "price_data": {
      "currency": "gbp",
      "unit_amount": 1495,
      "product_data": {"name": "Coffee Roasted for Milk  No 1/ wholebean/ 275g", "images": []}
    }, "quantity": 2
  }, {
    "price_data": {
      "currency": "gbp",
      "unit_amount": 121,
      "product_data": {"name": "Coffee Roasted for Milk  No 1/ peppery for Catering/Cafe's/ 1.5kg", "images": []}
    }, "quantity": 2
  }],
  "mode": "payment",
  "success_url": "http://localhost:4200/#/order-statement",
  "cancel_url": "http://localhost:4200/#/order-statement"
}


export function Deprecate(arg?: string) {

  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("%cDEPRECATE: " + arg, 'color: red; fontSize: 23px', propertyKey, descriptor);
  };
}
