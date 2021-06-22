import {Component, Inject, OnInit} from '@angular/core';
import {GGStockProductFacade} from '../../../../model/GGStockProducts.model';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {FormBuilder, Validators} from '@angular/forms';
import {map} from 'rxjs/operators';
import {GGCartService} from '../../../../services/ggcart.service';
import {GGStockProductOrderImpl} from '../../../../model/GGOrderFacade.model';
import {of} from 'rxjs';

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
  total = '£0.00';

  constructor(
    public fb: FormBuilder,
    public ref: MatBottomSheetRef<ClickCollectBottomSheetComponent>,
    public cart: GGCartService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public prod: any
  ) {
    this.data = prod;
  }

  ngOnInit(): void {
    // @ts-ignore
    this.formGroup.get('choice').setValue(this.data.choices[0]);
    this.formGroup
      .valueChanges
      .pipe(
        map(a => {
          if (!a.choice) {
            return `£0.00`;
          }
          let total = a.choice.price * a.qty;
          // @ts-inore
          const choices = (a.options).map((b: { price: any; }) => b.price).reduce((sum: any, itm: any) => (sum += itm), 0);
          total = Math.round((total + choices) * 100) / 100;
          return `£${total}`;
        })
      )
      .subscribe(total => this.total = total,);

  }


  dimissAndSave(): void {
    // console.log('devoer');
    of(this.formGroup.getRawValue())
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
        // tap(b => console.log('xxxxx', b)),
      )
      .subscribe(a => {
          // console.log('%cForm changes', 'color: green', a);
          this.cart.add(a);
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
}


