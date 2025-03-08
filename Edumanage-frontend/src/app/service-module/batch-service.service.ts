import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { batch } from '../models/batch-model';

@Injectable({
  providedIn: 'root'
})
export class BatchServiceService {

  constructor(private ht: HttpClient) { }
  
    url:string ='http://localhost:8080/batch';
  
    addBatch(batch:any){
      console.log("this is service");
      console.log(batch);
      return this.ht.post(`${this.url}/createNewBatch`, batch, { responseType: 'text' });
    }

    updateBatch(batch:any){
      console.log(batch);
      return this.ht.put(`${this.url}/updateBatchInfo/${batch.id}`, batch, { responseType: 'text' });
    }

    deleteBatch(batch:batch){
      console.log(batch.batchId);
      return this.ht.delete(`${this.url}/deleteBatch/${batch.batchId}`, {responseType: 'text'})
    }
  
  
    getAllBatches(): Observable<batch[]> {
      return this.ht.get<batch[]>(`${this.url}/getAllBatches`);
    }

    getBatchesByTid(id: number): Observable<number> {
      return this.ht.get<number>(`${this.url}/getBatchesByTid/${id}`);
    }
  
    getCount():Observable<object>{
      return this.ht.get(`${this.url}/getCount`);
    }
  }
