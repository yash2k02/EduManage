package com.models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.Column;

@Entity
@JsonIgnoreProperties({"attendances", "studentTask"})  // Ignore unnecessary fields

public class Batch {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int batchId;

	@Column(nullable = false, length = 100)
	private String batchName;

	@Column(nullable = false, length = 20)
	private String batchTime;

	@Column(nullable = false)
	private String startDate;

	@Column(nullable = true)
	private String endDate;

	// Relationships
	@ManyToOne
	@JoinColumn(name = "trainer_id", referencedColumnName = "trainerId") // column
//	@JsonIgnoreProperties({"email", "phone", "domain", "username", "password", "batches", "studentTask"})
    @JsonIgnoreProperties({"batches", "studentTask"}) // Avoid recursion
	private Trainer trainer;

	// reference column relationships
	@OneToMany(mappedBy = "batch")
	private List<Student> students;

	@OneToMany(mappedBy = "batch")
	private List<StudentTasks> studentTask;

	@OneToMany(mappedBy = "batch")
	private List<Attendance> attendances;

	// Getters and Setters

	public String getBatchTime() {
		return batchTime;
	}

	public List<StudentTasks> getStudentTask() {
		return studentTask;
	}

	public void setStudentTask(List<StudentTasks> studentTask) {
		this.studentTask = studentTask;
	}

	public void setBatchTime(String batchTime) {
		this.batchTime = batchTime;
	}

	public Trainer getTrainer() {
		return trainer;
	}

	public void setTrainer(Trainer trainer) {
		this.trainer = trainer;
	}

	public List<Student> getStudents() {
		return students;
	}

	public void setStudents(List<Student> students) {
		this.students = students;
	}

	public List<Attendance> getAttendances() {
		return attendances;
	}

	public void setAttendances(List<Attendance> attendances) {
		this.attendances = attendances;
	}

	public int getBatchId() {
		return batchId;
	}

	public void setBatchId(int batchId) {
		this.batchId = batchId;
	}

	public String getBatchName() {
		return batchName;
	}

	public void setBatchName(String batchName) {
		this.batchName = batchName;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
}
