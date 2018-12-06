import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
	selector: 'base-form',
	templateUrl: './base-form.component.html',
	styleUrls: ['./base-form.component.scss']
})
export class BaseFormComponent implements OnInit {
	@Input('model')
	set Model(model: any) {
		this.model = model;
	}
	@Input('fields')
	set Fields(fields: FormlyFieldConfig[]) {
		this.fields = fields;
	}
	@Input('options')
	set Options(options: FormlyFormOptions) {
		this.options = options;
	}
	@Output('ngSubmit') submitter: EventEmitter<any> = new EventEmitter<any>();

	public form: FormGroup = new FormGroup({});
	public model: any = {};
	public options: FormlyFormOptions = <FormlyFormOptions>{};
	public fields: FormlyFieldConfig[];

	constructor() {}

	ngOnInit() {}

	onSubmit(model: any): void {
		this.submitter.emit(model);
	}
}
