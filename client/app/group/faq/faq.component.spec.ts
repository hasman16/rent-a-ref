import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FapComponent } from './fap.component';

describe('FapComponent', () => {
  let component: FapComponent;
  let fixture: ComponentFixture<FapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
