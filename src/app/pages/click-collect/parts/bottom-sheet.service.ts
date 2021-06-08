import {Inject, Injectable} from '@angular/core';
import {MatBottomSheet, MatBottomSheetConfig} from '@angular/material/bottom-sheet';
import {GGStockProductFacade} from '../../../model/GGStockProducts.model';
import {ClickCollectBottomSheetComponent} from './click-collect-bottom-sheet/click-collect-bottom-sheet.component';

@Injectable({
  providedIn: 'root'
})
export class BottomSheetService {

  constructor(@Inject(MatBottomSheet) private sheet: MatBottomSheet) {
  }

  openSheet(prod: GGStockProductFacade): void {
    const cfg: MatBottomSheetConfig = {data: prod};
    const ref = this.sheet.open(ClickCollectBottomSheetComponent, cfg);
    ref.afterDismissed().subscribe(a => {
    });
  }
}
