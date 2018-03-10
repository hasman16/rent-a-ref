import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  AbstractControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { Bio } from '../../models/bio';
import { AbstractFormComponent } from '../abstract-form';
import { UserService } from '../../../services/user.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';

import { MyDatePickerModule, IMyDpOptions, IMyDateModel } from 'mydatepicker';

@Component({
  selector: 'bio-form',
  templateUrl: './bio-form.component.html',
  styleUrls: ['./bio-form.component.scss']
})
export class BioFormComponent extends AbstractFormComponent implements OnInit {
  @Input()
  set person(aPerson: Bio) {
    this.aPerson = aPerson;
    this.fillForm();
  }
  @Output() saveBio = new EventEmitter();

  bioForm: FormGroup;
  aPerson: Bio = <Bio>{};
  mode = false;

  showDivbio = true;
  firstnameInvalid = false;
  lastnameInvalid = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    super();
    this.bioForm = this.formBuilder.group({
      firstname: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
          Validators.pattern(this.alphaNumericRegex)
        ]
      ],
      middlenames: [
        '',
        [Validators.maxLength(30), Validators.pattern(this.alphaNumericRegex)]
      ],
      lastname: [
        '',
        [Validators.maxLength(30), Validators.pattern(this.alphaNumericRegex)]
      ],
      gender: ['', [<any>Validators.nullValidator]],
      dob: [{ date: { year: 1998, month: 10, day: 9 } }, Validators.required] // this example is initialized to specific date
    });

    this.setUpValidators(this.bioForm, ['firstname', 'lastname']);
  }

  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd'
  };

  fillForm() {
    if (this.aPerson) {
      this.bioForm.setValue({
        firstname: this.aPerson.firstname,
        middlenames: this.aPerson.middlenames,
        lastname: this.aPerson.lastname,
        gender: this.aPerson.gender,
        dob: this.getDate(this.aPerson.dob)
      });
    }
  }

  getDate(timestamp): any {
    let date: Date = new Date(timestamp);
    return {
      date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      }
    };
  }

  setDate(timestamp): void {
    if (timestamp) {
      // Set today using the setValue function
      this.bioForm.patchValue({ dob: this.getDate(timestamp) });
    } else {
      this.resetDate();
    }
  }

  resetDate(): void {
    // Reset date picker to specific date (today)
    this.bioForm.reset({ dob: { jsdate: new Date() } });
  }

  clearDate(): void {
    // Clear the date using the patchValue function (use null or empty string)
    this.bioForm.patchValue({ dob: null });
  }

  ngOnInit() {
    this.fillForm();
  }

  getEpoc(dob) {
    let value: number = 0;

    if (dob.epoc) {
      value = Number(dob.epoc) * 1000;
    } else {
      const day = Number(dob.date.day);
      const month = Number(dob.date.month) - 1;
      const year = Number(dob.date.year);
      value = new Date(year, month, day).getTime();
    }

    return value;
  }

  onSubmit() {
    let bio = this.bioForm.value;
    bio.dob = this.getEpoc(bio.dob);

    this.userService.updatePerson(bio, this.aPerson.id).subscribe(
      () => {
        this.saveBio.emit({ action: 'save_success' });
      },
      (err: HttpErrorResponse) => {
        this.saveBio.emit({ action: 'save_failure' });
      }
    );
  }
}
