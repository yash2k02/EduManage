import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../login-service.service';
import { Router } from '@angular/router';
import { TrainerServiceService } from '../../service-module/trainer-service.service';
import { StudentServiceService } from '../../service-module/student-service.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login-component',
  standalone: false,
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.css'
})
export class LoginComponentComponent implements OnInit {

  constructor(
    private ls: LoginServiceService,
    private ts: TrainerServiceService,
    private ss: StudentServiceService,
    private router: Router,
    private title:Title
  ) { }

  ngOnInit(): void {
      this.title.setTitle('Login Page');
  }

  currentRole: string = 'admin';
  
  adminUsername: string = '';
  adminPassword: string = '';

  trainerUsername: string = '';
  trainerPassword: string = '';
  
  studentUsername: string = '';
  studentPassword: string = '';


  switchRole(role: string) {
    this.currentRole = role;
  }

  setCreds() {

    if (this.currentRole === 'admin') {
      console.log(this.adminUsername);
      console.log(this.adminPassword);
      this.ls.login(this.currentRole, this.adminUsername, this.adminPassword).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          this.router.navigate(['/admin-dashboard']);
          console.log("hello sir");
        },
        error: (error) => {
          console.error('Login failed:', error);
        }
      });
    }
    else if (this.currentRole === 'trainer') {
      console.log(this.trainerUsername);
      console.log(this.trainerPassword);
      this.ls.login(this.currentRole, this.trainerUsername, this.trainerPassword).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          if ('trainerId' in response) {
            const id = response.trainerId;
            const name = response.name;
            this.ts.setId(id);
            this.ts.setUserName(name);
            this.router.navigate(['/trainer-dashboard']);
          }
        },
        error: (error) => {
          console.error('Login failed:', error);
        }
      });
    }
    else if (this.currentRole === 'student') {
      console.log(this.studentUsername);
      console.log(this.studentPassword);
      this.ls.login(this.currentRole, this.studentUsername, this.studentPassword).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          if ('studentId' in response) {
            const id = response.studentId;
            const name = response.name;  // Safely assign name
            this.ss.setId(id);
            this.ss.setUserName(name);  // Store the name in the service
            this.router.navigate(['/student-dashboard']);
          }
        },
        error: (error) => {
          console.error('Login failed:', error);
        }
      });
    }
  }
}
