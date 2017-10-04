import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, Validators, FormBuilder } from '@angular/forms';

import { AddressType } from '../../../../shared/models/addressType';
import { StatesService } from '../../../../services/states.service';
import { AbstractFormComponent } from '../abstract-form';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'zone-form',
  templateUrl: './zone-form.component.html',
  styleUrls: ['./zone-form.component.scss']
})
export class ZoneFormComponent extends AbstractFormComponent implements OnInit {
  zoneForm: FormGroup;
  aZone: AddressType;
  anAddress: AddressType;
  countryName = 'usa';
  states: any;

  radiusInvalid = false;
  cityInvalid = false;
  zipInvalid = false;
  @Output() saveZone = new EventEmitter();
  @Input() set zone(aZone: AddressType) {
    this.aZone = aZone;
    this.fillForm();
  }
  @Input() country(aCountry: string = 'usa') {
    this.countryName = aCountry;
    this.fillForm();
  }


  constructor(private formBuilder: FormBuilder,  private statesService: StatesService) {
    super();
    this.zoneForm = this.formBuilder.group({
      city: ['', [Validators.required, Validators.minLength(2),
      Validators.maxLength(30), Validators.pattern(this.alphaNumericRegex)]],
      state: ['', [Validators.required, Validators.minLength(2),
      Validators.maxLength(20), Validators.pattern(this.alphaNumericRegex)]],
      zip: ['', [Validators.required, Validators.minLength(2),
      Validators.maxLength(12), Validators.pattern(this.zipRegex)]],
      radius: ['5', [Validators.required,
      Validators.minLength(1),
      Validators.maxLength(3), Validators.pattern('\\d{1,3}')]]
    });

    this.setUpValidators(this.zoneForm, ['city', 'zip', 'radius']);
  }

  fillForm() {
    this.states = this.statesService.getStatesProvinces(this.countryName);
    this.zoneForm.setValue({
      city: this.aZone.city,
      state: this.aZone.state,
      zip: this.aZone.zip,
      radius: this.aZone.radius || 5
    });
  }

  ngOnInit() {
    this.fillForm();
  }

  onZoneSubmit() {
    this.saveZone.emit(this.zoneForm.value);
  }
}
