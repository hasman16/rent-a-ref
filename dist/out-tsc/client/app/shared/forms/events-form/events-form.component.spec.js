/*import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormGroup, FormControl, AbstractControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { Address } from './../../models/address';

import { AddressFormComponent } from './address-form.component';
import { ProfileService } from './../../../services/profile.service';
import { StatesService } from './../../../services/states.service';

let profileServiceStub = {
  createAddress: function() { },
  updateAddress: function() { }
};

let statesServiceStub = {
  getStatesProvinces: function() {
    return [{
      "name": "Arkansas",
      "abbreviation": "AR"
    },
    {
      "name": "California",
      "abbreviation": "CA"
    },
    {
      "name": "Colorado",
      "abbreviation": "CO"
    }];
  }
};

describe('AddressFormComponent', () => {
  let component: AddressFormComponent;
  let fixture: ComponentFixture<AddressFormComponent>;
  let addressForm;
  let line1;
  let city;
  let zip;
  let state;

  let setUp = () => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [AddressFormComponent],
      providers: [{ provide: ProfileService, useValue: profileServiceStub }, { provide: StatesService, useValue: statesServiceStub }]
    });
  };
  let createCompoent = () => {
    fixture = TestBed.createComponent(AddressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  let getValues = () => {
    addressForm = component.addressForm;
    line1 = addressForm.get('line1');
    city = addressForm.get('city');
    zip = addressForm.get('zip');
    state = addressForm.get('state');
  }

  describe("Address Line 1", () => {
    beforeEach(setUp);

    beforeEach(createCompoent);

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should be invalid and empty string.', () => {
      getValues();
      const de = fixture.debugElement.query(By.css('div'));
      expect(de).toBeNull();
      expect(line1.invalid).toBeTruthy();
      expect(line1.getValue()).toBe('');
    });

    it('should be valid and a string.', () => {
      getValues();
      line1.setValue('24 Main St.');
      fixture.detectChanges();
      const de = fixture.debugElement.query(By.css('[formControlName="line1"]'));
      const el = de.nativeElement;
      expect(de).toBeDefined();
      expect(line1.invalid).toBeTruthy();
      expect(line1.getValue()).toBe('');
    });
  });

  describe("AddressForm", () => {
    beforeEach(setUp);

    beforeEach(createCompoent);

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should be invalid', () => {
      getValues();

      expect(addressForm.invalid).toBeTruthy();
      expect(line1.invalid).toBeTruthy();
      expect(city.invalid).toBeTruthy();
      expect(state.invalid).toBeTruthy();
      expect(zip.invalid).toBeTruthy();
    });

    it('should be invalid due to bad street address', () => {
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

    it('should be valid', () => {
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
*/ 
//# sourceMappingURL=events-form.component.spec.js.map