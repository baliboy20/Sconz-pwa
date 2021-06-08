import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BasketIconComponent} from './basket-icon.component';
import {MatRippleModule} from '@angular/material/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [BasketIconComponent],
  exports: [BasketIconComponent],
  imports: [
    CommonModule,
    MatRippleModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
  ]
})
export class BasketIconModule {
}
