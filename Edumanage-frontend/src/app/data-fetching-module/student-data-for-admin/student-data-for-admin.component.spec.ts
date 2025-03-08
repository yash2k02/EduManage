import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDataForAdminComponent } from './student-data-for-admin.component';

describe('StudentDataForAdminComponent', () => {
  let component: StudentDataForAdminComponent;
  let fixture: ComponentFixture<StudentDataForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentDataForAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentDataForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
