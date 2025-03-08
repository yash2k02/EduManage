package com.controllers;

import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.TokenGeneration.JwtUtil;
import com.dao.AdminDao;
import com.models.Admin;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
@RequestMapping("/admin")
public class AdminController {
	
    @Autowired
    JwtUtil jt;
    
	@Autowired
	AdminDao ad;

	// Register new admin
	@PostMapping("/saveAdminInfo")
	public ResponseEntity<String> reg(@RequestBody Admin a1) {
		System.out.println(a1);
		ad.registerAdmin(a1);
		return ResponseEntity.ok("Registered Successfully");
	}

	// Admin login
	@PostMapping("/loginAdmin")
	public Admin log(@RequestBody Map<String, String> credentials, HttpServletResponse response) {
		String username = credentials.get("username");
		String password = credentials.get("password");
		System.out.println(username);
		System.out.println(password);
		Admin a = ad.logAdmin(username);
		if (a.getUsername().equals(username) && a.getPassword().equals(password)) {
			// Generate JWT token
			String token = jt.generateToken(username); // Reuse utility class
           System.out.println(token);

			// Set JWT token in an HTTP-only cookie
			Cookie cookie = new Cookie("jwtToken", token);
			cookie.setHttpOnly(true); // Cannot be accessed by JavaScript
			cookie.setSecure(true); // Ensure it's sent over HTTPS
			cookie.setPath("/"); // Accessible throughout the application
			cookie.setMaxAge(60 * 2); // 1 hour expiry
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
	                        role = "admin";
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

}
