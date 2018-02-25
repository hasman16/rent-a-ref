import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';


@Component({
  selector: 'organization-form',
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.scss']
})
export class OrganizationFormComponent implements OnInit {
  @Input('model') setModel(model:any) {
    this.model = model;
  };
  protected model: any = {};
  protected modeName: string="Create Organization"
  protected fields: FormlyFieldConfig[];

  constructor() { }

  ngOnInit() {
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
              minLength: 5
            },
          }
        ],
      },
      {
        template: '<hr /><div><strong>Address:</strong></div>',
      },
      {
        key: 'addresses',
        type: 'repeat',
        fieldArray: {
          fieldGroupClassName: 'row',
          templateOptions: {
            btnText: 'Add Address',
          },
          fieldGroup: [
            {
              className: 'col-sm-3',
              type: 'input',
              key: 'address1',
              templateOptions: {
                label: 'Street 1',
                required: true,
              },
            },
            {
              type: 'input',
              key: 'address2',
              className: 'col-sm-3',
              templateOptions: {
                type: 'text',
                label: 'Street 2',
              },
            },
            {
              type: 'input',
              key: 'city',
              className: 'col-sm-2',
              templateOptions: {
                label: 'City',
              },
            },
            {
              type: 'input',
              key: 'state',
              className: 'col-sm-2',
              templateOptions: {
                label: 'State',
              },
            },
            {
              type: 'input',
              key: 'zip',
              className: 'col-sm-2',
              templateOptions: {
                label: 'Zip',
              },
            },
             {
              type: 'input',
              key: 'country',
              className: 'col-sm-12',
              templateOptions: {
                label: 'Country',
              },
            }
          ],
        },
      },
      {
        template: '<hr /><div><strong>Phones</strong></div>',
      },
      {
        key: 'phones',
        type: 'repeat',
        fieldArray: {
          fieldGroupClassName: 'row',
          templateOptions: {
            btnText: 'Add Phone',
          },
          fieldGroup: [
            {
              className: 'col-sm-6',
              type: 'input',
              key: 'type',
              templateOptions: {
                label: 'Type',
                required: true,
              },
            },
            {
              type: 'input',
              key: 'number',
              className: 'col-sm-6',
              templateOptions: {
                type: 'text',
                label: 'Number',
              },
            }
          ],
        },
      },
    ];

  }

  onOrganizationSubmit() {

  }
}
