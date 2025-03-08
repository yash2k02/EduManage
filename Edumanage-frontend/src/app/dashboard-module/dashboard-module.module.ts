import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { TrainerDashboardComponent } from './trainer-dashboard/trainer-dashboard.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    CommonModule, AdminDashboardComponent, TrainerDashboardComponent, StudentDashboardComponent
    // RouterModule.forChild([
    //   { path: "admin-dashboard", component: AdminDashboardComponent },
    //   { path: "trainer-dashboard", component: TrainerDashboardComponent },
    //   { path: "student-dashboard", component: StudentDashboardComponent }])
  ],
  exports: [AdminDashboardComponent, TrainerDashboardComponent, StudentDashboardComponent]
})
export class DashboardModuleModule { }
