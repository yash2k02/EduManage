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

import com.models.StudentTasks;
import com.repo.BatchRepo;
import com.services.StudentTasksServices;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
@RequestMapping("/studenttasks")
public class StudentTasksController {

	@Autowired
	BatchRepo br;
	
	@Autowired
	StudentTasksServices ss;
	
	// Add new student task
		@PostMapping("/saveStudentTaskInfo")
		public ResponseEntity<String> reg(@RequestBody StudentTasks t1) {		
			System.out.println(t1);
			ss.registerStudentTask(t1);
			return ResponseEntity.ok("Registered Successfully");
		}

		// get all student tasks info
		@GetMapping("/getAllStudentTasks")
		public List<StudentTasks> getinfo() {
			List<StudentTasks> t = ss.getAllStudentTaskInfo();
			return t;
		}

		// get single student task info
		@GetMapping("/getOneStudentTask/{id}")
		public StudentTasks getSingleinfo(@PathVariable int id) {
			StudentTasks t = ss.getOneStudentTaskInfo(id);
			return t;
		}

		// update student task
		@PutMapping("/updateStudentTaskInfo/{id}")
		public ResponseEntity<String> upd(@PathVariable int id,@RequestBody StudentTasks t1) {
			StudentTasks t = ss.getOneStudentTaskInfo(id);
			if(t1.getStudent() != null) t.setStudent(t1.getStudent());
			if(t1.getBatch() != null) t.setBatch(t1.getBatch());
			if(t1.getTask() != null) t.setTask(t1.getTask());
			if(t1.getTrainer() != null) t.setTrainer(t1.getTrainer());
			if(t1.getGrade() != null) t.setGrade(t1.getGrade());
			ss.registerStudentTask(t);
			return ResponseEntity.ok("Student Task Updated Successfully");
		}
		
		// delete student task
		@DeleteMapping("/deleteStudentTask/{id}")
		public ResponseEntity<String> del(@PathVariable int id){
			ss.deleteStudentTask(id);
			return ResponseEntity.ok("Student Task deleted successfully");
		}

}
