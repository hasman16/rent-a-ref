import { Component } from '@angular/core';
import { FieldArrayType, FormlyFormBuilder } from '@ngx-formly/core';

@Component({
	selector: 'formly-repeat-section',
	templateUrl: './repeat-section.type.html',
	styleUrls: ['./repeat-section.type.scss']
})
export class RepeatTypeComponent extends FieldArrayType {
	constructor(builder: FormlyFormBuilder) {
		super(builder);
	}
}
