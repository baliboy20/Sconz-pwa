import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {DropDownCartListComponent} from './drop-down-cart-list.component';
import {ShopCart2Module} from '../../pages/shop-cart2/shop-cart2.module';



@NgModule({
  declarations: [DropDownCartListComponent],
  exports: [DropDownCartListComponent],
    imports: [
        CommonModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        ShopCart2Module,
    ]
})
export class DropDownCartListModule { }
