import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosisFormComponent } from './diagnosis-form.component';

describe('DiagnosisFormComponent', () => {
  let component: DiagnosisFormComponent;
  let fixture: ComponentFixture<DiagnosisFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiagnosisFormComponent]
    });
    fixture = TestBed.createComponent(DiagnosisFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
