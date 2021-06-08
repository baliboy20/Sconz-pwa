import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapVisitComponent } from './map-visit.component';



@NgModule({
  declarations: [
    MapVisitComponent
  ],
  exports: [
    MapVisitComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MapVisitModule { }
