import {Component, ElementRef, TemplateRef, ViewChild} from '@angular/core';
import {environment} from '../environments/environment';
import {Router, RouterOutlet} from '@angular/router';
import {fadeInAnimation, slideInAnimation} from './features/animations/animations';
import {HttpClient} from '@angular/common/http';
import {MatSidenav} from "@angular/material/sidenav";
import {CdkPortalOutlet, ComponentPortal, Portal, PortalOutlet} from "@angular/cdk/portal";
import {ShopCartSideNavComponent} from "./shop-cart/shop-cart-side-nav/shop-cart-side-nav.component";

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
  componentPortal: ComponentPortal<ShopCartSideNavComponent> | undefined;
  @ViewChild('CartDrawer', {read: MatSidenav}) public tref: MatSidenav | undefined;
  @ViewChild('NavDrawer', {read: MatSidenav}) public navDrawer: MatSidenav | undefined;
  @ViewChild('portal', {read: CdkPortalOutlet}) public portal: PortalOutlet | undefined;
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

  openStatCart(event: any) {
    // console.log('opne', this.componentPortal?.isAttached, !!this.componentPortal, this.portal);
    // this.componentPortal = new ComponentPortal<ShopCartSideNavComponent>(ShopCartSideNavComponent);
    // if (!this.componentPortal) {
    //   // console.log('new ComponentPortal');
    //   this.componentPortal = new ComponentPortal(ShopCartSideNavComponent);
    //   // @ts-ignore
    this.componentPortal = this.componentPortal  ?? new ComponentPortal(ShopCartSideNavComponent);
    if (this.componentPortal?.isAttached == false) {
      // console.log('to be attached');
      if(this.portal){
        this.componentPortal.attach(this.portal);
      }


    }

  }

  closedStatCart() {
    // console.log('close');
    if(!this.componentPortal || !this.componentPortal.isAttached) {
      return;
    }
    this.componentPortal?.detach();
  }

  onAttached(event: any) {
    const sc: ShopCartSideNavComponent = event.instance;
    sc.sideNav = this.tref;

  }
}
