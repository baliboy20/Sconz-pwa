import {Component, Input, OnInit} from '@angular/core';

export type StyleConfigurationOutlinedInput = { [prop: string]: string | number };

@Component({
  selector: 'app-outlined-label',
  template: `
    <div [ngStyle]="styleConfigWrapper"
         class="outlined-label-wrapper">
      <label [ngStyle]="styleConfigLabel">
        {{labelText}}
      </label>
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./outlined-label.component.scss']
})
export class OutlinedLabelComponent implements OnInit {
  @Input() labelText: string | undefined;
  @Input() styleConfigLabel: StyleConfigurationOutlinedInput =
    {backgroundColor: 'var(--background-color1)', color: 'var(--grey-30)'};
  @Input() styleConfigWrapper: StyleConfigurationOutlinedInput
    =  {backgroundColor: 'var(--background-color1)', color: 'red', padding: '0'};

  constructor() {
  }

  ngOnInit(): void {
  }

}
