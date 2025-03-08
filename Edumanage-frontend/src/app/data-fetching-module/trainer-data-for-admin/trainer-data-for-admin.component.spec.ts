import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerDataForAdminComponent } from './trainer-data-for-admin.component';

describe('TrainerDataForAdminComponent', () => {
  let component: TrainerDataForAdminComponent;
  let fixture: ComponentFixture<TrainerDataForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerDataForAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainerDataForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
