import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {RepoService} from '../../services/repo.service';
import {map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {CoffeeOrder, CoffeeOrderFacade} from '../../model/CoffeeOrderFacade';
import {GGCartService} from "../../services/ggcart.service";
import {OrderStatmentService} from "../../service/order-statment.service";
import {fromPromise} from "rxjs/internal-compatibility";


@Component({
  selector: 'app-order-statment',
  templateUrl: './order-statment.component.html',
  styleUrls: ['./order-statment.component.scss']
})
export class OrderStatmentComponent implements OnInit {
  public item: CoffeeOrder | undefined;

  constructor(
    private repo: RepoService,
    private cartService: GGCartService,
    private orderService: OrderStatmentService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((a: Params) => {
          return a.orderId;
        }),
        mergeMap((id, idx) => {
          console.log('arg::', id);

          if (id === 'succeeded') {
            //  this.cartService.clearout();
            return of(this.orderService.getOrder());
          } else if (id === 'cancelled') {
            return of('cancelled');
          } else if ( typeof id === 'string') {
            return fromPromise(this.repo.getOrder(id as string))
          }
          else {
            return of(this.orderService.getOrder());
            // return of();
          }

        }),
      )
      .subscribe(a => {
          console.log('%csuccess', 'color: green', a);
        },
        err => console.log('the activated routes Errors: ', err));

  }

  itemDate(): string {
    try {
      // @ts-ignore
      return new Date(this.item.updatedAt).toDateString();
    } catch (e) {
      return 'invalid date';
    }
  }
}

// http://localhost:4200/#/order-statement/Eo8ay2KrWM
