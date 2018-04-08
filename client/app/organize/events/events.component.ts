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
  Game,
  Phone,
  Option,
  Organization,
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

  protected titles: string[] = [
    'id',
    'Event Name',
    'Event Date',
    'Venue',
    'Status',
    '',
    ''
  ];
  protected sports: Option[];
  protected games: Game[] = [];
  protected isLoading: boolean = false;

  protected isEditing: boolean = false;
  protected organization_id: string = '';
  public buttonText: string = 'Create Event';

  constructor(
    protected toast: ToastComponent,
    protected route: ActivatedRoute,
    protected router: Router,
    protected statesService: StatesService,
    protected eventsService: EventsService
  ) {
    this.route.params.subscribe(params => {
      this.organization_id = params['organization_id'];
      console.log('organization_id:', this.organization_id);
    });
  }

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
            key: 'event_date',
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
              max: 1000
            },
            hideExpression: '!model.kids',
            expressionProperties: {
              'templateOptions.required': 'model.kids'
            }
            /*,
            validators: {
              fieldMatch: {
                expression: control => {
                  const test = item => {
                    if (this.model[item]) {
                      const value = item + '_referees';
                      if (this.model[value] && this.model[value] > 0) {
                        return true;
                      }
                    }
                    return false;
                  };
                  let result = false;
                  if (test('kids') || test('teens') || test('adults')) {
                    result = true;
                  }
                  return result;
                },
                message: 'Select at least one age group.'
              }
            }*/
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
            hideExpression: '!model.teens',
            expressionProperties: {
              'templateOptions.required': 'model.teens'
            }
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
            hideExpression: '!model.adults',
            expressionProperties: {
              'templateOptions.required': 'model.adults'
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

  public setEventsMode(): void {}

  public goNewEvent(): void {
    this.model = {
      adults: false,
      teens: false,
      kids: false
    };
    this.isEditing = true;
  }

  public editEvents(): void {
    this.isEditing = true;
  }

  public getEvents(): void {
    this.isLoading = true;

    this.eventsService.getOrganizationGames(this.organization_id).subscribe(
      (games: Game[]) => {
        this.games = _.cloneDeep(games);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log(
            'A client-side or network error occurred for the Profile'
          );
        } else {
          console.log(
            'The backend returned an unsuccessful response code for the profile'
          );
        }
      },
      () => {
        this.setEventsMode();
        this.isLoading = false;
        if (this.games.length === 0) {
          this.setEventsMode();
        }
      }
    );
  }

  public packmodel(model): Game {
    const dateString: string = String(model.event_date);
    const eventDate: number = Number(new Date(dateString).getDate());
    return <Game>{
      adults_referees: model.adults_referees,
      teens_referees: model.teens_referees,
      kids_referees: model.kids_referees,

      kids_ref_pay: model.kids_ref_pay,
      teens_ref_pay: model.teens_ref_pay,
      adults_ref_pay: model.adults_ref_pay,

      event_name: model.event_name,
      event_type: model.event_type,
      venue_name: model.venue_name,
      status: model.status,
      sport_id: model.sport_id,
      event_date: eventDate,
      address: {
        line1: model.line1,
        line2: model.line2,
        city: model.city,
        state: model.state,
        zip: model.zip,
        country: model.country
      }
    };
  }

  public submitEvent(model: Game): void {
    const game: Game = this.packmodel(model);
    console.log('Model:', model);

    if (_.isNil(model.id) || !model.id) {
      this.submitNewEvent(game);
    } else {
      this.submitUpdateEvent(game);
      this.setEventsMode();
    }
  }

  public submitNewEvent(model: Game): void {
    this.isLoading = true;
    this.eventsService.createGame(this.organization_id, model).subscribe(
      (game: Game) => {
        console.log('it worked');
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log(
            'A client-side or network error occurred for the Profile'
          );
        } else {
          console.log(
            'The backend returned an unsuccessful response code for the profile'
          );
        }
      },
      () => {
        this.getEvents();
      }
    );
  }

  public submitUpdateEvent(model: any): void {}

  public onCancel(): void {
    this.isEditing = false;
  }
}
