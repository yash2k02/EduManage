import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { StudentServiceService } from '../../service-module/student-service.service';
import { batch } from '../../models/batch-model';
import { TaskAssignment } from '../../models/student-task';
import { BatchServiceService } from '../../service-module/batch-service.service';
import { StudentTaskServiceService } from '../../service-module/student-task-service.service';
import { attendance } from '../../models/attendance-model';
import { AttendanceServiceService } from '../../service-module/attendance-service.service';
import { SubmissionServiceService } from '../../service-module/submission-service.service';
import { submission } from '../../models/submission-model';
import { Router } from '@angular/router';
import { LoginServiceService } from '../../login-module/login-service.service';
import { forkJoin } from 'rxjs';

interface Submission {
  student:{
    studentId:number | undefined,
  };
  task:{
    taskId:number | undefined;
  };
  code: string;
  feedback: string;
}

@Component({
  selector: 'app-student-dashboard',
  imports: [CommonModule, FormsModule, MonacoEditorModule],
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  constructor(private http: HttpClient,
    private ss: StudentServiceService,
    private bs: BatchServiceService,
    private sts: StudentTaskServiceService,
    private as: AttendanceServiceService,
    private subser: SubmissionServiceService,
    private router:Router,
    private ls:LoginServiceService) { }


  selectedLanguage: keyof LanguageMap = 'javascript';
  code = '';
  output = '';
  userInput = '';
  editorOptions = { theme: 'vs-dark', language: this.selectedLanguage };
  isRunning = false;
  requiresInput = false;

  id: number = 0;
  name: string = '';
  batches: batch[] = [];
  filteredBatches: batch[] = [];
  allSubmissions: submission[] = [];
  allTasks: TaskAssignment[] = [];
  assignedTasks: TaskAssignment[] = [];
  pendingTasks: TaskAssignment[] = [];
  allAttendances: attendance[] = []
  studentAttendances: attendance[] = []


  ngOnInit(): void {
    // Check if the data already exists in sessionStorage
    const savedStudentData = sessionStorage.getItem('studentData');
    if (savedStudentData) {
      // If data exists, use it to populate the component's state
      const parsedData = JSON.parse(savedStudentData);
      this.id = parsedData.id;
      this.name = parsedData.name;
      this.batches = parsedData.batches;
      this.filteredBatches = parsedData.filteredBatches;
      this.allSubmissions = parsedData.allSubmissions;
      this.assignedTasks = parsedData.assignedTasks;
      this.pendingTasks = parsedData.pendingTasks;
      this.allAttendances = parsedData.allAttendances;
      this.studentAttendances = parsedData.studentAttendances;
  
      console.log('Student data retrieved from sessionStorage:', parsedData);
      this.filterUnattemptedTasks();

    } else {
      // If no data in sessionStorage, make the HTTP requests
      this.ls.checkAuth('student').subscribe({
        next: (response) => {
          if (response.authenticated && response.role === 'student') {

            this.id = this.ss.getId();
            console.log('ID fetched after login:', this.id);
            this.name = this.ss.getUserName();
            console.log('Username fetched after login:', this.name);

            // Get student-related data
            const batches$ = this.bs.getAllBatches();
            const tasks$ = this.sts.getAllTasks();
            const submissions$ = this.subser.getAllSubmissions();
            const attendances$ = this.as.getAllAttendances();
  
            // Use forkJoin to handle multiple HTTP requests concurrently
            forkJoin({
              batches: batches$,
              tasks: tasks$,
              submissions: submissions$,
              attendances: attendances$
            }).subscribe({
              next: (response) => {
                // Store the data in sessionStorage
                const dataToSave = {
                  id: this.id,
                  name: this.name,
                  batches: response.batches,
                  filteredBatches: response.batches.filter(batch =>
                    batch.students.some(student => student.studentId === this.id)
                  ),
                  allSubmissions: response.submissions.filter(submission =>
                    submission.student.studentId === this.id
                  ),
                  assignedTasks: response.tasks.filter(task =>
                    task.student.studentId === this.id
                  ),
                  pendingTasks: [], // Will be populated later
                  allAttendances: response.attendances,
                  studentAttendances: response.attendances.filter(att =>
                    att.student.studentId === this.id
                  ),
                };
  
                sessionStorage.setItem('studentData', JSON.stringify(dataToSave));
  
                // Update the component state with the fetched data
                this.batches = dataToSave.batches;
                this.filteredBatches = dataToSave.filteredBatches;
                this.allSubmissions = dataToSave.allSubmissions;
                this.assignedTasks = dataToSave.assignedTasks;
                this.pendingTasks = dataToSave.pendingTasks;
                this.allAttendances = dataToSave.allAttendances;
                this.studentAttendances = dataToSave.studentAttendances;
  
                console.log('Student data fetched and stored in sessionStorage:', dataToSave);
  
                this.filterUnattemptedTasks(); // Re-filter tasks when submissions are loaded
              },
              error: (err) => {
                console.error('Error loading data:', err);
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
  
  


  role:string='student'
  logout() {
    this.ls.logout(this.role).subscribe({
      next: (data) => {
        console.clear();
        console.log(data);
        alert(data);
        sessionStorage.removeItem('studentData'); // Clear data on logout

        this.router.navigate(['/login']); // Redirect to login page
      },
      error: (error) => {
        console.error('Logout failed:', error);
      }
    });
  }
  


  languages = [
    { id: 'javascript', name: 'JavaScript' },
    { id: 'python3', name: 'Python 3' },
    { id: 'ruby', name: 'Ruby' },
    { id: 'java', name: 'Java' },
    { id: 'c', name: 'C' },
    { id: 'go', name: 'Go' }
  ];

  boilerplateCode: LanguageMap = {
    javascript: 'console.log("Hello, World!");',
    python3: 'print("Hello, World!")',
    ruby: 'puts "Hello, World!"',
    java: 'public class Main { public static void main(String[] args) { System.out.println("Hello, World!"); } }',
    c: '#include <stdio.h> int main() { printf("Hello, World!"); return 0; }',
    go: 'package main; import "fmt"; func main() { fmt.Println("Hello, World!") }'
  };


  runCode() {
    this.isRunning = true; // Show terminal
    this.requiresInput = /input\(|Scanner|scanf|prompt\(|gets|fmt\.Scanln/.test(this.code);
    console.log(this.requiresInput);
    const encodedInput = this.requiresInput ? btoa(this.userInput.trim()) : ''; // Trim input to avoid extra spaces
    this.output = 'Running...';

    const requestData = {
      language_id: this.getLanguageId(this.selectedLanguage),
      source_code: btoa(this.code), // Encode code in Base64
      stdin: encodedInput // Encode input if needed
    };

    const headers = {
      'x-rapidapi-key': '0c6868b5e7msh772108b6c6c5149p1e43d7jsn1b8adc8a4d1b',  // Replace with your actual API key
      'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
      'Content-Type': 'application/json'
    };

    this.http.post('https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=false', requestData, { headers })
      .subscribe({
        next: (res: any) => {
          if (res.token) {
            setTimeout(() => this.getResult(res.token), 2000);
          }
        },
        error: (err) => {
          this.output = 'Error: ' + err.message;
          this.isRunning = false;
        }
      });
  }

  getResult(token: string) {
    this.http.get(`https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=true`, {
      headers: {
        'x-rapidapi-key': '0c6868b5e7msh772108b6c6c5149p1e43d7jsn1b8adc8a4d1b',
        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
      }
    }).subscribe({
      next: (res: any) => {
        this.output = atob(res.stdout || res.stderr || 'Error: Unable to execute the code');
        this.isRunning = true;
      },
      error: (err) => {
        this.output = 'Error fetching result: ' + err.message;
        this.isRunning = true;
      }
    });
  }

  updateBoilerplate() {
    this.code = this.boilerplateCode[this.selectedLanguage];
    this.editorOptions = { ...this.editorOptions, language: this.selectedLanguage };
  }

  private getLanguageId(lang: keyof LanguageMap): number {
    const languageIds: { [key in keyof LanguageMap]: number } = {
      javascript: 63,
      python3: 71,
      ruby: 72,
      java: 62,
      c: 50,
      go: 60
    };
    return languageIds[lang];
  }

  currentView: string = '';
  isAttemptingTask: boolean = false
  currentTask: Partial<TaskAssignment> = {}

  setView(view: string) {
    this.isAttemptingTask = false;
    this.currentView = view;
  }

  attemptTask(task: any) {
    this.currentTask = task;
    this.isAttemptingTask = true
  }

  filterUnattemptedTasks() {
    // Filter out tasks that the student has already attempted
    this.pendingTasks = this.assignedTasks.filter(task =>
      !this.allSubmissions.some(submission =>
        submission.task.taskId === task.task.taskId
      )
    );
    console.log('Unattempted Tasks:', this.assignedTasks);
  }

  codeValue: string = "";
  feedbackValue: string = '';
  submission: Submission | null = null;

  response:any='';
  error:any='';

  submitCode() {
    this.submission = {
      student:{
        studentId:this.id,
      },
      task:{
        taskId:this.currentTask.task?.taskId
      },
      code: this.codeValue,  // Use the actual codeValue entered
      feedback: this.feedbackValue  // Use the actual feedback entered
    };
    console.log("Submitted Code:", this.codeValue);
    console.log(this.submission);

    this.subser.addSubmission(this.submission).subscribe({
      next: (response) => {
        this.response = response;  // Store the response in class-level property
        console.log("Server response:", this.response);
      },
      error: (error) => {
        this.error = error;  // Store the error in class-level property
        console.log("Error:", this.error);
      }
    });



  }



}


type LanguageMap = {
  javascript: string;
  python3: string;
  ruby: string;
  java: string;
  c: string;
  go: string;
};
