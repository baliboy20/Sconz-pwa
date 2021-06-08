import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import {RouterModule} from '@angular/router';
import {HomeComponent} from '../home/home.component';
import {FooterModule} from '../../widgets/footer/footer.module';
import {HttpClientModule} from '@angular/common/http';



@NgModule({
  declarations: [AboutComponent],
    imports: [
        RouterModule.forChild([{path: '', component: AboutComponent}]),
        CommonModule,
      HttpClientModule,
        FooterModule
    ]
})
export class AboutModule { }
