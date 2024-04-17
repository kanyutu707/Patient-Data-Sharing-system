import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivatedHospitalsComponent } from './deactivated-hospitals.component';

describe('DeactivatedHospitalsComponent', () => {
  let component: DeactivatedHospitalsComponent;
  let fixture: ComponentFixture<DeactivatedHospitalsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeactivatedHospitalsComponent]
    });
    fixture = TestBed.createComponent(DeactivatedHospitalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
