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

import { StatesService } from './../../../services/states.service';
import { State, Option } from './../../models/index';
import { BaseFormComponent } from './../../formly/base-form/base-form.component';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

@Component({
  selector: 'organization-form',
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.scss']
})
export class OrganizationFormComponent implements AfterViewInit, OnInit {
  @ViewChild(BaseFormComponent) baseForm: BaseFormComponent;
  @Input('model')
  set aModel(model: any) {
    const hasId: boolean = this.modelHasId(model);
    this.submitText = this.getSubmitText(hasId);
    this.model = _.cloneDeep(model);
  }
  @Output('ngSubmit') submitter: EventEmitter<any> = new EventEmitter<any>();
  @Output('ngCancel')
  cancelSubmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  protected model: any = {};
  protected submitText: string;
  protected fields: FormlyFieldConfig[];
  protected disable: boolean = true;
  protected states: Option[];

  constructor(private statesService: StatesService) {
    this.submitText = this.getSubmitText(false);
    this.disable = true;
  }

  modelHasId(model: any): boolean {
    return _.has(model, 'id') && Number(model.id) > 0;
  }

  getSubmitText(hasId) {
    return hasId ? 'Update' : 'Create';
  }

  ngOnInit() {
    this.states = this.statesService.getStatesProvinces();

    this.fields = [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-sm-12',
            type: 'input',
            key: 'name',
            templateOptions: {
              label: 'Organization Name',
              required: true,
              minLength: 5,
              pattern: /\w+[a-zA-Z0-9]/
            }
          }
        ]
      },
      {
        template: '<hr class="space-hr" /><div><strong>Address</strong></div>'
      },
      {
        key: 'addresses',
        type: 'repeat',
        fieldArray: {
          fieldGroupClassName: 'row',
          templateOptions: {
            btnText: 'Add Address'
          },
          fieldGroup: [
            {
              className: 'col-sm-3',
              type: 'input',
              key: 'line1',
              templateOptions: {
                label: 'Street 1',
                required: true
              }
            },
            {
              type: 'input',
              key: 'line2',
              className: 'col-sm-3',
              templateOptions: {
                type: 'text',
                label: 'Street 2'
              }
            },
            {
              type: 'input',
              key: 'city',
              className: 'col-sm-2',
              templateOptions: {
                label: 'City',
                required: true
              }
            },
            {
              type: 'select',
              key: 'state',
              className: 'col-sm-2',
              templateOptions: {
                label: 'State',
                options: _.cloneDeep(this.states),
                required: true
              }
            },
            {
              type: 'input',
              key: 'zip',
              className: 'col-sm-2',
              templateOptions: {
                label: 'Zip',
                required: true,
                pattern: /\d{5}(\-\d{4})?/
              }
            },
            {
              type: 'input',
              key: 'country',
              className: 'col-sm-12',
              templateOptions: {
                label: 'Country'
              }
            }
          ]
        }
      },
      {
        template: '<hr class="space-hr" /><div><strong>Phones</strong></div>'
      },
      {
        key: 'phones',
        type: 'repeat',
        fieldArray: {
          fieldGroupClassName: 'row',
          templateOptions: {
            btnText: 'Add Phone'
          },
          fieldGroup: [
            {
              className: 'col-sm-6',
              type: 'select',
              key: 'description',
              templateOptions: {
                label: 'Type',
                required: true,
                options: [
                  { label: 'Mobile', value: 'mobile' },
                  { label: 'Home', value: 'home' },
                  { label: 'Work', value: 'work' },
                  { label: 'Other', value: 'other' }
                ]
              }
            },
            {
              type: 'input',
              key: 'number',
              className: 'col-sm-6',
              templateOptions: {
                type: 'text',
                label: 'Number',
                pattern: /(\d{3}-\d{3}-\d{4}|\d{10,})/,
                required: true
              }
            }
          ]
        }
      }
    ];
  }

  ngAfterViewInit() {
    this.disable = false;
  }

  onSubmit(model: any): void {
    this.submitter.emit(model);
  }

  onCancel(event: MouseEvent): void {
    this.cancelSubmitter.emit(true);
  }
}
