import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderStatmentComponent } from './order-statment.component';

const routes: Routes = [
  { path: 'success/:orderId', component: OrderStatmentComponent },
  { path: 'cancelled/:orderId', component: OrderStatmentComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderStatmentRoutingModule { }
