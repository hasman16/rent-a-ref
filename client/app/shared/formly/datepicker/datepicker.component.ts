import { Component, ViewChild } from '@angular/core';
import { FieldType } from '@ngx-formly/material';
import { FieldTypeConfig } from '@ngx-formly/core';
import { MatInput } from '@angular/material/input';

@Component({
	standalone: false,
	selector: 'datepicker-type',
	template: `
		<input
			matInput
			[errorStateMatcher]="errorStateMatcher"
			[formControl]="formControl"
			[matDatepicker]="picker"
			[matDatepickerFilter]="to.datepickerOptions.filter"
			[formlyAttributes]="field"
		/>
		<ng-template #matSuffix>
			<mat-datepicker-toggle [for]="picker"></mat-datepicker-toggle>
		</ng-template>
		<mat-datepicker #picker></mat-datepicker>
	`
})
export class DatepickerTypeComponent extends FieldType<FieldTypeConfig> {
	// Optional: only if you want to rely on `MatInput` implementation
	@ViewChild(MatInput) formFieldControl: MatInput;
}
