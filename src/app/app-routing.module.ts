import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';


const routes: Routes = [
  {path: 'shop', data: {animation: 'shopPage'}, loadChildren: () => import('./pages/shop/shop.module').then(m => m.ShopModule)},
  {path: 'brew-guides', loadChildren: () => import('./pages/brew-guides/brew-guides.module').then(m => m.BrewGuidesModule)},
  {path: 'visit', data: {animation: 'visitPage'}, loadChildren: () => import('./pages/visit/visit.module').then(m => m.VisitModule)},
  {path: 'contact', loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule)},
  {path: 'about', loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule)},
  {path: 'product-item2/:id', loadChildren: () => import('./pages/product-item2/product-item2.module').then(m => m.ProductItem2Module)},
  {path: 'preorder', loadChildren: () => import('./pages/pre-order/pre-order.module').then(m => m.PreOrderModule)},
  {
    path: 'shop-cart',
    loadChildren: () => import('./pages/shop-cart/shop-cart.module')
      .then(m => m.ShopCartModule)
  },
  {
    path: 'info',
    loadChildren: () => import('./pages/information/information.module')
      .then(m => m.InformationModule)
  },
  {
    path: 'shipping-information',
    loadChildren: () => import('./pages/shipping-information/shipping-information.module')
      .then(m => m.ShippingInformationModule)
  },
  {
    path: 'shop-cart2',
    loadChildren: () => import('./pages/shop-cart2/shop-cart2.module')
      .then(m => m.ShopCart2Module)
  },
  {
    path: 'order-statement',
    loadChildren: () => import('./pages/order-statment/order-statment.module')
      .then(m => m.OrderStatmentModule)
  },
  { path: 'click-collect',
    loadChildren: () => import('./pages/click-collect/click-collect.module')
      .then(m => m.ClickCollectModule) },
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  // imports: [RouterModule.forRoot(routes, {useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
