import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {CoffeeProductItems} from '../../../assets/mocked-data/products';
import {map, tap} from 'rxjs/operators';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorForMockService implements  HttpInterceptor{
itema = CoffeeProductItems;

    constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     console.log('interceptors here', req.url, environment.ParseServerURL);
     if (req.url === 'https://parseapi.back4app.com/create-checkout-session') {
       console.log('inside the intercepteor')
      const cln = req.clone({url: 'http://localhost:3000/create-checkout-session'});
      return next.handle(req);
      // return next.handle(cln);
      // return of(new HttpResponse({status: 200, body: this.itema}));
    } else {
      return of(new HttpResponse({status: 200, body: this.itema}));
    }


  }
}
