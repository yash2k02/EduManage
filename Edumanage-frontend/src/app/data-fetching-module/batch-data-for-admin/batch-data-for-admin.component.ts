import { Component } from '@angular/core';
import { batch } from '../../models/batch-model';
import { BatchServiceService } from '../../service-module/batch-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-batch-data-for-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './batch-data-for-admin.component.html',
  styleUrl: './batch-data-for-admin.component.css'
})
export class BatchDataForAdminComponent {

  constructor(private bs: BatchServiceService) { }

  successMessage: string = '';

  batch = {
    batchName: '',
    batchTime: '',
    startDate:'',
    endDate:'',
    trainer:{
      trainerId:0
    }
  };


  option: string = 'default';
  batches: batch[] = []; // trainer is now explicitly typed as an array of trainer objects
  selectedTrainer: batch | null = null; // Object for a specific trainer
  filteredBatches: batch[] = [];

  ngOnInit(): void {
    this.bs.getAllBatches().subscribe({
      next: (batches: batch[]) => {
        this.batches = batches;
        console.log(this.batch);
        this.filteredBatches = [...this.batches];
      },
      error: (err) => {
        console.error('Error fetching batches', err);
      }
    });


  }

  addBatch() {
    this.option = 'add';

  }

  onsubmit(form: NgForm): void {
    if (form.valid) {
      console.log('Form submitted successfully with data:', this.batch);
      this.successMessage = 'Batch created successfully!';

      // Clear the success message after 3 seconds (optional)
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
      this.bs.addBatch(this.batch).subscribe((res) => {
        console.log(res);
        form.resetForm();
      });
    }
  }

  searchQuery: string = '';
  filterBatches() {
    const query = this.searchQuery.toLowerCase();
    this.filteredBatches = this.batches.filter(batch =>
      batch.batchName.toLowerCase().includes(query) ||
      batch.batchTime.toLowerCase().includes(query) ||
      batch.startDate.includes(query) ||
      batch.trainer.name.includes(query)
    );
  }


  upbatch = {
    id:0,
    batchName: '',
    batchTime: '',
    startDate:'',
    endDate:'',
    trainer:{
      trainerId:0
    }
  };

  editBatch(batch:batch){
    this.option='edit';
    this.upbatch.id=batch.batchId,
    this.upbatch.batchName=batch.batchName;
    this.upbatch.batchTime=batch.batchTime;
    this.upbatch.startDate=batch.startDate;
    this.upbatch.endDate=batch.endDate || '';
    this.upbatch.trainer.trainerId=batch.trainer.trainerId;
    console.log(this.batch);
  }

  onUpdate(form: NgForm):void{
    if(form.valid){
      console.log('Form submitted successfully with data:', this.upbatch);
      this.successMessage = 'Batch updated successfully!';
      
      // Clear the success message after 3 seconds (optional)
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
      this.bs.updateBatch(this.upbatch).subscribe((res)=>{
        console.log(res);
        form.resetForm();
       }); 
      }
    }

    deleteBatch(batch:batch){
      this.bs.deleteBatch(batch).subscribe(res=>{
        console.log(res);
      });
      this.successMessage='Deleted successfully. Please refresh the page';
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    }

}
