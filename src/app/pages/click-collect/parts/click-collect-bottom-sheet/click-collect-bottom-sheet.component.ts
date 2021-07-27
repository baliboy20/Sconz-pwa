import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {FormBuilder, Validators} from '@angular/forms';
import {map, tap} from 'rxjs/operators';
import {GGCartService} from '../../../../services/ggcart.service';
import {GGStockProductOrderImpl} from '../../../../model/shared/GGOrderFacade.model';
import {Observable, of} from 'rxjs';
import {GGStockProductFacade} from "../../../../model/shared/GGStockProductFacade.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-click-collect-bottom-sheet',
  templateUrl: './click-collect-bottom-sheet.component.html',
  styleUrls: ['./click-collect-bottom-sheet.component.scss']
})
export class ClickCollectBottomSheetComponent implements OnInit {

  data: GGStockProductFacade;
  formGroup = this.fb.group({
    choice: [null, Validators.required],
    qty: 1,
    total: [0],
    options: [[]],
    instructions: [''],
  });
  total = 0;

  constructor(
    public fb: FormBuilder,
    public ref: MatBottomSheetRef<ClickCollectBottomSheetComponent>,
    public cart: GGCartService,
    private router: Router,
    @Inject(MAT_BOTTOM_SHEET_DATA) public prod: any
  ) {
    this.data = prod;
  }

  ngOnInit(): void {
    // @ts-ignore

    this.formGroup
      .valueChanges
      .pipe(
        map(a => {
          if (!a.choice) {
            return 0;
          }
          let total = a.choice.price * a.qty;
          // @ts-inore
          const choices = (a.options).map((b: { price: any; }) => b.price).reduce((sum: any, itm: any) => (sum += itm), 0);
          total = Math.round((total + choices) * 100) / 100;
          return total;
        })
      )
      .subscribe(total => this.total = total,);

    this.formGroup.get('choice')?.setValue(this.data.choices[0]);
  }


  private _saveToCart() : Observable<any> {
    return of(this.formGroup.getRawValue())
      .pipe(
        map(a => {
          a.name = this.data.name;
          a.thumbImg = this.data.thumbImg;
          a.productId = this.data.productId;
          return a;
        }),
        map(a => {
          return GGStockProductOrderImpl.create(a);
        }),
      tap(a =>{
        this.cart.add(a);
      }),
      );
  }
  dimissAndSave(): void {
    this._saveToCart()
      .subscribe(a => {
          // console.log('%cForm changes', 'color: green', a);
          this.ref.dismiss();
        },
        error => console.log('error', error.message));
  }

  dismiss(): void {
    this.ref.dismiss();
  }

  getSrcset(_url: string): string {
    // console.log('url', _url);
    return `${_url} 200w`;
  }

  payNow(): void {
    this._saveToCart()
      .subscribe(a => {
          // console.log('%cForm changes', 'color: green', a);
          this.ref.dismiss();
          this.router.navigate(['gg-checkout']);
        },
        error => console.log('error', error.message));

  }
}


