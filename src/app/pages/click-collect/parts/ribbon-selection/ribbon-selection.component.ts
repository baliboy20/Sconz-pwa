import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'wdg-ribbon-selection',
  templateUrl: './ribbon-selection.component.html',
  styleUrls: ['./ribbon-selection.component.scss']
})
export class RibbonSelectionComponent implements OnInit {

  @Input()
  set items(items: any) {
    if (!items) {
      return;
    }
    this._items = items.map((a: any) => a[0]);
  };

  _items: string[] = (' ,').repeat(10).split(',');

  @ViewChild('scrollable', {read: ElementRef}) ele!: ElementRef

  @Output()
  scrollToId: EventEmitter<any> = new EventEmitter;
  leftvis = false;
  rightvis = false;

  constructor() {
  }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this._setNavButtonVisibility();
  }

  onClicked(event: string) {
    this.scrollToId.emit(event);
  }

  doScroll(direction: 'l' | 'r'): void {
    let el: HTMLDivElement;
    el = this.ele.nativeElement as HTMLDivElement;
    console.log(el.offsetWidth, el.scrollLeft);
    if (direction === "l") {
      el.scrollTo({left: (el.scrollLeft - el.offsetWidth / 2), behavior: "smooth"});
    } else {
      el.scrollTo({left: (el.scrollLeft + el.offsetWidth / 2), behavior: "smooth"});
    }

  }

  onScroll() {
    this._setNavButtonVisibility();
  }

  private _setNavButtonVisibility() {
    let el: HTMLDivElement;
    el = this.ele.nativeElement as HTMLDivElement;
    console.log(el.offsetWidth, el.scrollWidth, el.scrollLeft);
    this.rightvis = el.scrollLeft + el.offsetWidth + 10 > el.scrollWidth;
    this.leftvis = !(el.scrollLeft > 0);


  }


  onMouseOverHorizontalSlidebar(): void {

    this._setNavButtonVisibility();
  }
}
