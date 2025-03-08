import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { trainer } from '../models/trainer-model';

@Injectable({
  providedIn: 'root'
})
export class TrainerServiceService {

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

  url:string ='http://localhost:8080/trainer';

  addTrainer(trainer:any){
    console.log("this is service");
    console.log(trainer);
    return this.ht.post(`${this.url}/saveTrainerInfo`, trainer, { responseType: 'text' });
  }

  updateTrainer(trainer:any){
    console.log(trainer);
    return this.ht.put(`${this.url}/updateTrainerInfo/${trainer.id}`, trainer, { responseType: 'text' });
  }

  deleteTrainer(trainer:trainer){
    return this.ht.delete(`${this.url}/deleteTrainer/${trainer.trainerId}`, {responseType: 'text'})
  }


  getAllTrainers(): Observable<trainer[]> {
    return this.ht.get<trainer[]>(`${this.url}/getAllTrainers`);
  }

  getTrainerById(id:number): Observable<trainer> {
    return this.ht.get<trainer>(`${this.url}/getOneTrainer/${id}`);
  }

  getCount():Observable<object>{
    return this.ht.get(`${this.url}/getCount`);
  }
}
