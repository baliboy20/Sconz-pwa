import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GGCheckoutComponent} from './ggcheckout.component';

const routes: Routes =  [{path: '', component: GGCheckoutComponent, }];

@NgModule({
  imports: [

    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GGCheckoutRoutingModule { }
