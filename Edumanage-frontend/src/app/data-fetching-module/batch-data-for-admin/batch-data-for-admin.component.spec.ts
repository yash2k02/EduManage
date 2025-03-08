import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchDataForAdminComponent } from './batch-data-for-admin.component';

describe('BatchDataForAdminComponent', () => {
  let component: BatchDataForAdminComponent;
  let fixture: ComponentFixture<BatchDataForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatchDataForAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchDataForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
