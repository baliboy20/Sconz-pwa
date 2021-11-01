import { Component, OnInit } from '@angular/core';
import {of} from "rxjs";
import {first, startWith} from "rxjs/operators";
import {start} from "repl";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }
someValue = {value: 'first value'};
secondvalue = {value: '2nd value'}
  ngOnInit(): void {
   of(this.secondvalue)
     .pipe( startWith(this.someValue)
     ).subscribe(console.log)
  }

}
