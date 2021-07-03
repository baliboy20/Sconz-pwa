import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-zzprogressbutton',
  templateUrl: './zzprogressbutton.component.html',
  styleUrls: ['./zzprogressbutton.component.scss']
})
export class ZzprogressbuttonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  showSpinner = true;

}
