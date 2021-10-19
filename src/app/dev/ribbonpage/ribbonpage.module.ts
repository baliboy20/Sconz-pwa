import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RibbonpageRoutingModule } from './ribbonpage-routing.module';
import { RibbonpageComponent } from './ribbonpage.component';
import {ClickCollectModule} from "../../pages/click-collect/click-collect.module";
import {MatStepperModule} from "@angular/material/stepper";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [
    RibbonpageComponent
  ],
  imports: [
    CommonModule,
    RibbonpageRoutingModule,
    ClickCollectModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class RibbonpageModule { }
