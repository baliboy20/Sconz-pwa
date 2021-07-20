import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {map, mergeMap} from 'rxjs/operators';
import {GGCartService} from "../../services/ggcart.service";
import {OrderStatmentService} from "../../service/order-statment.service";
import {fromPromise} from "rxjs/internal-compatibility";
import {OrderSent} from "../../stripe-payments-lib/services/stripe-pay.service";
import {GGStockProductOrder} from "../../model/shared/GGOrderFacade.model";
import {RepoGGService} from "../../stripe-payments-lib/services/repo-g-g.service";


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
    private orderService: OrderStatmentService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((a: Params) => a.orderId),
        mergeMap((id: string) => {
          const aid = id === 'succeeded' || id == 'cancelled' ? this.orderService.oId : id;
              return fromPromise(this.repo.getCartOfOrder(aid));

        }))
      .subscribe(a => {
          console.log('%cOrder Statement object', 'color: green', a);
         this.item = a;
        },
        err => console.log('Error accessing order: ', err.message));


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
