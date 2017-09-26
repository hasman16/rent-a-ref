import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, Validators, FormBuilder } from '@angular/forms';

import { BioType } from '../../../../shared/models/bioType';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';

import { MyDatePickerModule, IMyDpOptions, IMyDateModel } from 'mydatepicker';

@Component({
  selector: 'bio-form',
  templateUrl: './bio-form.component.html',
  styleUrls: ['./bio-form.component.scss']
})
export class BioFormComponent implements OnInit {
  @Input() set person(aPerson: BioType) {
    this.aPerson = aPerson;
    console.log("a person:", aPerson);
    this.fillForm();
  };
  @Input() states: any;
  @Output() saveBio = new EventEmitter();

  bioForm: FormGroup;
  aPerson: BioType;
  mode: boolean = false;
  alphaNumericRegex: '[a-zA-Z0-9_-\\s]*';
  showDivbio = true;
  firstnameInvalid = false;
  lastnameInvalid = false;
  // Initialized to specific date (09.10.2018).
  // public model: Object = { date: { year: 2018, month: 10, day: 9 } };
  public dateModel;

  constructor(private formBuilder: FormBuilder) {
    this.bioForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(2),
      Validators.maxLength(30), Validators.pattern(this.alphaNumericRegex)]],
      middlenames: ['', [Validators.maxLength(30), Validators.pattern(this.alphaNumericRegex)]],
      lastname: ['', [Validators.maxLength(30), Validators.pattern(this.alphaNumericRegex)]],
      gender: ['', [<any>Validators.nullValidator]],
      dob: ['', [<any>Validators.nullValidator]]
    });

    let firstname = this.bioForm.get('firstname');
    let lastname = this.bioForm.get('lastname');

    this.validator(firstname, 'firstnameInvalid');
    this.validator(lastname, 'lastnameInvalid');
  }

  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
  };

  onDateChanged(event: IMyDateModel) {
    console.log('onDateChanged(): ', event.date,
      ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
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
    if (this.aPerson) {
      this.bioForm.setValue({
        firstname: this.aPerson.firstname,
        middlenames: this.aPerson.middlenames,
        lastname: this.aPerson.lastname,
        gender: this.aPerson.gender,
        dob: this.aPerson.dob
      });
    }
  }

  ngOnInit() {
    this.fillForm();
  }

  onAddressSubmit() {
    this.saveBio.emit(this.bioForm.value);
  }
}
