import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { trainer } from '../models/trainer-model';
import { student } from '../models/student-model';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private ht: HttpClient) { }

   baseUrl:string = "http://localhost:8080";

  login(role: string, username: string, password: string):Observable<trainer | student> {
    const body = { username, password };
    const url = `${this.baseUrl}/${role}/login${role.charAt(0).toUpperCase() + role.slice(1)}`; // Dynamic URL
    return this.ht.post<trainer | student> (url, body, { withCredentials:true });
  }

  logout(role:string):Observable<string> {
    const url = `${this.baseUrl}/${role}/logout`
    return this.ht.post(url,{}, { responseType: 'text' })

  }


  checkAuth(role: string): Observable<{ authenticated: boolean; role: string }> {
    const url = `${this.baseUrl}/${role}/checkAuth`;
    return this.ht.get<{ authenticated: boolean; role: string }>(url, { withCredentials: true });
  }
  
}
