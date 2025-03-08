import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { task } from '../models/task-model';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  constructor(private ht:HttpClient){}

 url:string ='http://localhost:8080/task';
   
     addTask(task:any){
       console.log("this is service");
       console.log(task);
       return this.ht.post(`${this.url}/createNewTask`, task, { responseType: 'text' });
     }

     updateTask(task:any){
      console.log(task);
      return this.ht.put(`${this.url}/updateTaskInfo/${task.id}`, task, { responseType: 'text' });
    }

    deleteTask(task:task){
      console.log(task.taskId);
      return this.ht.delete(`${this.url}/deleteTask/${task.taskId}`, {responseType: 'text'})
    }
   
   
     getAllTasks(): Observable<task[]> {
       return this.ht.get<task[]>(`${this.url}/getAllTasks`);
     }
   
     getCount():Observable<object>{
       return this.ht.get(`${this.url}/getCount`);
     }
}
