import {BrowserModule, HammerModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDesModule} from './features/mat-des/mat-des.module';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {ScullyLibModule} from '@scullyio/ng-lib';
import {CartService} from './services/cart.service';
import {InformationModule} from './pages/information/information.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpInterceptorForMockService} from './services/http-interceptors/mock-service-interceptor.service';
import {BasketIconModule} from './widgets/basket-icon/basket-icon.module';

import {environment} from '../environments/environment';
import {MatRippleModule} from '@angular/material/core';
import {MatMenuModule} from '@angular/material/menu';
import {DropDownCartListModule} from './widgets/drop-down-cart-list/drop-down-cart-list.module';
import * as Parse from 'parse';
import {GGCartService} from './services/ggcart.service';
import {ShopCartSideNavModule} from "./shop-cart/shop-cart-side-nav/shop-cart-side-nav.module";
import {PortalModule} from "@angular/cdk/portal";
import {OrderStatmentService} from "./service/order-statment.service";

Parse.initialize(environment.PARSE_APP_ID, environment.PARSE_JS_KEY, environment.PARSE_MASTER_KEY);

// @ts-ignore
Parse.serverURL = environment.ParseServerURL;

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDesModule,
    MatListModule,
    MatExpansionModule,
    ScullyLibModule,
    InformationModule,
    HttpClientModule,
    BasketIconModule,
    MatRippleModule,
    MatMenuModule,
    HammerModule,
    DropDownCartListModule,
    ShopCartSideNavModule,
    BasketIconModule,
    PortalModule,
  ],
  providers: [
    GGCartService,
    OrderStatmentService,
    CartService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorForMockService,
      multi: true,
    }
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

