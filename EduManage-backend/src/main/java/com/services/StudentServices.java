package com.services;

import java.util.List;

import com.models.Student;

public interface StudentServices {

	public String registerStudent(Student s1);
	public Student logStudent(String username);
	public List<Student> getAllStudentInfo();
	public Student getOneStudentInfo(int id);
	public void deleteStudent(int id);
	public long getCount();
}
