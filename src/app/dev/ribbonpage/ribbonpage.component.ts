import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ribbonpage',
  templateUrl: './ribbonpage.component.html',
  styleUrls: ['./ribbonpage.component.scss']
})
export class RibbonpageComponent implements OnInit {
  items =  ('honey beef coffee milk sugar orange basil tea scones chevil curry rice dill').split(' ')
    .map(a => [a, 'd']);


  constructor() { }

  ngOnInit(): void {
  }

}
