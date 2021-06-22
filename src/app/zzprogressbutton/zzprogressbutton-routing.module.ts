import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZzprogressbuttonComponent } from './zzprogressbutton.component';

const routes: Routes = [{ path: '', component: ZzprogressbuttonComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZzprogressbuttonRoutingModule { }
