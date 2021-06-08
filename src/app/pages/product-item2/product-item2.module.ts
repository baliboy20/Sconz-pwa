import {NgModule} from '@angular/core';
import {CommonModule, HashLocationStrategy, LocationStrategy, PathLocationStrategy} from '@angular/common';

import {ProductItem2RoutingModule} from './product-item2-routing.module';
import {ProductItem2Component} from './product-item2.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import {ProductItemRoutingModule} from '../product-item/product-item-routing.module';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatOptionModule, MatRippleModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {NumericIncrementerModule} from '../../widgets/numeric-incrementer/numeric-incrementer.module';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [ProductItem2Component],
  imports: [

    CommonModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatRadioModule,
    FormsModule,
    MatOptionModule,
    MatSelectModule,
    NumericIncrementerModule,
    MatButtonModule,
    MatDividerModule,
    ProductItem2RoutingModule,
    MatIconModule,
    MatRippleModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  providers: [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
})
export class ProductItem2Module {
}
