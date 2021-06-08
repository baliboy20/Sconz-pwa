import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RepoService} from '../../services/repo.service';
import {delay, map, mergeMap, tap} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';
import {of} from 'rxjs';
import {CoffeeOrder, CoffeeOrderFacade} from '../../model/CoffeeOrderFacade';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-order-statment',
  templateUrl: './order-statment.component.html',
  styleUrls: ['./order-statment.component.scss']
})
export class OrderStatmentComponent implements OnInit {
  public item: CoffeeOrder | undefined;

  constructor(
    private repo: RepoService,
    private cartService: CartService,
    private route: ActivatedRoute) {
    this.cartService.clear();
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        map(a => a.orderId),
        tap(a => console.log('asdfsfsf', a)),
        mergeMap(id => (this.repo.getOrder(id)))
      )
      .subscribe(a => this.item = new CoffeeOrderFacade(a),
      err => console.log('the activqted routes Errors: ', err));

}

  itemDate(): string {
    try {
      // @ts-ignore
      return new Date(this.item.updatedAt).toDateString();
    }catch (e) {
      return 'invalid date';
    }
  }
}

// http://localhost:4200/#/order-statement/Eo8ay2KrWM
