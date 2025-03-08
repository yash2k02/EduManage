import { Component } from '@angular/core';
import { task } from '../../models/task-model';
import { TaskServiceService } from '../../service-module/task-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-task-data-for-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-data-for-admin.component.html',
  styleUrl: './task-data-for-admin.component.css'
})
export class TaskDataForAdminComponent {
   constructor(private ts: TaskServiceService) { }
  
    successMessage: string = '';
  
    task = {
      taskName:'',
      description:'',
      dueDate:''
    };
  
  
    option: string = 'default';
    tasks: task[] = []; // trainer is now explicitly typed as an array of trainer objects
    selectedTask: task | null = null; // Object for a specific trainer
    filteredTasks: task[] = [];
  
    ngOnInit(): void {
      this.ts.getAllTasks().subscribe({
        next: (tasks: task[]) => {
          this.tasks = tasks;
          console.log(this.tasks);
          this.filteredTasks = [...this.tasks];
        },
        error: (err) => {
          console.error('Error fetching tasks', err);
        }
      });
  
  
    }
  
    addTask() {
      this.option = 'add';
  
    }
  
    onsubmit(form: NgForm): void {
      if (form.valid) {
        console.log('Form submitted successfully with data:', this.task);
        this.successMessage = 'Task created successfully!';
  
        // Clear the success message after 3 seconds (optional)
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
        this.ts.addTask(this.task).subscribe((res) => {
          console.log(res);
          form.resetForm();
        });
      }
    }
  
    searchQuery: string = '';

    filterTasks() {
      const query = this.searchQuery.toLowerCase();
      this.filteredTasks = this.tasks.filter(task =>
        task.taskName.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query) ||
        task.dueDate.toString().includes(query)
            );
    }

    uptask = {
      id:0,
      taskName:'',
      description:'',
      dueDate:''
    };

    editTask(task:task){
      this.option='edit';
      this.uptask.id=task.taskId,
      this.uptask.taskName=task.taskName;
      this.uptask.description=task.description;
      this.uptask.dueDate=task.dueDate.toString();
      console.log(this.uptask);
    }


    onUpdate(form: NgForm):void{
      if(form.valid){
        console.log('Form submitted successfully with data:', this.uptask);
        this.successMessage = 'Task updated successfully!';
        
        // Clear the success message after 3 seconds (optional)
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
        this.ts.updateTask(this.uptask).subscribe((res)=>{
          console.log(res);
          form.resetForm();
         }); 
        }
      }

      deleteTask(task:task){
        this.ts.deleteTask(task).subscribe(res=>{
          console.log(res);
        });
        this.successMessage='Deleted successfully. Please refresh the page';
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      }
  

}
