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
import {CustomerOrderFacade} from "../../model/shared/CustomerOrderFacade";
import {OrderItems} from "../../model/shared/Order.infc.";


@Component({
  selector: 'app-order-statment',
  templateUrl: './order-statment.component.html',
  styleUrls: ['./order-statment.component.scss']
})
export class OrderStatmentComponent implements OnInit {
  public item: CustomerOrderFacade | undefined;
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
              return fromPromise(this.repo.getCartOfOrder(id));

        }),
      )
      .subscribe(a => {
        MyLogger.log('customre order')(a);
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

  // tryit(basket: any) {
  //   if (!basket) {
  //     return '';
  //   }
  //   Object.keys(basket).forEach(console.log);
  //   return basket.basket;
  // }
  asBasketItmQty(itm: any): number {

   return itm.qty ?? itm._qty;
  }
}

// http://localhost:4200/#/order-statement/Eo8ay2KrWM
