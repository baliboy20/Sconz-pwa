import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'wdg-ribbon-selection',
  templateUrl: './ribbon-selection.component.html',
  styleUrls: ['./ribbon-selection.component.scss']
})
export class RibbonSelectionComponent implements OnInit {
   _items: string[] = (' ,').repeat(10).split(',');
@Input()  set items( items: any) {
  console.log('ribbon', items);
  if(!items) {
    return;
  }
 this._items = items.map((a:any )=> a[0]);
};
@Output() scrollToId: EventEmitter<any> = new EventEmitter;
  constructor() { }

  ngOnInit(): void {
  }
  onClicked(event: string) {
    this.scrollToId.emit(event);
  }

}
