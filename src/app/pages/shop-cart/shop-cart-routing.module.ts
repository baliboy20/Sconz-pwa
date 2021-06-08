import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ShopCartComponent} from './shop-cart.component';
import {OutlinedLabelModule} from '../../widgets/outlined-label/outlined-label.module';

const routes: Routes = [{path: '', component: ShopCartComponent}];

@NgModule({
  imports: [
    OutlinedLabelModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ShopCartRoutingModule {
}
