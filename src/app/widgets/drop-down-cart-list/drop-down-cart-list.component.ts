import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-drop-down-cart-list',
  templateUrl: './drop-down-cart-list.component.html',
  styleUrls: ['./drop-down-cart-list.component.scss']
})
export class DropDownCartListComponent implements OnInit {
@Input() fillColor = '#fffcf3';
  constructor(public router: Router) { }
  @Output() BasketClickedEmitter: EventEmitter<any> = new EventEmitter<any>();
  ngOnInit(): void {
  }
}
