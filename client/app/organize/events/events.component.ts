import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  EmailValidator,
  ReactiveFormsModule
} from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

import { ToastComponent } from './../../shared/toast/toast.component';
import {
  AuthService,
  EventsService,
  StatesService,
  UserService
} from './../../services/index';
import {
  Address,
  BaseModel,
  Phone,
  Option,
  Organization,
  Profile,
  State,
  Sport
} from './../../shared/models/index';

import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'rar-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  @Input()
  set country(aCountry: string) {
    this.countryName = aCountry || 'usa';
  }
  protected countryName: string;
  protected states: Option[];
  protected form = new FormGroup({});
  protected model: any = {};
  protected currentModel: any = {};
  protected options: FormlyFormOptions = <FormlyFormOptions>{};
  protected fields: FormlyFieldConfig[];

  protected sports: Option[];
  protected games: any[] = [];
  protected isLoading: boolean = false;

  protected isEditing: boolean = false;

  constructor(
    protected toast: ToastComponent,
    protected route: ActivatedRoute,
    protected router: Router,
    protected statesService: StatesService,
    protected eventsService: EventsService
  ) {}

  public ngOnInit() {
    this.games = _.cloneDeep(this.route.snapshot.data.games);
    this.sports = _(this.route.snapshot.data.sports)
      .map((sport: Sport): Option => {
        return <Option>{
          label: sport.name,
          value: sport.id
        };
      })
      .value();

    this.states = this.statesService.getStatesProvinces();
    this.generateForm();
  }

  protected generateForm() {
    const SPORTS: Option[] = <Option[]>_.cloneDeep(this.sports);
    const STATES: Option[] = <Option[]>_.cloneDeep(this.states);

    this.fields = [
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
          },
          {
            className: 'col-sm-12',
            type: 'input',
            key: 'date',
            templateOptions: {
              label: 'Event Date',
              type: 'date',
              required: true
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
            className: 'col-sm-12',
            type: 'select',
            key: 'sport_id',
            templateOptions: {
              label: 'Type of Sport',
              required: true,
              options: SPORTS
            }
          },
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
          },
          {
            template:
              '<hr class="space-hr" /><div><strong>Age Groups</strong></div>'
          },
          {
            className: 'col-sm-12',
            type: 'checkbox',
            key: 'kids',
            templateOptions: {
              label: 'Kids 13 and Under',
              required: true
            }
          },
          {
            className: 'col-sm-12',
            type: 'input',
            key: 'kids_referees',
            templateOptions: {
              label: 'Number of Referees for Kids 13 and Under',
              type: 'number',
              min: 1,
              max: 1000,
              required: true
            },
            hideExpression: '!model.kids'
          },
          {
            className: 'col-sm-12',
            type: 'checkbox',
            key: 'teens',
            templateOptions: {
              label: 'High School',
              required: true
            }
          },
          {
            className: 'col-sm-12',
            type: 'input',
            key: 'teens_referees',
            templateOptions: {
              label: 'Number of Referees for High Schoolers',
              type: 'number',
              min: 1,
              max: 1000,
              required: true
            },
            hideExpression: '!model.teens'
          },
          {
            className: 'col-sm-12',
            type: 'checkbox',
            key: 'adults',
            templateOptions: {
              label: 'Over 18',
              required: true
            }
          },
          {
            className: 'col-sm-12',
            type: 'input',
            key: 'adults_referees',
            templateOptions: {
              label: 'Number of Referees for Over 18s',
              type: 'number',
              min: 1,
              max: 1000,
              required: true
            },
            hideExpression: '!model.adults'
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
            key: 'venue',
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
              options: STATES,
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

  public setOrganizeMode(): void {}

  public goNewEvent(): void {
    this.isEditing = true;
  }

  public editEvents(): void {}

  public onSubmit(model: any): void {
    console.log('Model:', model);
  }

  public onCancel(): void {}
}
