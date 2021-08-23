import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppSettingsService} from "../../service/app-settings.service";
import {MyLogger} from "../../service/logging/myLogging";
import {PageBase} from "../../framework/pages/page-base/page-base";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent extends PageBase implements OnInit {
settings: any;
formGroup: FormGroup;
  constructor(
    public appSettingsService: AppSettingsService,
    public fm: FormBuilder) {
    super();
    this.formGroup  =  this.fm.group({
      byPassStripePayment: ['checked', Validators.required],
    });
  }

  ngOnInit(): void {


  this.settings =
    this.appSettingsService.appSettings;
  }

  onStore() {}
}




