import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-numeric-incrementer',
  templateUrl: './numeric-incrementer.component.html',
  styleUrls: ['./numeric-incrementer.component.scss'],
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: NumericIncrementerComponent, multi: true}],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumericIncrementerComponent implements OnInit, ControlValueAccessor {
  value = 1;
  changefn: (value?: number |undefined) => void = () => null ;
  @Input() isInline = false;
  @Output() removeItmClicked: EventEmitter<any> = new EventEmitter();
  @Input() showRemoveButton: boolean = false;
  @Input() styleClass: 'Std' | 'Lrg' = 'Std';

  constructor(private changeRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit(): void {
    // this.showRemoveButton = this.showRemoveButton ?? true;
    // console.log('show remove button', !!this.showRemoveButton, this.showRemoveButton);
  }

  add(): void {
    this.value++;
    this.changefn(this.value);
  }

  subtract(): void {
    if (this.value <= 0) {
      return;
    }
    this.value--;
    this.changefn(this.value);
  }

  registerOnChange(fn: any): void {
    this.changefn = fn;
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
    // console.log('numerice indicator writevalue', obj);
    this.value = obj;
    this.changeRef.markForCheck();
  }

  onRemoveBnClicked(): void {
    // console.log('remove this item');
    this.removeItmClicked.emit('remove this item');
  }

  onInputConrolChanged(newVal: number): void {
    newVal > 0 ? this.changefn(this.value) : 0;
  }
}
