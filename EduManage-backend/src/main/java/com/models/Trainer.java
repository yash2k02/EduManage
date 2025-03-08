package com.models;

import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({"studentTask"})
public class Trainer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int trainerId;

	@Column(nullable = false, length = 100)
	private String name;

	@Column(nullable = false, unique = true, length = 255)
	private String email;

	@Column(nullable = true, length = 15)
	private String phone;

	@Column(nullable = false, length = 50)
	private String domain;

	@Column(nullable = false, unique = true, length = 100)
	private String username;

	@Column(nullable = false, length = 255)
	private String password;

	// Relationships
	@OneToMany(mappedBy = "trainer", fetch = FetchType.EAGER) // to check which trainer is associated with which batch(seen in batch table)
	@JsonIgnoreProperties({"trainer","studentTask", "attendances"})
	private List<Batch> batches;

	@OneToMany(mappedBy = "trainer") // to check which trainer has assigned the student the task
	private List<StudentTasks> studentTask;

	// Getters and Setters

	public String getDomain() {
		return domain;
	}

	public void setDomain(String domain) {
		this.domain = domain;
	}

	public List<StudentTasks> getStudentTask() {
		return studentTask;
	}

	public void setStudentTask(List<StudentTasks> studentTask) {
		this.studentTask = studentTask;
	}

	public List<Batch> getBatches() {
		return batches;
	}

	public void setBatches(List<Batch> batches) {
		this.batches = batches;
	}

	public int getTrainerId() {
		return trainerId;
	}

	public void setTrainerId(int trainerId) {
		this.trainerId = trainerId;
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

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
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

	public void setPassword(String password) {
		this.password = password;
	}
}
