import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
private url = environment.ParseServerURL;
  constructor(private http: HttpClient) { }
  public getCoffees(isMocked = true): Observable<any>{
    console.log('are we being mocked?');
    const header: HttpHeaders = new HttpHeaders(
      {isMocked: isMocked ? 'true' : 'false'});
    return this.http.get(this.url, {headers: header});
  }
}
