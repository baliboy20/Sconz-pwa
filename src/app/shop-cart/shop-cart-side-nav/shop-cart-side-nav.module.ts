import { NgModule } from '@angular/core';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {ShopCartSideNavComponent} from "./shop-cart-side-nav.component";
import {MatButtonModule} from "@angular/material/button";
import {BasketIconModule} from "../../widgets/basket-icon/basket-icon.module";
import {MatIconModule} from "@angular/material/icon";
import {MatDivider, MatDividerModule} from "@angular/material/divider";
import {RouterModule} from "@angular/router";
import {NumericIncrementerModule} from "../../widgets/numeric-incrementer/numeric-incrementer.module";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [ShopCartSideNavComponent],
  exports: [
    ShopCartSideNavComponent,

  ],
  imports: [
    FormsModule,
    NumericIncrementerModule,
    CommonModule,
    MatButtonModule,
    BasketIconModule,
    MatIconModule,
    MatDividerModule,
    RouterModule.forChild([]),
  ]
})
export class ShopCartSideNavModule { }
