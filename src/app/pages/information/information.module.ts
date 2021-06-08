import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InformationComponent} from './information.component';
import {RouterModule} from '@angular/router';
import {FooterModule} from '../../widgets/footer/footer.module';
import {environment} from '../../../environments/environment';
import {InformationPages} from '../../../assets/constants/constants';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [InformationComponent],
  exports: [InformationComponent],
  imports: [
    CommonModule,
    FooterModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: 'work-with-us',
        component: InformationComponent,
        data: {htmlpage: InformationPages.workWithUs},
      },
      {
        path: 'wholesale',
        component: InformationComponent,
        data: {htmlpage: 'xxxx'},
      },
      {
        path: 'our-suppliers',
        component: InformationComponent,
        data: {htmlpage: InformationPages.ourSuppliers},
      },
      {
        path: 'coffee-delivery-london',
        component: InformationComponent,
        data: {htmlpage: InformationPages.coffeeDeliveryLondon},
      },
      {
        path: 'shipping-policy',
        component: InformationComponent,
        data: {htmlpage: InformationPages.shippingPolicy},
      },
      {
        path: 'privacy-policy',
        component: InformationComponent,
        data: {htmlpage: InformationPages.privacyPolicy},
      },
      {
        path: 'refund-policy',
        component: InformationComponent,
        data: {htmlpage: InformationPages.refundPolicy},
      },
      {
        path: '', redirectTo: 'privacy-policy', pathMatch: 'full',
      }

    ])
  ]
})
export class InformationModule {
}
