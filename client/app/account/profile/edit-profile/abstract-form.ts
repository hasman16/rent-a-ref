import { EventEmitter, Output } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

export abstract class AbstractFormComponent {
  @Output() cancelForm = new EventEmitter();

  alphaNumericRegex: '[a-zA-Z0-9_-\\s]*';
  zipRegex: '\\d{5}|\\d{5}((\\s|-)\\d{4})';

  currentForm: FormGroup;

  constructor() {}

  setUpValidators(aForm:FormGroup, controls:string[]) {
    this.currentForm = aForm;
    controls.forEach((controlName) => {
      let control = this.currentForm.get(controlName);
      this.validator(control, controlName + 'Invalid');
    });
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

  public abstract fillForm();

  onCancel() {
    this.cancelForm.emit(false);
  }
}
