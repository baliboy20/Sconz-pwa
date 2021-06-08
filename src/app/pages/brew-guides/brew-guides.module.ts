import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrewGuidesComponent } from './brew-guides.component';
import {RouterModule} from '@angular/router';
import {HomeComponent} from '../home/home.component';



@NgModule({
  declarations: [BrewGuidesComponent],
  imports: [
    RouterModule.forChild([{path: '', component: BrewGuidesComponent}]),
    CommonModule
  ]
})
export class BrewGuidesModule { }
