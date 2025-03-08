import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TrainerServiceService } from '../../service-module/trainer-service.service';
import { Observable } from 'rxjs';
import { trainer } from '../../models/trainer-model';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-trainer-data-for-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './trainer-data-for-admin.component.html',
  styleUrl: './trainer-data-for-admin.component.css'
})

export class TrainerDataForAdminComponent implements OnInit {

  constructor(private ts:TrainerServiceService){}

  successMessage:string ='';

trainer = {
  name: '',
  email: '',
  phone: '',
  domain: '',
  username: '',
  password: '',
};

uptrainer = {
  id:0,
  name: '',
  email: '',
  phone: '',
  domain: '',
  username: '',
  password: '',
};


option: string = 'default';
trainers: trainer[] = []; // trainer is now explicitly typed as an array of trainer objects
selectedTrainer: trainer | null = null; // Object for a specific trainer
filteredTrainers: trainer[] = [];

ngOnInit(): void {
    this.ts.getAllTrainers().subscribe({
      next: (trainers:trainer[])=>{
        this.trainers=trainers;
        console.log(this.trainer);
        this.filteredTrainers = [...this.trainers];
      },
      error: (err)=>{
        console.error('Error fetching trainers', err);
      }
    });
  }

addTrainer() {
  this.option = 'add';
  this.trainer = {
    name: '',
    email: '',
    phone: '',
    domain: '',
    username: '',
    password: '',
  };
   
}

onsubmit(form: NgForm):void {
  if(form.valid){
  console.log('Form submitted successfully with data:', this.trainer);
  this.successMessage = 'Trainer registered successfully!';
  
  // Clear the success message after 3 seconds (optional)
  setTimeout(() => {
    this.successMessage = '';
  }, 3000);
  this.ts.addTrainer(this.trainer).subscribe((res)=>{
    console.log(res);
    form.resetForm();
   }); 
  }
}

searchQuery:string='';
  filterTrainers() {
    const query = this.searchQuery.toLowerCase();
    this.filteredTrainers = this.trainers.filter(trainer =>
      trainer.name.toLowerCase().includes(query) ||
      trainer.email.toLowerCase().includes(query) ||
      trainer.phone.toString().includes(query) ||
      trainer.domain.toLowerCase().includes(query)
    );
  }

  
  editTrainer(trainer:trainer){
    this.option='edit';
    this.uptrainer.id=trainer.trainerId,
    this.uptrainer.name=trainer.name;
    this.uptrainer.email=trainer.email;
    this.uptrainer.phone=trainer.phone;
    this.uptrainer.domain=trainer.domain;
    this.uptrainer.username=trainer.username;
    this.uptrainer.password=trainer.password;
    console.log(this.trainer);
  }

  onUpdate(form: NgForm):void{
    if(form.valid){
      console.log('Form submitted successfully with data:', this.trainer);
      this.successMessage = 'Trainer updated successfully!';
      
      // Clear the success message after 3 seconds (optional)
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
      this.ts.updateTrainer(this.uptrainer).subscribe((res)=>{
        console.log(res);
        form.resetForm();
       }); 
      }
  }

  deleteTrainer(trainer:trainer){
    this.ts.deleteTrainer(trainer).subscribe(res=>{
      console.log(res);
    });
    this.successMessage='Deleted successfully. Please refresh the page';
    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }

}
