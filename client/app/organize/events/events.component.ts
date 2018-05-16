import {
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  Input
} from '@angular/core';
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
  Page,
  PagedData,
  Organization,
  State,
  Sport
} from './../../shared/models/index';

import * as _ from 'lodash';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/switchMap';

enum ViewState {
  noEvents,
  listEvents,
  editEvent,
  payForEvent
}

@Component({
  selector: 'rar-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
    'Event Name',
    'Event Date',
    'Venue',
    'Status',
    '',
    ''
  ];
  protected sports: Option[];
  public games: Game[] = [];
  protected isLoading: boolean = false;

  protected organization_id: string = '';
  public buttonText: string = 'Create';
  public viewState: ViewState = ViewState.noEvents;

  constructor(
    private cd: ChangeDetectorRef,
    protected toast: ToastComponent,
    protected route: ActivatedRoute,
    protected router: Router,
    protected statesService: StatesService,
    protected eventsService: EventsService
  ) {
    this.route.params.subscribe(params => {
      this.organization_id = params['organization_id'];
    });
  }

  public ngOnInit() {
    this.games = _.cloneDeep(this.route.snapshot.data.games);
    this.sports = _(this.route.snapshot.data.sportsData.rows)
      .map((sport: Sport): Option => {
        return <Option>{
          label: sport.name,
          value: sport.id
        };
      })
      .value();

    this.states = this.statesService.getStatesProvinces();
    this.generateForm();
    this.setEventsMode();
  }

  protected generateForm() {
    const SPORTS: Option[] = <Option[]>_.cloneDeep(this.sports);
    const STATES: Option[] = <Option[]>_.cloneDeep(this.states);

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
        template:
          '<hr class="space-hr" /><div><strong>Event Duration</strong></div>'
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-sm-6',
            type: 'input',
            key: 'event_start',
            templateOptions: {
              label: 'Event Start',
              type: 'date',
              required: true
            }
          },
          {
            className: 'col-sm-6',
            type: 'input',
            key: 'event_end',
            templateOptions: {
              label: 'Event End',
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
            key: 'kids_referees',
            templateOptions: {
              label: 'Number of Referees for Kids 13 and Under',
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
            key: 'teens_referees',
            templateOptions: {
              label: 'Number of Referees for High Schoolers',
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
            key: 'adults_referees',
            templateOptions: {
              label: 'Number of Referees for Over 18s',
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

  public formatDate(dateString: string): string {
    return moment(dateString).format('LL');
  }

  public setEventsMode(): void {
    this.isLoading = false;
    if (_.isArray(this.games) && this.games.length > 0) {
      this.viewState = ViewState.listEvents;
    } else {
      this.viewState = ViewState.noEvents;
    }
  }

  public isViewState(value: string): boolean {
    let result: boolean = false;
    switch (value) {
      case 'noEvents':
        result = this.viewState == ViewState.noEvents;
        break;
      case 'listEvents':
        result = this.viewState == ViewState.listEvents;
        break;
      case 'editEvent':
        result = this.viewState == ViewState.editEvent;
        break;
      case 'payingForEvent':
        result = this.viewState == ViewState.payForEvent;
        break;
      default:
        result = false;
        break;
    }
    return result;
  }

  public prepareModel(model: any): any {
    return Object.assign(
      {
        adults: false,
        teens: false,
        kids: false
      },
      model
    );
  }

  public createNewEvent(): void {
    this.model = this.prepareModel({});
    this.buttonText = 'Create';
    this.viewState = ViewState.editEvent;
  }

  public payForEvent(game): void {
    if (!this.isLoading) {
      this.isLoading = true;

      this.getEvent(game.id)
        .take(1)
        .subscribe(
          (model: any) => {
            console.log('got game:', game);
            this.model = _.cloneDeep(model);
            this.viewState = ViewState.payForEvent;
          },
          (err: HttpErrorResponse) => {
            this.callFailure(err, 'Failed to retrieve Event.');
            this.setEventsMode();
          },
          () => {
            this.isLoading = false;
            this.cd.markForCheck();
          }
        );
    }
  }

  public editEvents(game: Game): void {
    if (!this.isLoading) {
      this.isLoading = true;

      this.getEvent(game.id)
        .take(1)
        .subscribe(
          (model: any) => {
            console.log('got game:', game);
            this.model = _.cloneDeep(model);
            this.buttonText = 'Update';
            this.viewState = ViewState.editEvent;
          },
          (err: HttpErrorResponse) => {
            this.callFailure(err, 'Failed to retrieve Event.');
            this.setEventsMode();
          },
          () => {
            this.isLoading = false;
            this.cd.markForCheck();
          }
        );
    }
  }

  public getEvent(id: string): Observable<any> {
    const referees = value => value && value > 0;
    return this.eventsService
      .getGame(id)
      .take(1)
      .map((aGame: Game) => {
        console.log('got game:', id);
        const model = this.convertGameToModel(aGame);
        model.kids = referees(model.kids_referees);
        model.teens = referees(model.teens_referees);
        model.adults = referees(model.adults_referees);
        return model;
      });
  }

  public getEvents(): void {
    this.isLoading = true;

    this.eventsService
      .getOrganizationGames(this.organization_id)
      .take(1)
      .subscribe(
        (games: Game[]) => {
          this.games = _.cloneDeep(games);
        },
        (err: HttpErrorResponse) =>
          this.callFailure(err, 'Failed to retrieve Events.'),
        () => {
          this.setEventsMode();
          this.cd.markForCheck();
        }
      );
  }

  public submitEvent(model: Game): void {
    const game: Game = this.convertModelToGame(model);

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
        this.toast.setMessage('Event created.', 'info');
      },
      (err: HttpErrorResponse) =>
        this.callFailure(err, 'Failed to create new event.'),
      () => {
        this.getEvents();
        this.cd.markForCheck();
      }
    );
  }

  public submitUpdateEvent(model: any): void {}

  public callFailure(err: HttpErrorResponse, message = 'An error occurred') {
    if (err.error instanceof Error) {
      this.toast.setMessage(message, 'danger');
    } else {
      this.toast.setMessage('An error occurred:' + err.statusText, 'danger');
    }
  }

  public onCancel(): void {
    this.setEventsMode();
  }

  public convertGameToModel(model: Game): any {
    const eventDate: string = _.trim(model.event_date).split('T')[0];
    let tempModel = _.cloneDeep(model);
    delete tempModel.address;
    delete tempModel.phone;
    tempModel.event_date = eventDate;
    return Object.assign({}, model.address, tempModel);
  }

  public convertModelToGame(model): Game {
    const dateString: string = String(model.event_date);
    const eventDate: number = Number(new Date(dateString).getTime());

    return <Game>{
      id: model.id,
      adults_referees: model.adults_referees,
      teens_referees: model.teens_referees,
      kids_referees: model.kids_referees,

      kids_ref_pay: model.kids_ref_pay,
      teens_ref_pay: model.teens_ref_pay,
      adults_ref_pay: model.adults_ref_pay,

      event_name: model.event_name,
      event_type: model.event_type,
      event_date: eventDate,
      venue_name: model.venue_name,
      status: model.status,
      sport_id: model.sport_id,

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
}
