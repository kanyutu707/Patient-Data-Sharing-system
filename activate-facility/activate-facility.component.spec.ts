import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateFacilityComponent } from './activate-facility.component';

describe('ActivateFacilityComponent', () => {
  let component: ActivateFacilityComponent;
  let fixture: ComponentFixture<ActivateFacilityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivateFacilityComponent]
    });
    fixture = TestBed.createComponent(ActivateFacilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
