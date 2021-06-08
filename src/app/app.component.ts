import {Component, TemplateRef, ViewChild} from '@angular/core';
import {environment} from '../environments/environment';
import {Router, RouterOutlet} from '@angular/router';
import {fadeInAnimation, slideInAnimation} from './features/animations/animations';
import {HttpClient} from '@angular/common/http';
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeInAnimation]
})
export class AppComponent {
  title = 'RosyLookLike1';
  version = environment.build_version;
  width = window.screen.width;
  @ViewChild('CartDrawer', {read: MatSidenav}) public tref: MatSidenav | undefined;
  @ViewChild('NavDrawer', {read: MatSidenav}) public navDrawer: MatSidenav | undefined;
  constructor(
    private router: Router
  ) {
  }

  prepareRoute(outlet: RouterOutlet): any {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  doToCart(): void {
    this.router.navigate(['shop-cart']);
  }
}
