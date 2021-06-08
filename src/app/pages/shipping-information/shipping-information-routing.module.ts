import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShippingInformationComponent } from './shipping-information.component';

const routes: Routes = [{ path: '', component: ShippingInformationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShippingInformationRoutingModule { }
