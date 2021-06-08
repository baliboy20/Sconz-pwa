import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ShippingInformationRoutingModule} from './shipping-information-routing.module';
import {ShippingInformationComponent} from './shipping-information.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import {PortalModule} from '@angular/cdk/portal';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [ShippingInformationComponent],
  imports: [
    CommonModule,
    ShippingInformationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDividerModule,
    MatBadgeModule,
    MatButtonModule,
    PortalModule,
    MatIconModule,
  ]
})
export class ShippingInformationModule {
}
