import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {ClickCollectComponent, CustomImageDirective} from './click-collect.component';
import {MatCardModule} from '@angular/material/card';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {BottomSheetService} from './parts/bottom-sheet.service';
import { ClickCollectBottomSheetComponent } from './parts/click-collect-bottom-sheet/click-collect-bottom-sheet.component';
import {MatListModule, MatSelectionList} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {NumericIncrementerModule} from '../../widgets/numeric-incrementer/numeric-incrementer.module';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


const routes: Routes = [
  {path: '', component: ClickCollectComponent},
  {path: ':id', component: ClickCollectComponent},
];

@NgModule({
  declarations: [
    ClickCollectComponent,
    CustomImageDirective,
    ClickCollectBottomSheetComponent],
  exports: [
    CustomImageDirective,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatListModule,
    MatToolbarModule,
    MatRadioModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    NumericIncrementerModule,
    MatProgressSpinnerModule,
  ],
  providers: [BottomSheetService]
})
export class ClickCollectModule {
}
