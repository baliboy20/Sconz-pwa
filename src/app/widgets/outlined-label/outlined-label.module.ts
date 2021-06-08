import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OutlinedLabelComponent} from './outlined-label.component';



@NgModule({
  declarations: [OutlinedLabelComponent],
  exports: [OutlinedLabelComponent],
  imports: [
    CommonModule
  ]
})
export class OutlinedLabelModule { }
