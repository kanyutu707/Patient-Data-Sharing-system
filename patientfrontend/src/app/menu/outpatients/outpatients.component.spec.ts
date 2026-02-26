import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutpatientsComponent } from './outpatients.component';

describe('OutpatientsComponent', () => {
  let component: OutpatientsComponent;
  let fixture: ComponentFixture<OutpatientsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OutpatientsComponent]
    });
    fixture = TestBed.createComponent(OutpatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
