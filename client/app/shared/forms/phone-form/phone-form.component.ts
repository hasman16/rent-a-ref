import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { PhoneType } from '../../models/phoneType';
import { ProfileService } from '../../../services/profile.service';

import { AbstractFormComponent } from '../abstract-form';
import { Observable } from 'rxjs/Observable';

export interface IPhoneService {
  createPhone(phone: PhoneType): Observable<any>,
  updatePhone(phone: PhoneType): Observable<any>
}

@Component({
  selector: 'phone-form',
  templateUrl: './phone-form.component.html',
  styleUrls: ['./phone-form.component.scss']
})
export class PhoneFormComponent extends AbstractFormComponent implements OnInit {
  phoneForm: FormGroup;
  telephone: PhoneType;

  @Output() savePhone = new EventEmitter();
  @Input() set phone(aPhone: PhoneType) {
    this.telephone = aPhone;
    this.fillForm();
  }
  @Input() phoneService: IPhoneService;

  numberInvalid = false;
  descriptionInvalid = false;

  constructor(private formBuilder: FormBuilder) {
    super();
    this.phoneForm = this.formBuilder.group({
      number: ['', [Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20)]],
      description: ['', [Validators.required, Validators.minLength(2),
      Validators.maxLength(10), Validators.pattern(this.alphaNumericRegex)]]
    });

    this.setUpValidators(this.phoneForm, ['number', 'description']);
  }

  fillForm() {
    this.phoneForm.setValue({
      number: this.telephone.number,
      description: this.telephone.description
    });
  }

  onPhoneSubmit() {
    if (this.phoneService) {
      const newPhone: PhoneType = new PhoneType(this.phoneForm.value);
      let observable: Observable<any>;
      newPhone.id = this.telephone.id;

      this.savePhone.emit({ action: 'show_overlay' });

      if (Number(newPhone.id) === 0) {
        observable = this.phoneService.createPhone(newPhone);
      } else {
        observable = this.phoneService.updatePhone(newPhone);
      }

      observable.subscribe(() => {
        this.savePhone.emit({ action: 'save_success' });
      },
        (err: HttpErrorResponse) => {
          this.savePhone.emit({ action: 'save_failure' });
        });
    }
  }

  ngOnInit() {
    this.fillForm();
  }
}
