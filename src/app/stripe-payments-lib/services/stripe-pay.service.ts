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

declare const Stripe: new (arg0: string) => any ;
type StripeSessionResponse = {
  id: string,
  amount_total: string,
  mode: string,
  payment_intent: string,
  payment_status: string,
};

const paymentStruc = (lineItems: LineItemsType[]) => {
  return {
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: environment.siteUrl + '/#/order-statement',
    // success_url: `${environment.serverURL} /checkout/payment-success`,
    cancel_url: environment.siteUrl + '/#/order-statement',
    // cancel_url: `${environment.serverURL} /checkout/payment-success`,
  };
};


@Injectable({
  providedIn: 'root'
})
export class StripePayService {
  stripe = new Stripe(environment.stripe_pkey);
  lastSession = {};
  serverUrl = environment.siteUrl;
  ba4Hdr = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('X-Parse-Application-Id', environment.PARSE_APP_ID)
    .set('X-Parse-REST-API-Key', environment.PARSE_REST_API_KEY);

  constructor(public http: HttpClient, public repo: RepoService) {
  }

  public testResponse(): void {
    this.http.get(this.serverUrl + 'small', {headers: this.ba4Hdr}).subscribe(console.log);
  }

  public createPaymentIntent(data: any): Observable<any> {
    return this.http.post(this.serverUrl + 'create-payment-intent', data);
  }

  // public confirmPaymentIntent(data: any): Observable<any> | null {
  //   if (true) {
  //     this.testResponse();
  //     return null ;
  //   }
  //   //  return this.http.post(this.serverUrl + 'confirm-payment-intent', {});
  // }


  public async oneTimeCheckoutWithCheckoutSessionV2(shippingInfo: any, basket: any): Promise<any> {
    const stripeCartItems = this.formatLineItems(basket.cart);
    const stripeFormatOrderDetails = paymentStruc(stripeCartItems);
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
          return this.repo.postToCloudFunction(payload);
        } catch (e) {
          console.log('error throw in postToCloudFunction', e.message);
          throw e;
        }

        // TODO reinstate to show the payments screen  this.stripe.redirectToCheckout({sessionId: payment.id});
        // TODO COMMENT THSIS DEV CODE OUT

      });

  }

  private async _redirectToCheckout(sessionId: string): Promise<any> {
    const retval = await this.stripe.redirectToCheckout({sessionId});
    console.log('_redirectToCheckout', retval);
  }

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
}


const testdata = {
  payment_method_types: ['card'],
  line_items: [{
    price_data: {currency: 'gbp', unit_amount: 980, product_data: {name: 'ground', images: ['mygob.png']}},
    quantity: 5
  }, {price_data: {currency: 'gbp', unit_amount: 1780, product_data: {name: 'wholebean', images: ['mygob.png']}}, quantity: 2}],
  mode: 'payment',
  success_url: environment.siteUrl + '/order-statement',
  cancel_url: environment.siteUrl + '/checkout/payment-success',
};
