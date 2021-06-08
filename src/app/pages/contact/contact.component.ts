import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  formGroup = new FormGroup({
    name: new FormControl('name'),
    email: new FormControl('email'),
    message: new FormControl('message'),
  });
  constructor() {
this.formGroup.valueChanges
  .subscribe(a => console.log('dda', a));
  }

  ngOnInit(): void {
  }

}
