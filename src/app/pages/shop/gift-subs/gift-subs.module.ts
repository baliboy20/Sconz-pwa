import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { GiftSubsComponent } from './gift-subs.component';


const routes: Routes = [
  { path: '', component: GiftSubsComponent }
];

@NgModule({
  declarations: [GiftSubsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class GiftSubsModule { }
