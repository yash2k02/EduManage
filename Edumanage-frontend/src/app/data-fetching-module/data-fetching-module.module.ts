import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainerDashboardComponent } from '../dashboard-module/trainer-dashboard/trainer-dashboard.component';
import { TrainerDataForAdminComponent } from './trainer-data-for-admin/trainer-data-for-admin.component';
import { StudentDataForAdminComponent } from './student-data-for-admin/student-data-for-admin.component';
import { BatchDataForAdminComponent } from './batch-data-for-admin/batch-data-for-admin.component';
import { TaskDataForAdminComponent } from './task-data-for-admin/task-data-for-admin.component';
import { AttendanceDataForAdminComponent } from './attendance-data-for-admin/attendance-data-for-admin.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule, TrainerDataForAdminComponent, StudentDataForAdminComponent, BatchDataForAdminComponent, TaskDataForAdminComponent, AttendanceDataForAdminComponent
  ],
  exports:[TrainerDataForAdminComponent, StudentDataForAdminComponent, BatchDataForAdminComponent, TaskDataForAdminComponent, AttendanceDataForAdminComponent ]
})
export class DataFetchingModuleModule { }
