import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CoffeeComponent} from './coffee.component';
import {MatButtonModule} from '@angular/material/button';
import {ProductsService} from '../../../services/ado/products/products.service';
import {MatRippleModule} from '@angular/material/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';


const routes: Routes = [
  {path: '', component: CoffeeComponent}
];

@NgModule({
  declarations: [CoffeeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    // ImgSrcsetModule,
    MatButtonModule,
    MatRippleModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
  ],
  providers: [
    ProductsService,
  ]
})
export class CoffeeModule {
}
