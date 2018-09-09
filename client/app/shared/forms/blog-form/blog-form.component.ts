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

//import { StatesService } from './../../../services/index';
//import { State, Option } from './../../models/index';
import { BaseFormComponent } from './../../formly/base-form/base-form.component';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.scss']
})
export class BlogFormComponent implements AfterViewInit, OnInit {
  @ViewChild(BaseFormComponent) baseForm: BaseFormComponent;
  @Input('model')
  set aModel(model: any) {
    const hasId: boolean = this.modelHasId(model);
    this.submitText = this.getSubmitText(hasId);
    this.model = _.cloneDeep(model);
  }
  @Output() ngSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() ngCancel: EventEmitter<boolean> = new EventEmitter<boolean>();

  public model: any = {};
  public submitText: string;
  public fields: FormlyFieldConfig[];
  public disable: boolean = true;
  //public states: Option[];

  constructor() {
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
    //this.states = this.statesService.getStatesProvinces();

    this.fields = [
      {
        template: '<hr class="space-hr" /><div><strong>Category</strong></div>'
      },
      {
        key: 'category',
        type: 'repeat',
        fieldArray: {
          fieldGroupClassName: 'row',
          /*templateOptions: {
            btnText: 'Add Phone'
          },*/
          fieldGroup: [
            {
              className: 'col-sm-6',
              type: 'select',
              key: 'description',
              templateOptions: {
                label: 'Type',
                required: true,
                options: [
                  { label: 'Soccer', value: 'soccer' },
                  { label: 'Rugby', value: 'rugby' },
                  { label: 'Basketball', value: 'basketball' },
                  { label: 'Other', value: 'other' }
                ]
              }
            },
            {
              template:
                '<hr class="space-hr" /><div><strong>Blog Title</strong></div>'
            },
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-sm-12',
                  type: 'input',
                  key: 'name',
                  templateOptions: {
                    label: 'Blog Title',
                    required: true,
                    minLength: 5,
                    pattern: /\w+[a-zA-Z0-9]/
                  }
                }
              ]
            },
            {
              template:
                '<hr class="space-hr" /><div><strong>Body</strong></div>'
            },
            {
              key: 'body',
              type: 'textarea',
              templateOptions: {
                type: 'textarea',
                placeholder: 'body',
                label: 'body',
                required: true,
                minLength: 5
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

  public onSubmit(model: any): void {
    this.ngSubmit.emit(model);
  }

  public onCancel(event: MouseEvent): void {
    this.ngCancel.emit(true);
  }
}
