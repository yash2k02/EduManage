package com.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.models.Student;
import com.repo.StudentRepo;
import com.services.StudentServices;

@Service
public class StudentDao implements StudentServices{

	@Autowired
	StudentRepo sr;
	
	@Override
	public String registerStudent(Student s1) {
		sr.save(s1);
		return "Student Registered successfully";
	}

	@Override
	public Student logStudent(String username) {
		Student s = sr.findByUsername(username);
		return s;
	}

	@Override
	public List<Student> getAllStudentInfo() {
		List<Student> s = sr.findAll();
		return s;
	}

	@Override
	public Student getOneStudentInfo(int id) {
		Student s = sr.findById(id).orElseThrow(()-> new RuntimeException("Student not found for ID: "+id));
		return s;
	}

	@Override
	public void deleteStudent(int id) {
		sr.deleteById(id);
		
	}

	@Override
	public long getCount() {
		return sr.count();
	}

	
}
