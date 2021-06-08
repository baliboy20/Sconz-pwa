import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopCart2RoutingModule } from './shop-cart2-routing.module';
import { ShopCart2Component } from './shop-cart2.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";


@NgModule({
  declarations: [ShopCart2Component],
  exports: [ShopCart2Component],
  imports: [
    CommonModule,
    ShopCart2RoutingModule,
    MatDividerModule,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
  ]
})
export class ShopCart2Module { }
