import { AbstractControl, ValidatorFn } from '@angular/forms';

export function compareFields(
	fieldName1: string,
	fieldName2: string
): ValidatorFn {
	return (c: AbstractControl): { [key: string]: boolean } | null => {
		let field1 = c.get(fieldName1);
		let field2 = c.get(fieldName2);

		if (field1.value !== field2.value) {
			return { compareFields: true };
		}
		return null;
	};
}
