import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TrainerServiceService } from '../../service-module/trainer-service.service';
import { BatchServiceService } from '../../service-module/batch-service.service';
import { trainer } from '../../models/trainer-model';
import { CommonModule } from '@angular/common';
import { Form, FormsModule, NgForm, ValueChangeEvent } from '@angular/forms';
import { DataFetchingModuleModule } from '../../data-fetching-module/data-fetching-module.module';
import { TaskServiceService } from '../../service-module/task-service.service';
import { task } from '../../models/task-model';
import { attendance } from '../../models/attendance-model';
import { AttendanceServiceService } from '../../service-module/attendance-service.service';
import { SubmissionServiceService } from '../../service-module/submission-service.service';
import { submission } from '../../models/submission-model';
import { LoginServiceService } from '../../login-module/login-service.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs'; // Import forkJoin from rxjs
import { StudentTaskServiceService } from '../../service-module/student-task-service.service';

@Component({
  selector: 'app-trainer-dashboard',
  imports: [CommonModule, FormsModule, DataFetchingModuleModule],
  templateUrl: './trainer-dashboard.component.html',
  styleUrls: ['./trainer-dashboard.component.css']
})

export class TrainerDashboardComponent {
  trainerInfo: trainer | null = null; // Initialized as null to handle undefined data
  batchCount: {} = {};
  studentCount: number = 0;
  tBatches: number = 0;
  id: number = 0;
  username: string = '';
  currentView: string = 'default'; // Tracks the current view
  tasks: task[] = [];
  attendances: attendance[] = [];
  submissions: submission[] = [];
  filteredSubmissions: submission[] = [];
  filteredAttendance:attendance[] = [];

  constructor(
    private title: Title,
    private trs: TrainerServiceService,
    private bs: BatchServiceService,
    private tas: TaskServiceService,
    private sts: StudentTaskServiceService,
    private as: AttendanceServiceService,
    private ss: SubmissionServiceService,
    private ls: LoginServiceService,
    private router: Router
  ) { }


  ngOnInit(): void {
    // Set the page title
    this.title.setTitle('Trainer Dashboard');

    // Check if the data already exists in sessionStorage
    const savedTrainerData = sessionStorage.getItem('trainerData');
    if (savedTrainerData) {
      // If data exists, use it to populate the component's state
      const parsedData = JSON.parse(savedTrainerData);
      this.username = parsedData.username;
      console.log('Username retrieved from sessionStorage:', this.username);

      this.trainerInfo = parsedData.trainer;
      this.tBatches = parsedData.batches;
      this.batchCount = parsedData.count;
      this.tasks = parsedData.tasks;
      this.attendances = parsedData.attendances;
      this.submissions = parsedData.submissions;
      this.filteredSubmissions = parsedData.filteredSubmissions;
      this.filteredAttendance = [...this.attendances];
      this.filterSubmissionsByTrainer();
      this.calculateStudentCount();
    } else {
      // If no data in sessionStorage, make the HTTP requests
      this.ls.checkAuth('trainer').subscribe({
        next: (response) => {
          if (response.authenticated && response.role === 'trainer') {
            // Get the trainer's ID and username
            this.id = this.trs.getId();
            console.log('ID fetched after login:', this.id);
            this.username = this.trs.getUserName();
            console.log('Username fetched after login:', this.username);



            const trainer$ = this.trs.getTrainerById(this.id);
            const batches$ = this.bs.getBatchesByTid(this.id);
            const count$ = this.trs.getCount();
            const tasks$ = this.tas.getAllTasks();
            const attendances$ = this.as.getAllAttendances();
            const submissions$ = this.ss.getAllSubmissions();

            forkJoin({
              trainer: trainer$,
              batches: batches$,
              count: count$,
              tasks: tasks$,
              attendances: attendances$,
              submissions: submissions$
            }).subscribe({
              next: (response) => {
                // Store the data in sessionStorage
                const dataToSave = {
                  username: this.username,
                  trainer: response.trainer,
                  batches: response.batches,
                  count: response.count,
                  tasks: response.tasks,
                  attendances: response.attendances,
                  submissions: response.submissions,
                  filteredSubmissions: this.filteredSubmissions,
                };
                console.log(dataToSave);
                sessionStorage.setItem('trainerData', JSON.stringify(dataToSave));

                // Update the component state with the fetched data
                this.trainerInfo = response.trainer;
                this.tBatches = response.batches;
                this.batchCount = response.count;
                this.tasks = response.tasks;
                this.attendances = response.attendances;
                this.filteredAttendance=[...this.attendances];
                this.submissions = response.submissions;
                if (this.submissions.length > 0) {
                  this.filterSubmissionsByTrainer();
                }
                this.calculateStudentCount();
              },
              error: (err) => {
                console.error('Error in one or more HTTP requests:', err);
              }
            });
          } else {
            this.router.navigate(['/login']);
          }
        },
        error: () => {
          this.router.navigate(['/login']);
        }
      });
    }
  }

