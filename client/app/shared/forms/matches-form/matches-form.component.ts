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
  selector: 'matches-form',
  templateUrl: './matches-form.component.html',
  styleUrls: ['./matches-form.component.scss']
})
export class MatchesFormComponent implements AfterViewInit, OnInit {
  @ViewChild(BaseFormComponent) baseForm: BaseFormComponent;
  @Input('model')
  set aModel(model: any) {
    this.submitText = this.getSubmitText(this.modelHasId(model));
    this.model = _.cloneDeep(model);
  }
  @Input() states: Option[];
  @Output('ngSubmit') submitter: EventEmitter<any> = new EventEmitter<any>();
  @Output('ngCancel')
  cancelSubmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  public model: any = {};
  public submitText: string;
  public fields: FormlyFieldConfig[];
  public disable: boolean = true;

  constructor() {
    this.submitText = this.getSubmitText(false);
    this.disable = true;
  }

  protected modelHasId(model: any): boolean {
    return _.has(model, 'id') && Number(model.id) > 0;
  }

  protected getSubmitText(hasId) {
    return hasId ? 'Update' : 'Create';
  }

  ngOnInit() {
    this.fields = [
      {
        template: '<div><strong>Match Information</strong></div>'
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-sm-12',
            type: 'input',
            key: 'match_name',
            templateOptions: {
              label: 'Match Name',
              required: false,
              minLength: 5,
              pattern: /\w+[a-zA-Z0-9]/
            }
          },

          {
            className: 'col-sm-6',
            type: 'input',
            key: 'referees',
            templateOptions: {
              label: 'Number of Referees',
              type: 'number',
              min: 1,
              max: 10,
              required: true
            }
          },
          {
            type: 'select',
            key: 'age',
            className: 'col-sm-6',
            templateOptions: {
              label: 'Age Group',
              options: [
                {
                  label: 'Kids',
                  value: 'kids'
                },
                {
                  label: 'Teens',
                  value: 'teens'
                },
                {
                  label: 'Adults',
                  value: 'adults'
                }
              ],
              required: true
            }
          },
          {
            className: 'col-sm-6',
            type: 'input',
            key: 'date',
            templateOptions: {
              label: 'Match Date',
              type: 'date',
              required: true
            }
          },
          {
            className: 'col-sm-6',
            type: 'input',
            key: 'time',
            templateOptions: {
              label: 'Time',
              type: 'time',
              required: true
            }
          }
        ]
      },
      {
        template: '<div><strong>Address</strong></div>'
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-sm-12',
            type: 'input',
            key: 'venue_name',
            templateOptions: {
              label: 'Venue Name',
              required: true,
              minLength: 5,
              pattern: /\w+[a-zA-Z0-9]/
            }
          },
          {
            className: 'col-sm-12',
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
            className: 'col-sm-12',
            templateOptions: {
              type: 'text',
              label: 'Street 2'
            }
          },
          {
            type: 'input',
            key: 'city',
            className: 'col-sm-4',
            templateOptions: {
              label: 'City',
              required: true
            }
          },
          {
            type: 'select',
            key: 'state',
            className: 'col-sm-4',
            templateOptions: {
              label: 'State',
              options: _.cloneDeep(this.states),
              required: true
            }
          },
          {
            type: 'input',
            key: 'zip',
            className: 'col-sm-4',
            templateOptions: {
              label: 'Zip',
              required: true,
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

  onCancel(event: MouseEvent): void {
    this.cancelSubmitter.emit(true);
  }
}
