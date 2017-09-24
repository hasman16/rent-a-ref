import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, Validators, FormBuilder } from '@angular/forms';

import { AddressType } from '../../../../shared/models/addressType';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'zone-form',
  templateUrl: './zone-form.component.html',
  styleUrls: ['./zone-form.component.scss']
})
export class ZoneFormComponent implements OnInit {
  @Input() set zone(aZone: AddressType) {
    this.aZone = aZone;
    this.fillForm();
  };
  @Input() states: any;
  @Output() saveZone = new EventEmitter();

  zoneForm: FormGroup;
  aZone: AddressType;
  alphaNumericRegex: '[a-zA-Z0-9_-\\s]*';
  zipRegex: '\\d{5}|\\d{5}((\\s|-)\\d{4})';
  showDivZone = true;
  radiusInvalid = false;
  cityInvalid = false;
  zipInvalid = false;

  constructor(private formBuilder: FormBuilder) {
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

    let city = this.zoneForm.get('city');
    let zip = this.zoneForm.get('zip');
    let radius = this.zoneForm.get('radius');

    this.validator(radius, 'radiusInvalid');
    this.validator(city, 'cityInvalid');
    this.validator(zip, 'zipInvalid');
  }

  validator(item: AbstractControl, name: string) {
    item
      .valueChanges
      .debounceTime(1000)
      .subscribe((value) => {
        let result = false;
        if (item.touched && item.invalid) {
          result = true;
        }
        this[name] = result;
      });
  }

  fillForm() {
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
