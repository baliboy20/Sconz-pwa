import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {

  constructor() { }

   appSettings = {
    dev: {
      bypassStripePayment: 'checked',
    }
  }

  set skipStripePaymentPage(value: boolean) {
    this.appSettings.dev.bypassStripePayment = value ? 'checked' : '' ;
  }
  isSkipStripePaymentPageEnabled() {
    return this.appSettings.dev.bypassStripePayment === 'checked';
  }
}
