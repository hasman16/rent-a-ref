"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var address_form_component_1 = require("./address-form.component");
var profile_service_1 = require("./../../../services/profile.service");
var states_service_1 = require("./../../../services/states.service");
var profileServiceStub = {
    createAddress: function () { },
    updateAddress: function () { }
};
var statesServiceStub = {
    getStatesProvinces: function () {
        return [
            {
                name: 'Arkansas',
                abbreviation: 'AR'
            },
            {
                name: 'California',
                abbreviation: 'CA'
            },
            {
                name: 'Colorado',
                abbreviation: 'CO'
            }
        ];
    }
};
describe('AddressFormComponent', function () {
    var component;
    var fixture;
    var addressForm;
    var line1;
    var city;
    var zip;
    var state;
    var setUp = function () {
        testing_1.TestBed.configureTestingModule({
            imports: [forms_1.ReactiveFormsModule],
            declarations: [address_form_component_1.AddressFormComponent],
            providers: [
                { provide: profile_service_1.ProfileService, useValue: profileServiceStub },
                { provide: states_service_1.StatesService, useValue: statesServiceStub }
            ]
        });
    };
    var createCompoent = function () {
        fixture = testing_1.TestBed.createComponent(address_form_component_1.AddressFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    };
    var getValues = function () {
        addressForm = component.addressForm;
        line1 = addressForm.get('line1');
        city = addressForm.get('city');
        zip = addressForm.get('zip');
        state = addressForm.get('state');
    };
    xdescribe('Address Line 1', function () {
        beforeEach(setUp);
        beforeEach(createCompoent);
        it('should create', function () {
            expect(component).toBeTruthy();
        });
        it('should be invalid and empty string.', function () {
            getValues();
            var de = fixture.debugElement.query(platform_browser_1.By.css('div'));
            expect(de).toBeDefined();
            expect(line1.invalid).toBeTruthy();
            expect(line1.getValue()).toBe('');
        });
        it('should be valid and a string.', function () {
            getValues();
            line1.setValue('24 Main St.');
            fixture.detectChanges();
            var de = fixture.debugElement.query(platform_browser_1.By.css('[formControlName="line1"]'));
            var el = de.nativeElement;
            expect(de).toBeDefined();
            expect(line1.valid).toBeTruthy();
            expect(line1.getValue()).toBe('');
        });
    });
    describe('AddressForm', function () {
        beforeEach(setUp);
        beforeEach(createCompoent);
        it('should create', function () {
            expect(component).toBeTruthy();
        });
        it('should be invalid', function () {
            getValues();
            expect(addressForm.invalid).toBeTruthy();
            expect(line1.invalid).toBeTruthy();
            expect(city.invalid).toBeTruthy();
            expect(state.invalid).toBeTruthy();
            expect(zip.invalid).toBeTruthy();
        });
        it('should be invalid due to bad street address', function () {
            getValues();
            line1.setValue('');
            city.setValue('Orange');
            zip.setValue('92111');
            state.setValue('CA');
            expect(addressForm.invalid).toBeTruthy();
            expect(line1.invalid).toBeTruthy();
            expect(city.valid).toBeTruthy();
            expect(state.valid).toBeTruthy();
            expect(zip.valid).toBeTruthy();
        });
        it('should be valid', function () {
            getValues();
            line1.setValue('42 Main St');
            city.setValue('Orange');
            zip.setValue('92111');
            state.setValue('CA');
            expect(addressForm.valid).toBeTruthy();
            expect(line1.valid).toBeTruthy();
            expect(city.valid).toBeTruthy();
            expect(state.valid).toBeTruthy();
            expect(zip.valid).toBeTruthy();
        });
    });
});
//# sourceMappingURL=address-form.component.spec.js.map