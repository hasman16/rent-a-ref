import { Component } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';

@Component({
	standalone: false,
	selector: 'formly-repeat-section',
	templateUrl: './repeat-section.type.html',
	styleUrls: ['./repeat-section.type.scss']
})
export class RepeatTypeComponent extends FieldArrayType {
}
