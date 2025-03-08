 package com.models;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({"taskSubmissions", "studentTask"})  // Ignore unnecessary fields
public class Task {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int taskId;

	@Column(nullable = false, length = 255)
	private String taskName;

	@Column(nullable = true, columnDefinition = "TEXT")
	private String description;

	@Column(nullable = false, length = 255)
	private LocalDate dueDate;

	// Relationships
	@OneToMany(mappedBy = "task")
	private List<TaskSubmission> taskSubmissions;

	@OneToMany(mappedBy = "task")
	private List<StudentTasks> studentTask;

	// Getters and Setters
	public int getTaskId() {
		return taskId;
	}

	public void setTaskId(int taskId) {
		this.taskId = taskId;
	}

	public LocalDate getDueDate() {
		return dueDate;
	}

	public void setDueDate(LocalDate dueDate) {
		this.dueDate = dueDate;
	}

	public List<TaskSubmission> getTaskSubmissions() {
		return taskSubmissions;
	}

	public void setTaskSubmissions(List<TaskSubmission> taskSubmissions) {
		this.taskSubmissions = taskSubmissions;
	}

	public String getTaskName() {
		return taskName;
	}

	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<StudentTasks> getStudentTask() {
		return studentTask;
	}

	public void setStudentTask(List<StudentTasks> studentTask) {
		this.studentTask = studentTask;
	}
}
