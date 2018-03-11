import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
	selector: 'formly-horizontal-radio-type',
	templateUrl: './horizontal-type.html'
})
export class FormlyHorizontalRadioWrapper extends FieldWrapper {
	@ViewChild('fieldComponent', { read: ViewContainerRef })
	fieldComponent: ViewContainerRef;
}
