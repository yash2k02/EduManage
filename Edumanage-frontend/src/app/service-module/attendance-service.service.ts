import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { attendance } from '../models/attendance-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceServiceService {

  constructor(private ht: HttpClient) { }

  url:string ='http://localhost:8080/attendance';

  getAllAttendances(): Observable<attendance[]> {
    return this.ht.get<attendance[]>(`${this.url}/getAllAttendances`);
  }

  addAttendance(attendance:any){
    return this.ht.post(`${this.url}/saveAttendanceInfo`, attendance, {responseType: 'text'})
  }

  updateAttendance(attendance:any){
    console.log('i am inside update atttendance method');
    console.log(attendance.id);
    console.log(attendance);
    return this.ht.put(`${this.url}/updateAttendanceInfo/${attendance.id}`, attendance, { responseType: 'text' });
  }

  deleteAttendance(attendance:attendance){
    console.log(attendance.attendanceId);
    return this.ht.delete(`${this.url}/deleteAttendance/${attendance.attendanceId}`, {responseType: 'text'})
  }
 
}
