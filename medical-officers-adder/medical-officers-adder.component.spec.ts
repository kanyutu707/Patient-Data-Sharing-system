import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalOfficersAdderComponent } from './medical-officers-adder.component';

describe('MedicalOfficersAdderComponent', () => {
  let component: MedicalOfficersAdderComponent;
  let fixture: ComponentFixture<MedicalOfficersAdderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicalOfficersAdderComponent]
    });
    fixture = TestBed.createComponent(MedicalOfficersAdderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
