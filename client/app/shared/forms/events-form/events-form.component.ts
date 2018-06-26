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
  selector: 'events-form',
  templateUrl: './events-form.component.html',
  styleUrls: ['./events-form.component.scss']
})
export class EventsFormComponent implements AfterViewInit, OnInit {
  @ViewChild(BaseFormComponent) baseForm: BaseFormComponent;
  @Input('model')
  set aModel(model: any) {
    this.submitText = this.getSubmitText(this.modelHasId(model));
    this.model = _.cloneDeep(model);
  }
  @Input() states: Option[];
  @Input() sports: Option[];
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
        template: '<div><strong>Event Information</strong></div>'
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-sm-12',
            type: 'input',
            key: 'event_name',
            templateOptions: {
              label: 'Event Name',
              required: true,
              minLength: 5,
              pattern: /\w+[a-zA-Z0-9]/
            }
          }
        ]
      },
      {
        template: '<hr class="space-hr" />'
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-sm-6',
            type: 'input',
            key: 'event_date',
            templateOptions: {
              label: 'Event Date',
              type: 'date',
              required: true
            }
          },
          {
            className: 'col-sm-6',
            type: 'select',
            key: 'sport_id',
            templateOptions: {
              label: 'Type of Sport',
              required: true,
              options: _.cloneDeep(this.sports)
            }
          }
        ]
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-sm-12',
            type: 'radio',
            key: 'event_type',
            templateOptions: {
              label: 'What type of event',
              required: true,
              options: [
                { value: 'League', key: 'league' },
                { value: 'Tournament', key: 'tournament' },
                { value: 'One off event', key: 'oneoff' }
              ]
            }
          }
        ]
      },
      {
        template:
          '<hr class="space-hr" /><div><strong>Age Groups</strong></div>'
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-sm-4',
            type: 'checkbox',
            key: 'kids',
            templateOptions: {
              label: 'Kids 13 and Under',
              required: true
            }
          },
          {
            className: 'col-sm-4',
            type: 'checkbox',
            key: 'teens',
            templateOptions: {
              label: 'High School',
              required: true
            }
          },
          {
            className: 'col-sm-4',
            type: 'checkbox',
            key: 'adults',
            templateOptions: {
              label: 'Over 18',
              required: true
            }
          }
        ]
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-sm-4',
            type: 'input',
            key: 'kids_games',
            templateOptions: {
              label: 'Number games for Kids 13 and Under.',
              type: 'number',
              min: 1,
              max: 1000
            },
            expressionProperties: {
              'templateOptions.required': 'model.kids',
              'templateOptions.disabled': '!model.kids'
            }
          },
          {
            className: 'col-sm-4',
            type: 'input',
            key: 'teen_games',
            templateOptions: {
              label: 'Number of games for High Schooler.',
              type: 'number',
              min: 1,
              max: 1000,
              required: true
            },
            expressionProperties: {
              'templateOptions.required': 'model.teens',
              'templateOptions.disabled': '!model.teens'
            }
          },
          {
            className: 'col-sm-4',
            type: 'input',
            key: 'adult_games',
            templateOptions: {
              label: 'Number of games for Over 18s.',
              type: 'number',
              min: 1,
              max: 1000,
              required: true
            },
            expressionProperties: {
              'templateOptions.required': 'model.adults',
              'templateOptions.disabled': '!model.adults'
            }
          }
        ]
      },
      {
        template: '<hr class="space-hr" /><div><strong>Address</strong></div>'
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
