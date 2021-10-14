import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RibbonpageRoutingModule } from './ribbonpage-routing.module';
import { RibbonpageComponent } from './ribbonpage.component';
import {ClickCollectModule} from "../../pages/click-collect/click-collect.module";


@NgModule({
  declarations: [
    RibbonpageComponent
  ],
    imports: [
        CommonModule,
        RibbonpageRoutingModule,
        ClickCollectModule
    ]
})
export class RibbonpageModule { }
