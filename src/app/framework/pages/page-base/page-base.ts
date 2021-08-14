import {Subscription} from 'rxjs';
import {Component, Injectable, Injector, OnDestroy, ReflectiveInjector} from '@angular/core';
import {AppComponent} from "../../../app.component";
import {FormBuilder} from "@angular/forms";
import {MyLogger} from "../../../service/logging/myLogging";

@Injectable()
export abstract class PageBase {
  private subscriptions: Subscription[] = [];
  showSpinner = true;

  constructor() {
    // const i = Injector.create({ providers:[{provide: FormBuilder, useClass: FormBuilder}]})
    // const a = i.get(FormBuilder);
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy(): void {
    this.subscriptions.forEach(a => a.unsubscribe());
  }

  protected set subscription(a: Subscription) {
    this.subscriptions.push(a);
  }
}
