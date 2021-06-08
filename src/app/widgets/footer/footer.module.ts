import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import {RouterModule} from '@angular/router';



@NgModule({
  exports: [FooterComponent],
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class FooterModule { }
