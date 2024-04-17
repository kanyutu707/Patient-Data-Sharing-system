import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InpatientsComponent } from './inpatients.component';

describe('InpatientsComponent', () => {
  let component: InpatientsComponent;
  let fixture: ComponentFixture<InpatientsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InpatientsComponent]
    });
    fixture = TestBed.createComponent(InpatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
