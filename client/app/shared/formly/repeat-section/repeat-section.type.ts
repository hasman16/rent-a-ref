import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FieldType, FormlyFormBuilder } from '@ngx-formly/core';
import * as _ from 'lodash';

@Component({
  selector: 'formly-repeat-section',
  templateUrl: './repeat-section.type.html',
  styleUrls: ['./repeat-section.type.scss']
})
export class RepeatTypeComponent extends FieldType implements OnInit {
  public formControl: FormArray;
  protected fields = [];

  constructor(private builder: FormlyFormBuilder) {
    super();
  }

  get newFields() {
    return _.cloneDeep(this.field.fieldArray.fieldGroup);
  }

  ngOnInit() {
    if (this.model) {
      setTimeout(() => this.model.map(() => this.add()));
    }
  }

  add() {
    const form: FormGroup = new FormGroup({}),
      i: number = this.fields.length;

    if (!this.model[i]) {
      this.model.push({});
    }

    this.fields.push(this.newFields);
    this.builder.buildForm(form, this.fields[i], this.model[i], this.options);
    this.formControl.push(form);
  }

  remove(i) {
    this.formControl.removeAt(i);
    this.model.splice(i, 1);
    this.fields.splice(i, 1);
  }
}