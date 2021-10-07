import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'wdg-ribbon-selection',
  templateUrl: './ribbon-selection.component.html',
  styleUrls: ['./ribbon-selection.component.scss']
})
export class RibbonSelectionComponent implements OnInit {

  @Input()
  set items(items: any) { if (!items) { return; } this._items = items.map((a: any) => a[0]);   };
 _items: string[] = (' ,').repeat(10).split(',');
private s = 'sdf';

 @Output() scrollToId: EventEmitter<any> = new EventEmitter;

  constructor() {
  }

  ngOnInit(): void {
  }

  onClicked(event: string) {
    this.scrollToId.emit(event);
  }

}
