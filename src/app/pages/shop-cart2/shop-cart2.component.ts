import {AfterViewInit, Component} from '@angular/core';
import {Router} from '@angular/router';
import {BasketService} from '../../services/basket.service';
import {tap} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {PageBase} from '../page-base/page-base';
import {CartItemFacade} from '../../model/CartItemFacade.model';
import {GGCartService} from '../../services/ggcart.service';
import {GGStockProductOrder, GGStockProductOrderImpl} from '../../model/shared/GGOrderFacade.model';
import {GGBasket} from '../../model/GGCart.model';
import {MatBadge} from "@angular/material/badge";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-shop-cart2',
  templateUrl: './shop-cart2.component.html',
  styleUrls: ['./shop-cart2.component.scss']
})
export class ShopCart2Component extends PageBase implements AfterViewInit{
  basket: GGBasket | undefined;
  private subs: Subscription | undefined;

  constructor(
    private router: Router,
    public service: GGCartService) {
    super();
  }

  ngAfterViewInit(): void {
    super.subscription = this.service.basketChanged
      .pipe(tap(a => console.log('basket service', a)))
      .subscribe(res => this.basket = res);
    // this.basket.cart[0].nameChoice()
  }

}
