package com.models;

import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({"taskSubmissions", "attendances", "studentTasks"})  // Ignore unnecessary fields
public class Student {

	@Override
	public String toString() {
		return "Student [studentId=" + studentId + ", name=" + name + ", email=" + email + ", phone=" + phone
				+ ", batch=" + batch + ", username=" + username + ", password=" + password + ", studentTasks="
				+ studentTasks + ", attendances=" + attendances + ", taskSubmissions=" + taskSubmissions + "]";
	}


	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int studentId;

	@Column(nullable = false, length = 100)
	private String name;

	@Column(nullable = false, unique = true, length = 255)
	private String email;
	
	@Column(nullable = false, length = 10)
	private String phone;

	@ManyToOne
	@JoinColumn(name = "batch_id", referencedColumnName = "batchId") // relationship column
	@JsonIgnoreProperties({"students"})
	private Batch batch;
	
	
	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}


	@Column(nullable = false, unique = true, length = 100)
	private String username;

	@Column(nullable = false, length = 255)
	private String password;

	// Relationships
	@OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
	private List<StudentTasks> studentTasks;

	@OneToMany(mappedBy = "student")
	private List<Attendance> attendances;

	@OneToMany(mappedBy = "student")
	private List<TaskSubmission> taskSubmissions;

	// Getters and Setters
	public int getStudentId() {
		return studentId;
	}

	public void setStudentId(int studentId) {
		this.studentId = studentId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Batch getBatch() {
		return batch;
	}

	public void setBatch(Batch batch) {
		this.batch = batch;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public List<StudentTasks> getStudentTasks() {
		return studentTasks;
	}

	public void setStudentTasks(List<StudentTasks> studentTasks) {
		this.studentTasks = studentTasks;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public List<Attendance> getAttendances() {
		return attendances;
	}

	public void setAttendances(List<Attendance> attendances) {
		this.attendances = attendances;
	}

	public List<TaskSubmission> getTaskSubmissions() {
		return taskSubmissions;
	}

	public void setTaskSubmissions(List<TaskSubmission> taskSubmissions) {
		this.taskSubmissions = taskSubmissions;
	}
}
