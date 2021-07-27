import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {map, mergeMap, tap} from 'rxjs/operators';
import {GGCartService} from "../../services/ggcart.service";
import {ActiveOrderService} from "../../service/active-order.service";
import {fromPromise} from "rxjs/internal-compatibility";
import {OrderSent} from "../../stripe-payments-lib/services/stripe-pay.service";
import {GGStockProductOrder} from "../../model/shared/GGOrderFacade.model";
import {RepoGGService} from "../../stripe-payments-lib/services/repo-g-g.service";
import {MyLogger} from "../../service/logging/myLogging";


@Component({
  selector: 'app-order-statment',
  templateUrl: './order-statment.component.html',
  styleUrls: ['./order-statment.component.scss']
})
export class OrderStatmentComponent implements OnInit {
  public item: OrderSent | undefined;
  constructor(
    private repo: RepoGGService,
    private cartService: GGCartService,
    private orderService: ActiveOrderService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((a: Params) => a.orderId),
        tap(a => MyLogger.log('a')(a)),
        mergeMap((id: string) => {
          // // if called by callback by Stripe payment use last order with pi as the key.
          // let aid= '';
          // if ( id === 'succeeded' || id == 'cancelled') {
          //   const id =  this.orderService.lastOrder?.payment?.payment_intent;
          // } else {
          //
          // }
          MyLogger.log('id')(id);
              return fromPromise(this.repo.getCartOfOrder(id));

        }),
        tap(a => MyLogger.log('pi')( a.payment)))
      .subscribe(a => {
          MyLogger.large()('Order statment');
         this.item = a;
        },
        err => console.log('Error accessing order: ', err.message)
      );


  }

  itemDate(): string {
    try {
      // @ts-ignore
      return new Date(this.item.updatedAt).toDateString();
    } catch (e) {
      return 'invalid date';
    }
  }

  joinOptions(itm: GGStockProductOrder[]) {
    return itm.length === 0 ? 'n/a' : itm.map(a => a.name).join(', ') ;
  }

  tryit(basket: any) {
    if (!basket) {
      return '';
    }
    Object.keys(basket).forEach(console.log);
    // for ( let a of Object.keys(basket)){
    //   console.log('keys', a);
    // }
    // console.log('treyit', basket.);
    return basket.basket;
  }
}

// http://localhost:4200/#/order-statement/Eo8ay2KrWM
