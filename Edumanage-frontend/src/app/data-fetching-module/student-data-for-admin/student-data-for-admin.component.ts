import { Component } from '@angular/core';
import { student } from '../../models/student-model';
import { StudentServiceService } from '../../service-module/student-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-student-data-for-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './student-data-for-admin.component.html',
  styleUrl: './student-data-for-admin.component.css'
})
export class StudentDataForAdminComponent {

    constructor(private ss:StudentServiceService){}
  
    successMessage:string ='';
  
  student = {
    name: '',
    email: '',
    phone: '',
    batch: {
      batchId:''
    },
    username: '',
    password: '',
  };
  
  
  option: string = 'default';
  students: student[] = []; // student is now explicitly typed as an array of trainer objects
  selectedTrainer: student | null = null; // Object for a specific student
  filteredStudents: student[] = [];
  
  ngOnInit(): void {
      this.ss.getAllStudents().subscribe({
        next: (student:student[])=>{
          this.students=student;
          console.log(this.students);
          this.filteredStudents = [...this.students];
        },
        error: (err)=>{
          console.error('Error fetching students', err);
        }
      });
  }
  
  addStudent() {
    this.option = 'add';
     
  }
  
  onsubmit(form: NgForm):void {
    if(form.valid){
    console.log('Form submitted successfully with data:', this.student);
    this.successMessage = 'Student registered successfully!';
    
    // Clear the success message after 3 seconds (optional)
    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
    this.ss.addStudent(this.student).subscribe((res)=>{
      console.log(res);
      form.resetForm();
     }); 
    }
  }
  
  searchQuery:string='';
    filterStudents() {
      const query = this.searchQuery.toLowerCase();
      this.filteredStudents = this.students.filter(student =>
        student.name.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query) ||
        student.phone.toString().includes(query) || // Convert phone to string
        student.batch.batchId.toString().toLowerCase().includes(query)
      );
    }

    upstudent={
      id:0,
      name:'',
      email:'',
      phone :'',
      batch:{
        batchId:0
      }, 
      username:'', 
      password:''
    }

    editStudent(student:student){
      this.option='edit';
      this.upstudent.id=student.studentId,
      this.upstudent.name=student.name;
      this.upstudent.email=student.email;
      this.upstudent.phone=student.phone;
      this.upstudent.batch.batchId=student.batch.batchId;
      this.upstudent.username=student.username;
      this.upstudent.password=student.password;
      console.log(this.student);
    }


    onUpdate(form: NgForm):void{
      if(form.valid){
        console.log('Form submitted successfully with data:', this.upstudent);
        this.successMessage = 'Student updated successfully!';
        
        // Clear the success message after 3 seconds (optional)
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
        this.ss.updateStudent(this.upstudent).subscribe((res)=>{
          console.log(res);
          form.resetForm();
         }); 
        }
      }

      deleteStudent(student:student){
        this.ss.deleteStudent(student).subscribe(res=>{
          console.log(res);
        });
        this.successMessage='Deleted successfully. Please refresh the page';
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      }


    }
