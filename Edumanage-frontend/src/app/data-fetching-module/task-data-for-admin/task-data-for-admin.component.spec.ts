import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDataForAdminComponent } from './task-data-for-admin.component';

describe('TaskDataForAdminComponent', () => {
  let component: TaskDataForAdminComponent;
  let fixture: ComponentFixture<TaskDataForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskDataForAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskDataForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
