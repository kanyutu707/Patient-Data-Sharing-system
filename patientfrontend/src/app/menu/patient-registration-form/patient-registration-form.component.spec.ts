import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientRegistrationFormComponent } from './patient-registration-form.component';

describe('PatientRegistrationFormComponent', () => {
  let component: PatientRegistrationFormComponent;
  let fixture: ComponentFixture<PatientRegistrationFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientRegistrationFormComponent]
    });
    fixture = TestBed.createComponent(PatientRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
