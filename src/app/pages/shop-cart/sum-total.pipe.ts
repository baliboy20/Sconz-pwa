import {Pipe, PipeTransform} from '@angular/core';
import {CartType} from '../../model/types';

@Pipe({
  name: 'sumTotal'
})
export class SumTotalPipe implements PipeTransform {

  transform(value: CartType[], ...args: unknown[]): unknown {
    const val = value.reduce((agg: any, itm: CartType, idx: number) => {
      const cum: { sumTotal: 0 } = agg;
      cum.sumTotal += itm.qty * itm.price;
      return cum;
    }, {sumTotal: 0});
    console.log('outpur', val);
    return (val.sumTotal).toPrecision(4);
  }

}
