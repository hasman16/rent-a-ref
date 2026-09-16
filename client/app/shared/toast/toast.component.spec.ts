import { NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { ToastComponent } from './toast.component';
import { ToastService } from './toast.service';
import { Toast } from './toast';

import { Subject } from 'rxjs';

describe('ToastComponent', () => {
	let component: ToastComponent;
	let fixture: ComponentFixture<ToastComponent>;
	let mockToastService: Subject<Toast>;

	beforeEach(waitForAsync(() => {
		mockToastService = new Subject();
		TestBed.configureTestingModule({
			imports: [CommonModule],
			declarations: [ToastComponent],
			schemas: [NO_ERRORS_SCHEMA],
			providers: [
				{
					provide: ToastService,
					useValue: {
						toasts: mockToastService
					}
				}
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ToastComponent);
		component = fixture.componentInstance;
	});

	it('should create', () => {
		fixture.detectChanges();
		expect(component).toBeTruthy();
	});

	it('should not have message set nor DOM element', () => {
		fixture.detectChanges();
		expect(component.message.body).toBeFalsy();
		expect(component.message.type).toBeFalsy();
		const de = fixture.debugElement.query(By.css('div'));
		expect(de).toBeNull();
	});

	it('should set the message and create the DOM element', () => {
		const mockMessage = {
			body: 'test message',
			type: 'warning'
		};
		component.setMessage(mockMessage.body, mockMessage.type);
		expect(component.message.body).toBe(mockMessage.body);
		expect(component.message.type).toBe(mockMessage.type);
		fixture.detectChanges();
		const de = fixture.debugElement.query(By.css('div'));
		const el = de.nativeElement;
		expect(de).toBeDefined();
		expect(el.textContent).toContain(mockMessage.body);
		expect(el.className).toContain(mockMessage.type);
	});
});
