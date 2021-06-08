import {Component, OnInit, Sanitizer} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {ProductsService} from '../../../services/ado/products/products.service';
import {Router} from '@angular/router';
import {RepoService} from '../../../services/repo.service';
import {StockProductFacade} from '../../../model/StockProducts';
import {DomSanitizer} from '@angular/platform-browser';
import {tap} from 'rxjs/operators';
import {PageBase} from '../../page-base/page-base';

@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.scss']
})
export class CoffeeComponent extends PageBase implements OnInit {
  showBorder = false;
  stockProducts: StockProductFacade[] = [];
  // @ts-ignore
  showSpinner: false | undefined;

  constructor(
    private sn: DomSanitizer,
    private productService: ProductsService,
    private router: Router,
    private repo: RepoService,
  ) {
    super();
  }

  ngOnInit(): void {

    const subs = this.repo.listStockProductsFacade()
      .pipe(tap((a: StockProductFacade[]) => {
        super.showSpinner = false;
        const ar = a[0].getNonPricedOptions('grindType');
      }))
      .subscribe(
        res => this.stockProducts = res,
        err => console.log('error', err.message),
      );
    super.subscription = subs;
  }

  doNavigate(id?: any): void {
    console.log('do navigate', id);
    this.router.navigate([`product-item2/${id}`]);
    // this.router.navigate(['product-item2', id], {queryParams: {id}});
  }

  onTapped(event: any): void {
    console.log('on tapped', event);
  }


  getUrl(url: any): string {
    return `url('${url}')`;
  }
}
