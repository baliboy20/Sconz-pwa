import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NumericIncrementerComponent} from './numeric-incrementer.component';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    NumericIncrementerComponent
  ],
  exports: [
    NumericIncrementerComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
  ]
})
export class NumericIncrementerModule {
}
