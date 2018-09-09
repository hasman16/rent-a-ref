import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

import { StatesService } from './../../../services/index';
import { State, Option } from './../../models/index';
import { BaseFormComponent } from './../../formly/base-form/base-form.component';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'statuses-form',
  templateUrl: './statuses-form.component.html',
  styleUrls: ['./statuses-form.component.scss']
})
export class StatusesFormComponent implements AfterViewInit, OnInit {
  @ViewChild(BaseFormComponent) baseForm: BaseFormComponent;
  @Input('model')
  set aModel(model: any) {
    if (model) {
      this.model = _.cloneDeep(model);
    }
  }
  @Input() states: Option[];
  @Input() sports: Option[];
  @Output() ngSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() ngCancel: EventEmitter<boolean> = new EventEmitter<boolean>();

  public model: any = {};
  public submitText: string = 'Update Status';
  public fields: FormlyFieldConfig[];
  public disable: boolean = true;

  constructor() {
    this.disable = true;
  }

  ngOnInit() {
    this.fields = [
      {
        template: '<div><strong>User Status</strong></div>'
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-12',
            type: 'radio',
            key: 'can_organize',
            templateOptions: {
              label: 'Can Organize State',
              required: true,
              options: [
                { value: 'None', key: 'no' },
                { value: 'Pending', key: 'pending' },
                { value: 'Active', key: 'active' },
                { value: 'Suspended', key: 'suspended' }
              ]
            }
          }
        ]
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-12',
            type: 'radio',
            key: 'can_referee',
            templateOptions: {
              label: 'Can Referee State',
              required: true,
              options: [
                { value: 'None', key: 'no' },
                { value: 'Pending', key: 'pending' },
                { value: 'Active', key: 'active' },
                { value: 'Suspended', key: 'suspended' }
              ]
            }
          }
        ]
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-12',
            type: 'radio',
            key: 'status',
            templateOptions: {
              label: 'Account Status',
              required: true,
              options: [
                { value: 'None', key: 'no' },
                { value: 'Pending', key: 'pending' },
                { value: 'Active', key: 'active' },
                { value: 'Suspended', key: 'suspended' },
                { value: 'Locked', key: 'locked' },
                { value: 'Banned', key: 'banned' }
              ]
            }
          }
        ]
      }
    ];
  }

  ngAfterViewInit() {
    this.disable = false;
  }

  onSubmit(model: any): void {
    this.ngSubmit.emit(model);
  }

  onCancel(event: MouseEvent): void {
    this.ngCancel.emit(true);
  }
}
