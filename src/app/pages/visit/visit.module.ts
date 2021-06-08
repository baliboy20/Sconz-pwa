import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitComponent } from './visit.component';
import {RouterModule} from '@angular/router';
import {HomeComponent} from '../home/home.component';
import {MapVisitModule} from '../../widgets/map-visit/map-visit.module';
import {FooterModule} from '../../widgets/footer/footer.module';



@NgModule({
  declarations: [VisitComponent],
    imports: [
        RouterModule.forChild([{path: '', component: VisitComponent}]),
        CommonModule,
        MapVisitModule,
        FooterModule
    ]
})
export class VisitModule { }
