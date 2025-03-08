import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskAssignment } from '../models/student-task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentTaskServiceService {

  constructor(private ht:HttpClient) { }
  url:string='http://localhost:8080/studenttasks';

  getAllTasks() {
    return this.ht.get<TaskAssignment[]>(`${this.url}/getAllStudentTasks`)
  }

  addStask(data:any):Observable<string> {
    return this.ht.post(`${this.url}/saveStudentTaskInfo`, data, { responseType: 'text' });
  }


}
