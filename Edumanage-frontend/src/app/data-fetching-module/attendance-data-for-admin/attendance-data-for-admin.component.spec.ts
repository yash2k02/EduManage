import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceDataForAdminComponent } from './attendance-data-for-admin.component';

describe('AttendanceDataForAdminComponent', () => {
  let component: AttendanceDataForAdminComponent;
  let fixture: ComponentFixture<AttendanceDataForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceDataForAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceDataForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
