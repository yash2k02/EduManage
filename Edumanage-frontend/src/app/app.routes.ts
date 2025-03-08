import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './dashboard-module/admin-dashboard/admin-dashboard.component';
import { TrainerDashboardComponent } from './dashboard-module/trainer-dashboard/trainer-dashboard.component';
import { StudentDashboardComponent } from './dashboard-module/student-dashboard/student-dashboard.component';
import { NgModule } from '@angular/core';
import { LoginComponentComponent } from './login-module/login-component/login-component.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
    {path:'login', component:LoginComponentComponent},


    {path:"admin-dashboard", component: AdminDashboardComponent },
    {path:"trainer-dashboard", component: TrainerDashboardComponent },
    {path:"student-dashboard", component: StudentDashboardComponent },
    // {path:'login', component:LoginComponentComponent} 
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

  export class AppRoutingModule {}