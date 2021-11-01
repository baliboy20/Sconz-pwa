import { NgModule } from '@angular/core';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {
  DeleteDialongComponent,
  EmptyTotalPipe,
  ShopCartSideNavComponent
} from "./shop-cart-side-nav.component";
import {MatButtonModule} from "@angular/material/button";
import {BasketIconModule} from "../../widgets/basket-icon/basket-icon.module";
import {MatIconModule} from "@angular/material/icon";
import {MatDivider, MatDividerModule} from "@angular/material/divider";
import {RouterModule} from "@angular/router";
import {NumericIncrementerModule} from "../../widgets/numeric-incrementer/numeric-incrementer.module";
import {FormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatRippleModule} from "@angular/material/core";



@NgModule({
  declarations: [ShopCartSideNavComponent,
    DeleteDialongComponent,
    EmptyTotalPipe,
  ],
  exports: [
    ShopCartSideNavComponent,
    EmptyTotalPipe,

  ],
    imports: [
        FormsModule,
        NumericIncrementerModule,
        CommonModule,
        MatButtonModule,
        BasketIconModule,
        MatIconModule,
        MatDividerModule,
        MatDialogModule,
        RouterModule.forChild([]),
        MatTooltipModule,
        MatRippleModule,
    ]
})
export class ShopCartSideNavModule { }
