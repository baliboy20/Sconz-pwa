import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZzprogressbuttonRoutingModule } from './zzprogressbutton-routing.module';
import { ZzprogressbuttonComponent } from './zzprogressbutton.component';
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatRippleModule} from "@angular/material/core";


@NgModule({
  declarations: [
    ZzprogressbuttonComponent
  ],
  imports: [
    CommonModule,
    ZzprogressbuttonRoutingModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatRippleModule,
  ]
})
export class ZzprogressbuttonModule { }
