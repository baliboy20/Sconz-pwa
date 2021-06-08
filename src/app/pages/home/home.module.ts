import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {RouterModule} from '@angular/router';
import {MatDesModule} from '../../features/mat-des/mat-des.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {AppModule} from '../../app.module';
import {ProductItem2AlertComponent} from '../product-item2/product-item2.component';



@NgModule({
  declarations: [
    ProductItem2AlertComponent,
    HomeComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: HomeComponent}]),
        MatDesModule,
        AppModule,
    ]
})
export class HomeModule { }
