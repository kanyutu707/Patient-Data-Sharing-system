import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSubMenuComponent } from './admin-sub-menu.component';

describe('AdminSubMenuComponent', () => {
  let component: AdminSubMenuComponent;
  let fixture: ComponentFixture<AdminSubMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminSubMenuComponent]
    });
    fixture = TestBed.createComponent(AdminSubMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
