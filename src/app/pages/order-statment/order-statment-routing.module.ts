import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderStatmentComponent } from './order-statment.component';

const routes: Routes = [{ path: ':orderId', component: OrderStatmentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderStatmentRoutingModule { }
