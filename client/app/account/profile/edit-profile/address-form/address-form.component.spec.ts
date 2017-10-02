import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormGroup, FormControl, AbstractControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { AddressType } from '../../../../shared/models/addressType';

import { AddressFormComponent } from './address-form.component';

xdescribe('AddressFormComponent', () => {
  let component: AddressFormComponent;
  let fixture: ComponentFixture<AddressFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressFormComponent ],
      providers: [ FormBuilder ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(AddressFormComponent);
      component = fixture.componentInstance;
    })
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid', () => {
    let addressForm = component.addressForm;
    let line1 = addressForm.get('line1');
    let city = addressForm.get('city');
    let zip = addressForm.get('zip');
    let state = addressForm.get('state');

    expect(addressForm.invalid).toBeTruthy();
    expect(line1.invalid).toBeTruthy();
    expect(city.invalid).toBeTruthy();
    expect(state.invalid).toBeTruthy();
    expect(zip.invalid).toBeTruthy();
  });

  it('should be invalid due bad street address', () => {
    let addressForm = component.addressForm;
    let line1 = addressForm.get('line1');
    let city = addressForm.get('city');
    let zip = addressForm.get('zip');
    let state = addressForm.get('state');

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
    let addressForm = component.addressForm;
    let line1 = addressForm.get('line1');
    let city = addressForm.get('city');
    let zip = addressForm.get('zip');
    let state = addressForm.get('state');

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
