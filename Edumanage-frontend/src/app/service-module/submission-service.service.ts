import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { submission } from '../models/submission-model';

@Injectable({
  providedIn: 'root'
})
export class SubmissionServiceService {

  constructor(private ht: HttpClient) { }

  url:string ='http://localhost:8080/tasksubmission';
    
      addSubmission(submission:any){
        console.log("this is service");
        console.log(submission);
        return this.ht.post(`${this.url}/saveTaskSubmissionInfo`, submission, { responseType: 'text' });
      }
    
    
      getAllSubmissions(): Observable<submission[]> {
        return this.ht.get<submission[]>(`${this.url}/getAllTaskSubmissions`);
      }
    
      getCount():Observable<object>{
        return this.ht.get(`${this.url}/getCount`);
      }
    }
