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
              required: true,
              minLength: 5,
              pattern: /\w+[a-zA-Z0-9]/
            }
          },
          {
            className: 'col-sm-12',
            type: 'input',
            key: 'duration',
            templateOptions: {
              label: 'Duration',
              type: 'number',
              required: true
            }
          },
          {
            className: 'col-sm-12',
            type: 'input',
            key: 'periods',
            templateOptions: {
              label: 'Number ofPeriods',
              type: 'number',
              required: true
            }
          },
          {
            className: 'col-sm-12',
            type: 'input',
            key: 'referees',
            templateOptions: {
              label: 'Number of Referees',
              type: 'number',
              required: true
            }
          },
          {
            className: 'col-sm-12',
            type: 'input',
            key: 'date',
            templateOptions: {
              label: 'Match Date',
              type: 'date',
              required: true
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
