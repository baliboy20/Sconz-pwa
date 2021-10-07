import {
  AfterViewInit,
  Component,
  ElementRef, EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnInit, Output,
  Renderer2,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {HttpClient} from '@angular/common/http';
import {BasketTotal} from '../../model/types';
import {tap} from 'rxjs/operators';
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'basket-icon-button',
  templateUrl: './basket-icon.component.html',
  styleUrls: ['./basket-icon.component.scss']
})
export class BasketIconComponent implements OnInit {

  constructor(
    public cartService: CartService,
    public tmp: ElementRef,
    public rnd: Renderer2) {
  }
  @Input() fillColor =  '#fffcf3';
  @Input('cartSideNav') sideNav: any | undefined;
  ngOnInit(): void {

  }

  toggle(): void{
    this.sideNav?.toggle();
  }

}
