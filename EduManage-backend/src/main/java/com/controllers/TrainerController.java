package com.controllers;

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
import com.models.Trainer;
import com.services.TrainerServices;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
@RequestMapping("/trainer")
public class TrainerController {

	@Autowired
	JwtUtil jt;

	@Autowired
	TrainerServices ts;

	// Register new trainer
	@PostMapping("/saveTrainerInfo")
	public ResponseEntity<String> reg(@RequestBody Trainer t1) {
		System.out.println(t1);
		ts.registerTrainer(t1);
		return ResponseEntity.ok("Registered Successfully");
	}

	// Trainer login
	@PostMapping("/loginTrainer")
	public Trainer log(@RequestBody Map<String, String> credentials, HttpServletResponse response) {
		String username = credentials.get("username");
		String password = credentials.get("password");
		System.out.println(username);
		System.out.println(password);
		Trainer a = ts.logTrainer(username);
		if (a.getUsername().equals(username) && a.getPassword().equals(password)) {
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
			return a;
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
	                        role = "trainer";
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



	// get all trainer info
	@GetMapping("/getAllTrainers")
	public List<Trainer> getinfo() {
		List<Trainer> t = ts.getAllTrainerInfo();
		return t;
	}

	// get single trainer info
	@GetMapping("/getOneTrainer/{id}")
	public Trainer getSingleinfo(@PathVariable int id) {
		Trainer t = ts.getOneTrainerInfo(id);
		return t;
	}

	// update trainer
	@PutMapping("/updateTrainerInfo/{id}")
	public ResponseEntity<String> upd(@PathVariable int id, @RequestBody Trainer t1) {
		Trainer t = ts.getOneTrainerInfo(id);
		if (t1.getName() != null)
			t.setName(t1.getName());
		if (t1.getEmail() != null)
			t.setEmail(t1.getEmail());
		if (t1.getPhone() != null)
			t.setPhone(t1.getPhone());
		if (t1.getDomain() != null)
			t.setDomain(t1.getDomain());
		if (t1.getUsername() != null)
			t.setUsername(t1.getUsername());
		if (t1.getPassword() != null)
			t.setPassword(t1.getPassword());
		ts.registerTrainer(t);
		return ResponseEntity.ok("Trainer Updated Successfully");
	}

	// delete trainer
	@DeleteMapping("/deleteTrainer/{id}")
	public ResponseEntity<String> del(@PathVariable int id) {
		ts.deleteTrainer(id);
		return ResponseEntity.ok("Trainer deleted successfully");
	}
	
	
	@GetMapping("/getCount")
	public long getTotalTrainers() {
		return ts.getCount();
	}

}
