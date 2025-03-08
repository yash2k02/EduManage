package com.models;

import java.time.LocalDate;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
//@JsonIgnoreProperties({"student", "batch"})  // Ignore unnecessary fields
public class Attendance {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int attendanceId;

	@ManyToOne
	@JsonIgnoreProperties({"phone","email","username", "password", "batch"})
	@JoinColumn(name = "student_id", referencedColumnName = "studentId")
	private Student student;

	@ManyToOne
	@JsonIgnoreProperties({"batchTime","startDate", "endDate"})
	@JoinColumn(name = "batch_id", referencedColumnName = "batchId")
	private Batch batch;

	@Column(nullable = false)
	private LocalDate date;

	@Column(nullable = false, length = 7)
	private String status;

	public Batch getBatch() {
		return batch;
	}

	public void setBatch(Batch batch) {
		this.batch = batch;
	}

	// Getters and Setters
	public int getAttendanceId() {
		return attendanceId;
	}

	public void setAttendanceId(int attendanceId) {
		this.attendanceId = attendanceId;
	}

	public Student getStudent() {
		return student;
	}

	public void setStudent(Student student) {
		this.student = student;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
}
