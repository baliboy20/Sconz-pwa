import { Component, OnInit } from '@angular/core';
import {InformationPages} from '../../../assets/constants/constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  infolinks = [
    ['Work with us', '/info', 'work-with-us'],
    ['Wholesale enquiries', '/info', 'wholesale'],
    ['Our suppliers', '/info', 'our-suppliers'],
    ['Coffee delivery in London', '/info', 'coffee-delivery-london'],
    ['Shipping policy', '/info', 'shipping-policy'],
    ['Privacy policy', '/info', 'privacy-policy'],
    ['Refund policy', '/info', 'refund-policy']
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
