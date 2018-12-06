import { Component } from '@angular/core';
import { AddressFormComponent } from './../address-form.component';

@Component({
	selector: 'horizontal-address-form',
	templateUrl: './horizontal-address-form.component.html',
	styleUrls: ['./horizontal-address-form.component.scss']
})
export class HorizontalAddressFormComponent extends AddressFormComponent {}
