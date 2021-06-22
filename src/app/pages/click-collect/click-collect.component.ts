import {
  AfterViewInit,
  Component,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2,
  ViewChildren
} from '@angular/core';
// import {RepoGGService} from '../../services/repo-g-g.service';
import {GGStockProductFacade} from '../../model/GGStockProducts.model';
import {Observable} from 'rxjs';
import {BottomSheetService} from './parts/bottom-sheet.service';
import {map, mergeMap, tap} from 'rxjs/operators';
import {RepoGGService} from '../../stripe-payments-lib/services/repo-g-g.service';
import {ActivatedRoute} from '@angular/router';

//
//
// Directive: manages the size of the Images
//
//
//

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[appZZImg]'
})
export class ZzImageDirective {
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[appCustomImg]'
})
export class CustomImageDirective implements AfterViewInit {
  @Input() imgSize: 'large' | 'medium' | 'thumb' = 'thumb';
  @Input() appCustomImg: string | undefined;

  constructor(
    private rnd: Renderer2,
    private ref: ElementRef) {
  }

  ngAfterViewInit(): void {

    const img: HTMLImageElement = this.ref.nativeElement;
    switch (this.imgSize) {
      case 'thumb': {
        const [srcset, sizez] = this.thumbAttrs();
        this.rnd.setAttribute(img, 'srcset', srcset);
        // this.rnd.setAttribute(img, 'sizes', sizez);
        break;
      }
      case 'medium': {
        const [srcset, sizez] = this.medAttrs();
        // console.log('size', sizez);
        this.rnd.setAttribute(img, 'srcset', srcset);
        // this.rnd.setAttribute(img, 'sizes', sizez);
        break;
      }
      case 'large': {
        const [srcset, sizez] = this.largeAttrs();
        this.rnd.setAttribute(img, 'srcset', srcset);
        // this.rnd.setAttribute(img, 'sizes', sizez);
        break;
      }
      default : {
        // console.log('%c XXXXX', 'color: red', this.imgSize);
      }
    }

  }

  private thumbAttrs(): [string, string] {

    const srcset = `${this.appCustomImg} 738w`;
    const sizes = `(max-width: 330px) 150px,
                   (min-width: 319px) and (max-width: 550px) 300px,
                   (min-width: 551px) and (max-width: 800px) 175px,
                   (min-width: 801px) 100px`;
    return [srcset, sizes];
  }

  private medAttrs(): [string, string] {
    const srcset = `${this.appCustomImg} 738w`;
    const sizes = `(max-width: 330px) 200px,
                   (min-width: 331px) and (max-width: 550px) 200px,
                   (min-width: 551px) and (max-width: 800px) 400px,
                   (min-width: 801px) 550px`;
    return [srcset, sizes];
  }

  private largeAttrs(): [string, string] {
    const srcset = `${this.appCustomImg} 738w`;
    const sizes = `(max-width: 330px) 75px,
                   (min-width: 331px) and (max-width: 550px) 100px,
                   (min-width: 551px) and (max-width: 800px) 200px,
                   (min-width: 801px) 250px`;
    return [srcset, sizes];
  }
}

/**
 *
 */

@Component({
  selector: 'app-click-collect',
  templateUrl: './click-collect.component.html',
  styleUrls: ['./click-collect.component.scss']
})
export class ClickCollectComponent implements OnInit, OnDestroy {
  @ViewChildren(CustomImageDirective, {read: ElementRef}) imgs: QueryList<any> | undefined;

  constructor(
    public acr: ActivatedRoute,
    public bss: BottomSheetService,
    private rnd: Renderer2,
    public repo: RepoGGService) {
  }

  prods$: Observable<[string, GGStockProductFacade[]]> | undefined;

  ngOnInit(): void {
    this.prods$ =
      this.repo.listProductItems()
        .pipe(
          map(a => this.repo._collateByCategory(a)),
        );
    // bring up item page if there is a product id int the of the params
    this.acr.params
      .pipe(
        map(a => a.id ?? new Error('wasteful')),
        mergeMap(id => this.repo.findOne(id)),
        map(obs => obs ?? new Error('Product Id not found')),
        tap((fac: GGStockProductFacade) => this.onChooseProduct(fac))
      )
        .subscribe(res => console.log('acr', res), error => console.log('Err', error.message ?? error.toString()));

  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit(): void {
    // @ts-ignore
    this.imgs.notifyOnChanges();
    // @ts-ignore
    this.imgs.changes.subscribe(a => {
      // @ts-ignore
      this.imgs.forEach((q, i) => {
        const a1: HTMLDivElement = q.nativeElement;
        const i1: HTMLImageElement = a1.getElementsByTagName('img')[0] as HTMLImageElement;
        // @ts-ignore
        const pw = a1.parentElement.clientWidth;
        this.rnd.setStyle(i1, 'width', `${pw / 3}px`);
        this.rnd.setStyle(a1, 'width', `${pw / 3}px`);
      });
    });

  }

  ngOnDestroy(): void {

  }

  onChooseProduct(prod: GGStockProductFacade): void {
    this.bss.openSheet(prod);
  }

  scrollToId(prod: string): void {
    document.getElementById(prod)?.scrollIntoView({behavior: 'smooth', block: 'start'});
  }

  computeImgSize(container: string, ele: HTMLImageElement): any { //
  }
}



