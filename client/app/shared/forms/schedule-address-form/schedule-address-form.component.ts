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
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

@Component({
  selector: 'schedule-address-form',
  templateUrl: './schedule-address-form.component.html',
  styleUrls: ['./schedule-address-form.component.scss']
})
export class ScheduleAddressFormComponent implements AfterViewInit, OnInit {
  @ViewChild(BaseFormComponent) baseForm: BaseFormComponent;
  @Input('model')
  set aModel(model: any) {
    this.model = _.cloneDeep(model);
  }
  @Output('ngSubmit') submitter: EventEmitter<any> = new EventEmitter<any>();
  @Output('ngCancel')
  cancelSubmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  public model: any = {};
  public submitText: string;
  public fields: FormlyFieldConfig[];
  public disable: boolean = true;
  public states: Option[];

  constructor(private statesService: StatesService) {
    this.disable = true;
  }

  ngOnInit() {
    this.states = this.statesService.getStatesProvinces();

    this.fields = [
      {
        template: '<div><strong>Origin</strong></div>'
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-sm-12',
            type: 'input',
            key: 'line1',
            templateOptions: {
              label: 'Street 1',
              required: false
            }
          },
          {
            type: 'input',
            key: 'line2',
            className: 'col-sm-12',
            templateOptions: {
              type: 'text',
              label: 'Street 2'
            }
          },
          {
            type: 'input',
            key: 'city',
            className: 'col-sm-12',
            templateOptions: {
              label: 'City',
              required: true
            }
          },
          {
            type: 'select',
            key: 'state',
            className: 'col-sm-12',
            templateOptions: {
              label: 'State',
              options: _.cloneDeep(this.states),
              required: true
            }
          },
          {
            type: 'input',
            key: 'zip',
            className: 'col-sm-12',
            templateOptions: {
              label: 'Zip',
              required: false,
              pattern: /\d{5}(\-\d{4})?/
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
    this.submitter.emit(model);
  }
}
