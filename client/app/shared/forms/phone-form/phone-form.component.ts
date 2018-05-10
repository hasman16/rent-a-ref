import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { Phone } from '../../models/phone';
import { ProfileService } from '../../../services/index';

import { AbstractFormComponent } from '../abstract-form';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

export interface IPhoneService {
  createPhone(phone: Phone): Observable<any>;
  updatePhone(phone: Phone): Observable<any>;
}

@Component({
  selector: 'phone-form',
  templateUrl: './phone-form.component.html',
  styleUrls: ['./phone-form.component.scss']
})
export class PhoneFormComponent extends AbstractFormComponent
  implements OnInit {
  public phoneForm: FormGroup;
  protected telephone: Phone;

  @Output() savePhone = new EventEmitter();
  @Input()
  set phone(aPhone: Phone) {
    this.telephone = aPhone;
    this.fillForm();
  }
  @Input() phoneService: IPhoneService;

  public numberInvalid: boolean = false;
  public descriptionInvalid: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    super();
    this.phoneForm = this.formBuilder.group({
      number: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(20)]
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(10),
          Validators.pattern(this.alphaNumericRegex)
        ]
      ]
    });

    this.setUpValidators(this.phoneForm, ['number', 'description']);
  }

  fillForm() {
    this.phoneForm.setValue({
      number: this.telephone.number || '',
      description: this.telephone.description || ''
    });
  }

  onPhoneSubmit() {
    if (this.phoneService) {
      const newPhone: Phone = <Phone>this.phoneForm.value;

      let observable: Observable<any>;
      newPhone.id = this.telephone.id;

      this.savePhone.emit({ action: 'show_overlay' });

      if (_.isNil(newPhone.id) || parseInt(newPhone.id) === 0) {
        observable = this.phoneService.createPhone(newPhone);
      } else {
        observable = this.phoneService.updatePhone(newPhone);
      }

      observable.subscribe(
        () => {
          this.savePhone.emit({ action: 'save_success' });
        },
        (err: HttpErrorResponse) => {
          this.savePhone.emit({ action: 'save_failure' });
        }
      );
    }
  }

  ngOnInit() {
    this.fillForm();
  }
}
