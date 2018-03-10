import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, EmailValidator, ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from './../../shared/toast/toast.component';
import { AuthService, Option, OrganizeService, State, StatesService, UserService } from './../../services/index';
import { Address, BaseModel, Phone, Organization, Profile, Sport } from './../../shared/models/index';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/switchMap';

import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'rr-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  @Input() set country(aCountry: string) {
    this.countryName = aCountry || 'usa';
  }
  protected countryName: string;
  protected states: Option[];
  protected form = new FormGroup({});
  protected model: any = {};
  protected currentModel: any = {};
  protected options: FormlyFormOptions = {};
  protected fields: FormlyFieldConfig[];

  protected sports: Sport[];
  protected organizations: Organization[] = [];
  protected isLoading: boolean = false;

  protected isEditing: boolean = false;

  constructor(private auth: AuthService,
    public toast: ToastComponent,
    private route: ActivatedRoute,
    private router: Router,
    private statesService: StatesService,
    private organizeService: OrganizeService) {
  }

  getSports() {
    this.organizeService
      .getSports()
      .subscribe((sports: Sport[]) => {
        console.log('EventsComponent sports:', sports);
        this.sports = sports;
        this.generateForm();
      });
  }

  ngOnInit() {
    this.getSports();
  }

  generateForm() {
    const SPORTS: Option[] = _(this.sports)
      .map((sport: Sport): Option => {
        return <Option>{
          label: sport.name,
          value: sport.id
        };
      })
      .value();

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
              label: 'Event Name',
              required: true,
              minLength: 5,
              pattern: /\w+[a-zA-Z0-9]/
            },
          }
        ],
      },
      {
        template: '<hr class="space-hr" />',
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-sm-12',
            type: 'select',
            key: 'sport',
            templateOptions: {
              label: 'Type of Sport',
              required: true,
              options: SPORTS
            }
          },
          {
            className: 'col-sm-12',
            type: 'radio',
            key: 'eventType',
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
            className: 'col-sm-12',
            type: 'checkbox',
            key: 'age',
            templateOptions: {
              label: 'Age Of Participants',
              required: true,
              options: [
                { label: 'Kids 13 and Under', value: 'kids' },
                { label: 'High School', value: 'high school' },
                { label: 'Over 18', value: 'over18' }
              ]
            }
          }
        ],
      },

      {
        template: '<hr class="space-hr" /><div><strong>Address</strong></div>',
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-sm-3',
            type: 'input',
            key: 'line1',
            templateOptions: {
              label: 'Street 1',
              required: true,
            }
          },
          {
            type: 'input',
            key: 'line2',
            className: 'col-sm-3',
            templateOptions: {
              type: 'text',
              label: 'Street 2',
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
            },
          }
        ]
      }
    ];
  }

  setOrganizeMode(): void {
  }
}
