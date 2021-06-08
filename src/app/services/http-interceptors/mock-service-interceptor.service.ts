import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {CoffeeProductItems} from '../../../assets/mocked-data/products';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorForMockService implements  HttpInterceptor{
itema = CoffeeProductItems;

    constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     console.log('interceptors here', req.url);
     if (req.url === 'https://test22.b4a.app/create-checkout-session') {
      const cln = req.clone({url: 'http://localhost:3000/create-checkout-session'});
      return next.handle(req);
      // return next.handle(cln);
      // return of(new HttpResponse({status: 200, body: this.itema}));
    } else {
      return of(new HttpResponse({status: 200, body: this.itema}));
    }


  }
}
