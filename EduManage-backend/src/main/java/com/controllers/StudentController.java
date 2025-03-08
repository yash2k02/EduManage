package com.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import com.TokenGeneration.JwtUtil;
import com.models.Batch;
import com.models.Student;
import com.repo.BatchRepo;
import com.services.BatchServices;
import com.services.StudentServices;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
@RequestMapping("/student")
public class StudentController {

	@Autowired
	JwtUtil jt;

	@Autowired
	StudentServices ss;
	
	@Autowired
	BatchRepo br;
	
	// Register new student
	@PostMapping("/saveStudentInfo")
	public ResponseEntity<String> reg(@RequestBody Student s1) {
//	    Batch batch = br.findById(s1.getBatch().getBatchId()).orElse(null);
//	    s1.setBatch(batch);
		System.out.println((Student)s1);
		ss.registerStudent(s1);
		return ResponseEntity.ok("Registered Successfully");
	}

	// student login
	@PostMapping("/loginStudent")
	public Student log(@RequestBody Map<String, String> credentials, HttpServletResponse response) {
		String username = credentials.get("username");
		String password = credentials.get("password");
		System.out.println(username);
		System.out.println(password);
		Student s = ss.logStudent(username);
		if (s.getUsername().equals(username) && s.getPassword().equals(password)) {
			// Generate JWT token
			String token = jt.generateToken(username); // Reuse utility class
			System.out.println(token);

			// Set JWT token in an HTTP-only cookie
			Cookie cookie = new Cookie("jwtToken", token);
			cookie.setHttpOnly(true); // Cannot be accessed by JavaScript
			cookie.setSecure(true); // Ensure it's sent over HTTPS
			cookie.setPath("/"); // Accessible throughout the application
			cookie.setMaxAge(60 * 60); // 1 hour expiry
			response.addCookie(cookie);
			return s;
		}
		return null;
	}
	
	@PostMapping("/logout")
	public ResponseEntity<String> logout(HttpServletResponse response) {
	    // Create an empty JWT cookie with an expired date
	    Cookie cookie = new Cookie("jwtToken", null);
	    cookie.setHttpOnly(true);
	    cookie.setSecure(true); // If using HTTPS
	    cookie.setPath("/"); // Accessible throughout the application
	    cookie.setMaxAge(0); // Expire the cookie immediately
	    response.addCookie(cookie); // Add the expired cookie to the response
	    
	    return ResponseEntity.ok("Logged out successfully");

	}
	
	
	@GetMapping("/checkAuth")
	public ResponseEntity<Map<String, Object>> checkAuth(HttpServletRequest request) {
	    Cookie[] cookies = request.getCookies();
	    boolean authenticated = false;
	    String role = "";

	    if (cookies != null) {
	        for (Cookie cookie : cookies) {
	            if ("jwtToken".equals(cookie.getName())) {
	                String token = cookie.getValue();
	                try {
	                    if (jt.validateToken(token)) {
	                        authenticated = true;
	                        role = "student";
	                    }
	                } catch (RuntimeException e) {
	                    // Handle token validation failure
	                    authenticated = false;
	                    role = "";
	                }
	            }
	        }
	    }

	    return ResponseEntity.ok(Map.of("authenticated", authenticated, "role", role));
	}

	// get all student info
	@GetMapping("/getAllStudents")
	public List<Student> getinfo() {
		List<Student> t = ss.getAllStudentInfo();
		return t;
	}

	// get single student info
	@GetMapping("/getOneStudent/{id}")
	public Student getSingleinfo(@PathVariable int id) {
		Student t = ss.getOneStudentInfo(id);
		return t;
	}

	// update student
	@PutMapping("/updateStudentInfo/{id}")
	public ResponseEntity<String> upd(@PathVariable int id, @RequestBody Student t1) {
		Student t = ss.getOneStudentInfo(id);
		if (t1.getName() != null)
			t.setName(t1.getName());
		if (t1.getEmail() != null)
			t.setEmail(t1.getEmail());
		if (t1.getBatch() != null)
			t.setBatch(t1.getBatch());
		if (t1.getUsername() != null)
			t.setUsername(t1.getUsername());
		if (t1.getPassword() != null)
			t.setPassword(t1.getPassword());
		ss.registerStudent(t);
		return ResponseEntity.ok("Student Updated Successfully");
	}

	// delete student
	@DeleteMapping("/deleteStudent/{id}")
	public ResponseEntity<String> del(@PathVariable int id) {
		ss.deleteStudent(id);
		return ResponseEntity.ok("Student deleted successfully");
	}
	
	//get students count
	@GetMapping("/getCount")
	public long getTotalStudents() {
		return ss.getCount();
	}

}
