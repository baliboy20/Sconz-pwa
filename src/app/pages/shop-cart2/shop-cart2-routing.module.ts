import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopCart2Component } from './shop-cart2.component';

const routes: Routes = [{ path: '', component: ShopCart2Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopCart2RoutingModule { }
