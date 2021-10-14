import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RibbonpageComponent } from './ribbonpage.component';

const routes: Routes = [{ path: '', component: RibbonpageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RibbonpageRoutingModule { }
