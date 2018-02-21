import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'base-form',
  templateUrl: './base-form.component.html',
  styleUrls: ['./base-form.component.scss']
})
export class BaseFormComponent implements OnInit {
  @Input('model') set Model(model:any) {
    this.model = model;
  };
  /*@Output('model') getModel():any {
    return this.model;
  };*/
  @Input('fields') set Fields(fields:FormlyFieldConfig[]) {
    this.fields = fields;
    console.log('got fields:', fields);
  };/*
  @Output('fields') getFields():FormlyFieldConfig[] {
    return this.fields;
  };*/
  @Input('options') set Options(options:FormlyFormOptions) {
    this.options = options;
  };/*
  @Output('options') getOptions():FormlyFormOptions {
    return this.options;
  };*/

  protected form = new FormGroup({});
  protected model: any = {};
  protected options: FormlyFormOptions = {};
  protected fields: FormlyFieldConfig[];


  constructor() {}

  ngOnInit() {
    //this.fields = [];
  }

  onSubmit(model:any) {}
}
