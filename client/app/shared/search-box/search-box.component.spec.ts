import { NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SearchBoxComponent } from './search-box.component';

import { Subject } from 'rxjs';

describe('SearchBoxComponent', () => {
	let component: SearchBoxComponent;
	let fixture: ComponentFixture<SearchBoxComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [SearchBoxComponent],
			schemas: [NO_ERRORS_SCHEMA],
			providers: []
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SearchBoxComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