  // Method to calculate the total student count
  calculateStudentCount(): void {
    this.studentCount = 0; // Reset count
    if (this.trainerInfo?.batches) {
      this.trainerInfo.batches.forEach((batch) => {
        this.studentCount += batch.students.length; // Add students in each batch
      });
    }
  }

  // Method to set the current view
  setView(view: string) {
    this.selectedBatch = null;
    this.selectedStudent = null;
    this.currentView = view;
  }


  selectedBatch: any = null;
  selectedStudent: any = null;

  formData = {
    studentId: '',
    batchId: '',
    taskId: '',
    trainerId: 0, // Replace with the actual trainer ID
  };

  openForm(batch: any, student: any) {
    this.selectedBatch = batch;
    this.selectedStudent = student;

    // Populate formData
    this.formData.studentId = student.studentId;
    this.formData.batchId = batch.batchId;
    this.formData.trainerId = this.trainerInfo?.trainerId ?? 0;
  }

  submitTask() {
    console.log('Task assigned:', this.formData);
    // Perform your task assignment logic here, like making an API call
    alert(`Task assigned successfully to student ID: ${this.formData.studentId}`);
    const data = {
      student: {
        studentId: this.formData?.studentId
      },
      batch: {
        batchId: this.formData?.batchId
      },
      task: {
        taskId: this.formData?.taskId
      },
      trainer: {
        trainerId: this.formData?.trainerId
      }
    }

    this.sts.addStask(data).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    })

    this.selectedBatch = null;
    this.selectedStudent = null;
  }



  filterSubmissionsByTrainer() {
    const trainerBatchIds = this.trainerInfo?.batches.map(batch => batch.batchId) || [];
    console.log("trainer batches are:", trainerBatchIds);

    this.filteredSubmissions = this.submissions?.filter(submission => trainerBatchIds.includes(submission?.student.batch.batchId)) // Access batchId in student.batch
      .map(submission => ({
        ...submission,
        batchName: this.getBatchName(submission.student.batch.batchId), // Pass the correct batchId

      }));
    console.log("trainer related submissions");
    console.log(this.filteredSubmissions);
  }

  // Get the batch name for a given batch ID
  getBatchName(batchId: number): string {
    return this.trainerInfo?.batches.find(batch => batch.batchId === batchId)?.batchName || 'Unknown Batch';
  }


  role: string = 'trainer';
  logout() {
    this.ls.logout(this.role).subscribe({
      next: (data) => {
        console.clear();
        console.log(data);
        alert(data);
        sessionStorage.removeItem('trainerData'); // Clear data on logout
        this.router.navigate(['/login']); // Redirect to login page
      },
      error: (error) => {
        console.error('Logout failed:', error);
      }
    });

  }
  
  searchQuery:string='';
  filterAttendances() {
    const query = this.searchQuery.toLowerCase();
    this.filteredAttendance = this.attendances.filter(attend =>
      attend.student.name.toLowerCase().includes(query) ||
      attend.batch.batchName.toLowerCase().includes(query) ||
      attend.date.toString().includes(query) ||
      attend.status.toLowerCase().includes(query)
    );
  }

  addAttendance(){
    this.currentView='add-attendance'
  }

  attendance={
    student:{
      studentId:0
    },
    batch:{
      batchId:0
    },
    date:'',
    status:''
  }
  upattendance={
    id:0,
    student:{
      studentId:0
    },
    batch:{
      batchId:0
    },
    date:'',
    status:''
  }

  editAttendance(attendance:attendance){
    console.log(attendance);
    console.log(attendance.batch.batchId);
    this.currentView='edit-attendance';
    this.upattendance.id=attendance.attendanceId
    this.upattendance.student.studentId=attendance.student.studentId;
    this.upattendance.batch.batchId=attendance.batch.batchId;
    this.upattendance.date=attendance.date.toString();
    this.upattendance.status=attendance.status;
    
  }

  // 
  
  onsubmit(form: NgForm): void {
    if (form.valid) {
      this.as.addAttendance(this.attendance).subscribe({
        next: (res) => {
          console.log('Attendance added:', res);
          this.successMessage = 'Attendance created successfully!';
          
          this.as.getAllAttendances().subscribe({
            next: (updatedAttendances) => {
              this.attendances = updatedAttendances;
              this.filteredAttendance = [...updatedAttendances];
  
              // Update sessionStorage
              const trainerData = JSON.parse(sessionStorage.getItem('trainerData') || '{}');
              trainerData.attendances = updatedAttendances;
              sessionStorage.setItem('trainerData', JSON.stringify(trainerData));
            },
            error: (err) => {
              console.error('Error fetching updated attendance:', err);
            }
          });
  
          form.resetForm();
  
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        },
        error: (err) => console.error('Error adding attendance:', err)
      });
    }
  }
  

  successMessage: string = '';
  // onUpdate(form: NgForm):void{
  //       if(form.valid){
  //         console.log('Form submitted successfully with data:', this.upattendance);
  //         this.successMessage = 'Attendance updated successfully!';
          
  //         // Clear the success message after 3 seconds (optional)
  //         setTimeout(() => {
  //           this.successMessage = '';
  //         }, 3000);
  //         this.as.updateAttendance(this.upattendance).subscribe((res)=>{
  //           console.log(res);
  //           form.resetForm();
  //          }); 
  //         }
  //       }

  onUpdate(form: NgForm): void {
    if (form.valid) {
      console.log('Form submitted successfully with data:', this.upattendance);
      this.successMessage = 'Attendance updated successfully!';
      
      this.as.updateAttendance(this.upattendance).subscribe({
        next: (res) => {
          console.log('Attendance updated:', res);
  
          // Fetch fresh data from the backend
          this.as.getAllAttendances().subscribe({
            next: (updatedAttendances) => {
              this.attendances = updatedAttendances;
              this.filteredAttendance = [...updatedAttendances];
  
              // Update sessionStorage
              const trainerData = JSON.parse(sessionStorage.getItem('trainerData') || '{}');
              trainerData.attendances = updatedAttendances;
              sessionStorage.setItem('trainerData', JSON.stringify(trainerData));
            },
            error: (err) => {
              console.error('Error fetching updated attendance:', err);
            }
          });
  
          form.resetForm();
        },
        error: (err) => {
          console.error('Error updating attendance:', err);
        }
      });
  
      // Clear the success message after 3 seconds
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    }
  }
  

  deleteAttendance(attendance:attendance){
    this.as.deleteAttendance(attendance).subscribe({
      next:(res)=>{
        this.successMessage='Attendance deleted successfully';
        console.log(res);
        this.as.getAllAttendances().subscribe({
          next: (updatedAttendances) => {
            this.attendances = updatedAttendances;
            this.filteredAttendance = [...updatedAttendances];

            // Update sessionStorage
            const trainerData = JSON.parse(sessionStorage.getItem('trainerData') || '{}');
            trainerData.attendances = updatedAttendances;
            sessionStorage.setItem('trainerData', JSON.stringify(trainerData));
          },
          error: (err) => {
            console.error('Error fetching updated attendance:', err);
          }
        });
      },
      error: (err) => {
        console.error('Error updating attendance:', err);
      }
    });
    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }

}