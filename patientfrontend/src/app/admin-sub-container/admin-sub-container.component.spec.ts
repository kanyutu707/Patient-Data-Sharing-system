import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSubContainerComponent } from './admin-sub-container.component';

describe('AdminSubContainerComponent', () => {
  let component: AdminSubContainerComponent;
  let fixture: ComponentFixture<AdminSubContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminSubContainerComponent]
    });
    fixture = TestBed.createComponent(AdminSubContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
