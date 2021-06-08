import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShopComponent} from './shop.component';
import {RouterModule} from '@angular/router';
import {HomeComponent} from '../home/home.component';
import {OutlinedLabelModule} from '../../widgets/outlined-label/outlined-label.module';


@NgModule({
  declarations: [ShopComponent],
  imports: [
    RouterModule.forChild([{path: '', component: ShopComponent}, {
      path: 'coffee',
      loadChildren: () => import('./coffee/coffee.module').then(m => m.CoffeeModule)
    },
      { path: 'vouchers', loadChildren: () => import('./vouchers/vouchers.module').then(m => m.VouchersModule) },
      { path: 'gift-subs', loadChildren: () => import('./gift-subs/gift-subs.module').then(m => m.GiftSubsModule) },
      { path: 'training', loadChildren: () => import('./training/training.module').then(m => m.TrainingModule) }]),
    CommonModule,
  ]
})
export class ShopModule {
}
