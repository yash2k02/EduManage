import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { student } from '../models/student-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {

  constructor(private ht: HttpClient) { }

  private userName: string = '';
  private id:number= 0;

  setId(id:number){
    this.id=id;
  }
  
  getId(){
    return this.id;
  }


  setUserName(name: string) {
    this.userName = name;
  }

  getUserName(): string {
    return this.userName;
  }
  
    url:string ='http://localhost:8080/student';
  
    addStudent(student:any){
      console.log("this is service");
      console.log(student);
      return this.ht.post(`${this.url}/saveStudentInfo`, student, { responseType: 'text' });
    }

    updateStudent(student:any){
      console.log(student);
      return this.ht.put(`${this.url}/updateStudentInfo/${student.id}`, student, { responseType: 'text' });
    }

    deleteStudent(student:student){
      console.log(student.studentId);
      return this.ht.delete(`${this.url}/deleteStudent/${student.studentId}`, {responseType: 'text'})
    }
  
  
    getAllStudents(): Observable<student[]> {
      return this.ht.get<student[]>(`${this.url}/getAllStudents`);
    }
  
    getCount():Observable<object>{
      return this.ht.get(`${this.url}/getCount`);
    }

  }
