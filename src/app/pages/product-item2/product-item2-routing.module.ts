import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductItem2Component } from './product-item2.component';

const routes: Routes = [
  { path: '',
    component: ProductItem2Component
  },
  // { path: '/',
  //   component: ProductItem2Component
  // },
   ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductItem2RoutingModule { }
