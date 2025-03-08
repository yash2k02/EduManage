package com.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.models.Task;
import com.services.TaskServices;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
@RequestMapping("/task")
public class TaskController {

	@Autowired
	TaskServices ts;
	
	@PostMapping("/createNewTask")
	public ResponseEntity<String> reg(@RequestBody Task t1){
		System.out.println(t1);
		ts.createTask(t1);
		return ResponseEntity.ok("Task Created Successfully");	
	}
	
	// get all tasks info
		@GetMapping("/getAllTasks")
		public List<Task> getinfo() {
			List<Task> t = ts.getAllTasksInfo();
			return t;
		}

		// get single task info
		@GetMapping("/getOneTask/{id}")
		public Task getSingleinfo(@PathVariable int id) {
			Task t = ts.getOneTaskInfo(id);
			return t;
		}

		// update task
		@PutMapping("/updateTaskInfo/{id}")
		public ResponseEntity<String> upd(@PathVariable int id, @RequestBody Task t1) {
			Task t = ts.getOneTaskInfo(id);
			if (t1.getTaskName() != null)
				t.setTaskName(t1.getTaskName());
			if (t1.getDescription() != null)
				t.setDescription(t1.getDescription());
			if (t1.getDueDate() != null)
				t.setDueDate(t1.getDueDate());

			ts.createTask(t);
			return ResponseEntity.ok("Task Updated Successfully");
		}

		// delete task
		@DeleteMapping("/deleteTask/{id}")
		public ResponseEntity<String> del(@PathVariable int id) {
			ts.deleteTask(id);
			return ResponseEntity.ok("Task deleted successfully");
		}
	
}
