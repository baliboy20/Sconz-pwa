import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { VouchersComponent } from './vouchers.component';


const routes: Routes = [
  { path: '', component: VouchersComponent }
];

@NgModule({
  declarations: [VouchersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class VouchersModule { }
