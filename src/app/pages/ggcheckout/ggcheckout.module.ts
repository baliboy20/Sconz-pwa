import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GGCheckoutRoutingModule } from './ggcheckout-routing.module';
import { GGCheckoutComponent } from './ggcheckout.component';
import {RouterModule} from "@angular/router";
import {BasketServiceUtils} from "../../services/basket.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {OutlinedLabelModule} from "../../widgets/outlined-label/outlined-label.module";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {MatRippleModule} from "@angular/material/core";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


@NgModule({
  declarations: [
    GGCheckoutComponent
  ],
  exports: [
    GGCheckoutComponent,
  ],
  imports: [
    CommonModule,
    GGCheckoutRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    OutlinedLabelModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatRippleModule,
    MatProgressSpinnerModule,

  ],
  providers: [BasketServiceUtils]
})
export class GGCheckoutModule { }
