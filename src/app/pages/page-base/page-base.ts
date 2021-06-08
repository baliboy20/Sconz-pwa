import {Subscription} from 'rxjs';
import {Component, Injectable, OnDestroy} from '@angular/core';
@Injectable()
export abstract class PageBase {
  private subscriptions: Subscription[] = [];
  showSpinner = true;

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy(): void {
    this.subscriptions.forEach(a =>  a.unsubscribe());
  }
  protected set subscription(a: Subscription) {
    this.subscriptions.push(a);
  }
}
