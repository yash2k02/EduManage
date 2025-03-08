import { Component } from '@angular/core';
import { attendance } from '../../models/attendance-model';
import { AttendanceServiceService } from '../../service-module/attendance-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-attendance-data-for-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './attendance-data-for-admin.component.html',
  styleUrl: './attendance-data-for-admin.component.css'
})
export class AttendanceDataForAdminComponent {
 constructor(private ts: AttendanceServiceService) { }
   
     successMessage: string = '';

     option: string = 'default';
     attendances: attendance[] = []; // trainer is now explicitly typed as an array of trainer objects
     selectedAttendance: attendance | null = null; // Object for a specific trainer
     filteredAttendances: attendance[] = [];
   
     ngOnInit(): void {
       this.ts.getAllAttendances().subscribe({
         next: (s: attendance[]) => {
           this.attendances = s;
           console.log(this.attendances);
           this.filteredAttendances = [...this.attendances];
         },
         error: (err) => {
           console.error('Error fetching tasks', err);
         }
       });
   
   
     }
   
     addAttendance() {
       this.option = 'add';
   
     }
   
     onsubmit(form: NgForm): void {
       if (form.valid) {
         console.log('Form submitted successfully with data:');
         this.successMessage = 'Task created successfully!';
   
         // Clear the success message after 3 seconds (optional)
         setTimeout(() => {
           this.successMessage = '';
         }, 3000);
           form.resetForm();
         };
       }
   
     searchQuery: string = '';
 
     filterAttendances() {
       const query = this.searchQuery.toLowerCase();
       this.filteredAttendances = this.attendances.filter(attendance =>
         attendance.student.name.toLowerCase().includes(query) ||
         attendance.batch.batchName.toLowerCase().includes(query) ||
         attendance.batch.trainer.name.toLowerCase().includes(query) ||
         attendance.date.toString().includes(query) ||
         attendance.status.includes(query)
             );
     }
   
}
