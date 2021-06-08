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
  selector: 'v69-basket-icon',
  templateUrl: './basket-icon.component.html',
  styleUrls: ['./basket-icon.component.scss']
})
export class BasketIconComponent implements OnInit, AfterViewInit {

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
    console.log('toggle', this.sideNav);
    this.sideNav?.toggle();
  }

  ngAfterViewInit(): void {
// this.rnd.setStyle(this.tmp.nativeElement, '--basket-icon-color', 'white');
// document.documentElement.style.setProperty('--basket-icon-color', 'orange');

  }

}
