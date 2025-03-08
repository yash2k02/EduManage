import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DataFetchingModuleModule } from '../../data-fetching-module/data-fetching-module.module';
import { Title } from '@angular/platform-browser';
import { TrainerServiceService } from '../../service-module/trainer-service.service';
import { LoginServiceService } from '../../login-module/login-service.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, RouterModule, DataFetchingModuleModule], // Add this
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'] // Corrected property name
})
export class AdminDashboardComponent {
constructor(private title:Title, private ts:TrainerServiceService, private ls:LoginServiceService, private router:Router){}

count:{}={};

ngOnInit(): void {
  this.title.setTitle('Admin Dashboard');
  this.ts.getCount().subscribe((res)=>{
    this.count=res;
  })
}

  currentView: string = 'default'; // Tracks the current view

    setView(view: string) {
        this.currentView = view;
    }

    role:string='admin';
    logout() {
      this.ls.logout(this.role).subscribe({
        next: (data) => {
          console.clear();
          console.log(data);
          alert(data);
          this.router.navigate(['/login']); // Redirect to login page
        },
        error: (error) => {
          console.error('Logout failed:', error);
        }
      });

    }

}
