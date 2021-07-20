import {Inject, Injectable} from '@angular/core';
import {MatBottomSheet, MatBottomSheetConfig} from '@angular/material/bottom-sheet';
import {ClickCollectBottomSheetComponent} from './click-collect-bottom-sheet/click-collect-bottom-sheet.component';
import {GGStockProductFacade} from "../../../model/shared/GGStockProductFacade.model";

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
