package com.models;

import java.time.LocalDate;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
//@JsonIgnoreProperties({"student", "task"})  // Ignore unnecessary fields
public class TaskSubmission {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int submissionId;

	@ManyToOne
	@JoinColumn(name = "student_id", referencedColumnName = "studentId")
    @JsonIgnoreProperties({"batch.batchTime", "batch.startDate", "batch.endDate", "email", "phone", "username", "password"}) // Ignore specific nested properties
	private Student student;

	@ManyToOne
	@JoinColumn(name = "task_id", referencedColumnName = "taskId")
	private Task task;

	@Column(nullable = false)
	private LocalDate submissionDate;

	@Column(nullable = false, columnDefinition = "TEXT")
	private String code;

	@Column(nullable = true, length = 255)
	private String feedback;

	// Getters and Setters
	public int getSubmissionId() {
		return submissionId;
	}

	public void setSubmissionId(int submissionId) {
		this.submissionId = submissionId;
	}

	public Student getStudent() {
		return student;
	}

	public void setStudent(Student student) {
		this.student = student;
	}

	public Task getTask() {
		return task;
	}

	public void setTask(Task task) {
		this.task = task;
	}

	public LocalDate getSubmissionDate() {
		return submissionDate;
	}

	public void setSubmissionDate(LocalDate submissionDate) {
		this.submissionDate = submissionDate;
	}

	public String getFeedback() {
		return feedback;
	}

	public void setFeedback(String feedback) {
		this.feedback = feedback;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}
}
