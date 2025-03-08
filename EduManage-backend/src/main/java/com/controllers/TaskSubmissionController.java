package com.controllers;

import java.time.LocalDate;
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

import com.models.TaskSubmission;
import com.services.TaskSubmissionServices;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
@RequestMapping("/tasksubmission")
public class TaskSubmissionController {

	@Autowired
	TaskSubmissionServices ts;
	
	// Add new Task Submission
	@PostMapping("/saveTaskSubmissionInfo")
	public ResponseEntity<String> reg(@RequestBody TaskSubmission t1) {
		t1.setSubmissionDate(LocalDate.now());
		System.out.println(t1);
		ts.registerTaskSubmission(t1);
		return ResponseEntity.ok("Registered Successfully");
	}

	// get all Task Submission info
	@GetMapping("/getAllTaskSubmissions")
	public List<TaskSubmission> getinfo() {
		List<TaskSubmission> t = ts.getAllTaskSubmissionInfo();
		return t;
	}

	// get single Task Submission info
	@GetMapping("/getOneTaskSubmission/{id}")
	public TaskSubmission getSingleinfo(@PathVariable int id) {
		TaskSubmission t = ts.getOneTaskSubmissionInfo(id);
		return t;
	}

	// update Task Submission
	@PutMapping("/updateTaskSubmissionInfo/{id}")
	public ResponseEntity<String> upd(@PathVariable int id, @RequestBody TaskSubmission t1) {
		TaskSubmission t = ts.getOneTaskSubmissionInfo(id);
		if (t1.getStudent() != null)
			t.setStudent(t1.getStudent());
		if (t1.getTask() != null)
			t.setTask(t1.getTask());
		if (t1.getSubmissionDate() != null)
			t.setSubmissionDate(t1.getSubmissionDate());
		if (t1.getCode() != null)
			t.setCode(t1.getCode());
		if (t1.getFeedback() != null)
			t.setFeedback(t1.getFeedback());
		ts.registerTaskSubmission(t);
		return ResponseEntity.ok("Task Submission Updated Successfully");
	}

	// delete Task Submission
	@DeleteMapping("/deleteTaskSubmission/{id}")
	public ResponseEntity<String> del(@PathVariable int id) {
		ts.deleteTaskSubmission(id);
		return ResponseEntity.ok("Task Submission deleted successfully");
	}
}
