import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import {RouterModule} from '@angular/router';
import {HomeComponent} from '../home/home.component';
import {MatDesModule} from '../../features/mat-des/mat-des.module';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';



@NgModule({
  declarations: [ContactComponent],
  imports: [
    RouterModule.forChild([{path: '', component: ContactComponent}]),
    CommonModule,
    MatDesModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class ContactModule { }
