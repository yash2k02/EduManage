package com.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
//@JsonIgnoreProperties({"student", "batch", "task", "trainer"})  // Ignore unnecessary fields
public class StudentTasks {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id; // Primary Key for the join entity

	@ManyToOne
	@JoinColumn(name = "student_id", nullable = false) // Foreign Key for Student
	@JsonIgnoreProperties({"email", "batch", "email", "username", "password"})
	private Student student;

	@ManyToOne
	@JoinColumn(name = "batch_id", nullable = false) // Foreign Key for Student
	@JsonIgnoreProperties({"students","batchTime", "startDate", "endDate","trainer"})
	private Batch batch;

	@ManyToOne
	@JoinColumn(name = "task_id", nullable = false) // Foreign Key for Task
	@JsonIgnoreProperties({"dueDate"})
	private Task task;

	@ManyToOne
	@JoinColumn(name = "trainer_id", nullable = false) // Foreign Key for Trainer
	@JsonIgnoreProperties({"batches","email", "phone", "domain", "username", "password"})
	private Trainer trainer; // Trainer who assigned the task

	private String grade; // Optional grade or status for the task

	// Getters and Setters

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Student getStudent() {
		return student;
	}

	public void setStudent(Student student) {
		this.student = student;
	}

	public Batch getBatch() {
		return batch;
	}

	public void setBatch(Batch batch) {
		this.batch = batch;
	}

	public Task getTask() {
		return task;
	}

	public void setTask(Task task) {
		this.task = task;
	}

	public Trainer getTrainer() {
		return trainer;
	}

	public void setTrainer(Trainer trainer) {
		this.trainer = trainer;
	}

	public String getGrade() {
		return grade;
	}

	public void setGrade(String grade) {
		this.grade = grade;
	}

}
