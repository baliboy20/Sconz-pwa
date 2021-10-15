import {
  AfterViewInit,
  Component,
  Directive,
  ElementRef, HostListener,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2, ViewChild,
  ViewChildren, ViewContainerRef
} from '@angular/core';
// import {RepoGGService} from '../../services/repo-g-g.service';
import {Observable} from 'rxjs';
import {BottomSheetService} from './parts/bottom-sheet.service';
import {map, mergeMap, tap} from 'rxjs/operators';
import {RepoGGService} from '../../stripe-payments-lib/services/repo-g-g.service';
import {ActivatedRoute} from '@angular/router';
import {GGStockProductFacade} from "../../model/shared/GGStockProductFacade.model";
import {MyLogger} from "../../service/logging/myLogging";

/**
 MouseOverMouseOutDirective
 ============================================================================================================
 */
@Directive({
  selector: '[mouseOverOut]'
})
export class MouseOverMouseOutDirective {
  @HostListener('mouseover', ['$event.target']) onMouseOver(value: any) {
    MyLogger.log('mouseover')('its over');
    this.rnd.addClass(this.rf.nativeElement, 'CardHover');
  }

  @HostListener('mouseout', ['$event.target']) onMouseOut(value: any) {
    MyLogger.log('mouseout')('its out', this.rf.nativeElement);
    this.rnd.removeClass(this.rf.nativeElement, 'mat-elevation-13')
  }

  constructor(private rf: ElementRef, private rnd: Renderer2) {
    // MyLogger.log('ele ref')(rf);
  }
}

/**
 Directive: Manages the size of the Images.
 ============================================================================================================
 */
@Directive({

  selector: '[appZZImg]'
})
export class ZzImageDirective {
}

/**
 CustomImageDirective
 ============================================================================================================
 */
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
        break;
      }
      case 'medium': {
        const [srcset, sizez] = this.medAttrs();
        this.rnd.setAttribute(img, 'srcset', srcset);
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
 * The main component for the click collect page.
 * ClickCollectComponent
 ============================================================================================================
 */

@Component({
  selector: 'app-click-collect',
  templateUrl: './click-collect.component.html',
  styleUrls: ['./click-collect.component.scss']
})
export class ClickCollectComponent implements OnInit, OnDestroy {
  @ViewChildren(CustomImageDirective, {read: ElementRef}) imgs: QueryList<any> | undefined;
  @ViewChild('ccListWrapper',{read: ElementRef}) listWrapper!: ElementRef;
  public id = Math.round(Math.random() * 1000);

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
    //<-- bring up item page if there is a product id int the of the params
    this.acr.params
      .pipe(
        map(a => a.id ?? new Error('wasteful')),
        mergeMap(id => this.repo.findOne(id)),
        map(obs => obs ?? new Error('Product Id not found')),
        tap((fac: GGStockProductFacade) => this.onChooseProduct(fac))
      )
      .subscribe(
        res => console.log('acr', res),
        error => console.log('Err', error.message ?? error.toString())
      );
  }

  isLoading = false;

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

  /**
   * Scorll to anchor.
   * @param prod
   */
  scrollToId(prod: string): void {
    if (!this.listWrapper) {
     // return;
    }
   // (this.listWrapper.nativeElement as HTMLDivElement).scrollTo({top:0});
    document.getElementById(prod)?.scrollIntoView({behavior: 'smooth', block: 'start'});
  }

  computeImgSize(container: string, ele: HTMLImageElement): any { //
  }

  asProdFileFacade(prod: GGStockProductFacade): GGStockProductFacade {
    return prod;
  }

  cardOvers: Set<String> = new Set()

  pointerOver(e: MouseEvent, pid: any, setValue?: boolean): boolean {
    e.stopImmediatePropagation();
    MyLogger.log('productid')(pid, setValue)
    if (setValue) {
      if (!this.cardOvers.has(pid)) {
        this.cardOvers.add(pid);
      } else {
        if (this.cardOvers.has(pid)) {
          this.cardOvers.delete(pid);
        }
      }

    }
    return false;
  }

  isPointerOver(productId: any) {
    return this.cardOvers.has(productId);
  }

  wrapperScroll($event: Event, src: string) {
    console.log('wrapper scroll', src, $event);
  }
}





