import { Injectable } from '@angular/core';
import {OrderSent} from "../stripe-payments-lib/services/stripe-pay.service";

@Injectable({
  providedIn: 'root'
})
export class OrderStatmentService {
  get oId(): string {
    return this._oId ?? 'EglFd7cUn8';
  }

  set oId(value: string) {
    this._oId = value;
  }

  constructor() { }
  getOrder(): OrderSent | 'invalid' | string  | boolean{
    if(!this._submittedAt) {
      return 'no submittedAt';
    }
    const isExpired = new Date(Date.now() - this.allowedElapsedtime * 60000) > this._submittedAt;
    if ( isExpired) {
      return  'expired';
    } else if (this._order){
      return this._order;
    } else {
      return 'invalid';
    }

  }

  set order(value: OrderSent | string) {
    this._order = value;
    this._submittedAt = new Date();
  }
  allowedElapsedtime= 5;  // 5mins

  private _order: OrderSent | undefined | string;
  private _submittedAt?: Date | undefined;
  private _oId!: string;
}
