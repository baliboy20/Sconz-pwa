import {AfterViewInit, Directive, ElementRef, HostBinding, Input, OnInit, Renderer2} from '@angular/core';
import {BreakpointObserver, Breakpoints, MediaMatcher} from '@angular/cdk/layout';

@Directive({
  selector: '[appProductImages]'
})
export class ProductImagesDirective implements OnInit, AfterViewInit {

  @Input('appProductImages') set appImgSrcset(value: any) {
    console.log('directive', value);
  }

  @Input() set widths(value: never[]) {
    console.log('widths', value);
    this._widths = value;
  }

  private imgRef: HTMLImageElement | undefined;

  constructor(private bp: BreakpointObserver,
              private mm: MediaMatcher,
              private rnd: Renderer2,
              private el: ElementRef,
  ) {
  }

  _widths = [];
  @HostBinding() srcset: any;
  @Input() ext: string | undefined;
  @Input() filenamepath: string | undefined;
  @Input() imageWidth = 200;

  ngOnInit(): void {

    // this.bp.observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium])
    //   .subscribe((state: BreakpointState) => {
    //     const obj: any[] = Object.entries(state.breakpoints);
    //     console.log('bp \n\n', obj);
    //   });
    this.mm.matchMedia(Breakpoints.Medium).addEventListener('change', this.logit.bind(this));
    this.mm.matchMedia(Breakpoints.Small + ',' + Breakpoints.XSmall).addEventListener('change', this.logit2.bind(this));
  }

  ngAfterViewInit(): void {
    this.createImgComp1();
  }

  logit(e: MediaQueryListEvent): void {
    if (!e.matches) {
      return;
    }
    // console.log('medium', e);
    // this.imageWidth = 400;
    // this.createImgComp();
  }

  logit2(e: MediaQueryListEvent): void {
    if (!e.matches) {
      return;
    }
    console.log('small', e);
    // this.imageWidth = 100;
    // this.createImgComp();
  }

  srcSet(): string {
    const retval = '';
    let srcset = '';

    for (const width of this._widths) {
      srcset += `${this.filenamepath}${width}.${this.ext} ${width}w,`;
    }
    // console.log('srcset', srcset);
    return srcset;
  }

  createImgComp1(): void {
    const img: HTMLImageElement = this.el.nativeElement;
    // img.srcset = this.srcSet();
    this.rnd.setAttribute(img, 'srcset', this.srcSet());
    console.log('createImgComp1', img);
  }

  createImgComp(): void {
    // const src = './assets/test-sizes/whitecoffee/w_200.jpg';
    const img: HTMLImageElement = this.rnd.createElement('img');
    if (this.el && this.imgRef) {
      this.rnd.removeChild(this.el.nativeElement, this.imgRef);
    }
    this.imgRef = img;
    // img.width = this.imageWidth;
    // this.rnd.setAttribute(img, 'src', src);
    this.rnd.setAttribute(img, 'srcset', this.srcSet());
    this.rnd.setAttribute(img, 'imgAttr', '');
    this.rnd.appendChild(this.el.nativeElement, img);
  }

}
