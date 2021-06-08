import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopCartRoutingModule } from './shop-cart-routing.module';
import { ShopCartComponent } from './shop-cart.component';
import {MatDividerModule} from '@angular/material/divider';
import {NumericIncrementerModule} from '../../widgets/numeric-incrementer/numeric-incrementer.module';
import {FormsModule} from '@angular/forms';
import { SumTotalPipe } from './sum-total.pipe';
import {FooterModule} from '../../widgets/footer/footer.module';
import {OutlinedLabelModule} from '../../widgets/outlined-label/outlined-label.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [ShopCartComponent, SumTotalPipe],
    imports: [
        CommonModule,
        ShopCartRoutingModule,
        MatDividerModule,
        NumericIncrementerModule,
        FormsModule,
        FooterModule,
        OutlinedLabelModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule
    ]
})
export class ShopCartModule {

}
