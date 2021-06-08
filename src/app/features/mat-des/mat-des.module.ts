import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbar, MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenav, MatSidenavContainer, MatSidenavContent, MatSidenavModule} from '@angular/material/sidenav';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatSidenavHarness} from '@angular/material/sidenav/testing';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatList, MatListModule} from '@angular/material/list';
import {MatExpansionModule, MatExpansionPanel} from '@angular/material/expansion';
import {MatRippleModule} from '@angular/material/core';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
   // MatRippleModule,
  ],
  exports: [
    MatToolbar,
    MatButton,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    MatIcon,
    MatList,
    MatExpansionPanel,
   // MatRippleModule,
  ]
})
export class MatDesModule { }
