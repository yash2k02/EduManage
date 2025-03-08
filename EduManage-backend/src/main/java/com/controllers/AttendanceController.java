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

import com.models.Attendance;
import com.services.AttendanceServices;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
@RequestMapping("/attendance")
class AttendanceController {
	
	@Autowired
	AttendanceServices as;

	// Add new attendance
		@PostMapping("/saveAttendanceInfo")
		public ResponseEntity<String> reg(@RequestBody Attendance t1) {
			System.out.println(t1);
			as.registerAttendance(t1);
			return ResponseEntity.ok("Added Successfully");
		}

		// get all attendance info
		@GetMapping("/getAllAttendances")
		public List<Attendance> getinfo() {
			List<Attendance> t = as.getAllTaskSubmissionInfo();
			return t;
		}

		// get single attendance info
		@GetMapping("/getOneAttendance/{id}")
		public Attendance getSingleinfo(@PathVariable int id) {
			Attendance t = as.getOneAttendanceInfo(id);
			return t;
		}

		// update attendance
		@PutMapping("/updateAttendanceInfo/{id}")
		public ResponseEntity<String> upd(@PathVariable int id, @RequestBody Attendance t1) {
			Attendance t = as.getOneAttendanceInfo(id);
			if (t1.getStudent() != null)
				t.setStudent(t1.getStudent());
			if (t1.getBatch() != null)
				t.setBatch(t1.getBatch());
			if (t1.getDate() != null)
				t.setDate(t1.getDate());
			if (t1.getStatus() != null)
				t.setStatus(t1.getStatus());
			
			as.registerAttendance(t);
			return ResponseEntity.ok("Attendance Updated Successfully");
		}

		// delete attendance
		@DeleteMapping("/deleteAttendance/{id}")
		public ResponseEntity<String> del(@PathVariable int id) {
			as.deleteAttendance(id);
			return ResponseEntity.ok("Attendance deleted successfully");
		}
}
