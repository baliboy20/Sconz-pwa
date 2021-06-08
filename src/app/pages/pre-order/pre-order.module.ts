import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreOrderRoutingModule } from './pre-order-routing.module';
import { PreOrderComponent } from './pre-order.component';


@NgModule({
  declarations: [PreOrderComponent],
  imports: [
    CommonModule,
    PreOrderRoutingModule
  ]
})
export class PreOrderModule { }
