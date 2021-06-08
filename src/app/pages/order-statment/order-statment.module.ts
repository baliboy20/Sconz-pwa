import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderStatmentRoutingModule } from './order-statment-routing.module';
import { OrderStatmentComponent } from './order-statment.component';


@NgModule({
  declarations: [OrderStatmentComponent],
  exports: [OrderStatmentComponent],
  imports: [
    CommonModule,
    OrderStatmentRoutingModule
  ]
})
export class OrderStatmentModule { }
