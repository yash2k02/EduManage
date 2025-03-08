package com.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.models.StudentTasks;
import com.repo.StudentTasksRepo;
import com.services.StudentTasksServices;

@Service
public class StudentTasksDao implements StudentTasksServices {

	@Autowired
	StudentTasksRepo sr;
	
	@Override
	public void registerStudentTask(StudentTasks t1) {
		sr.save(t1);
		
	}

	@Override
	public List<StudentTasks> getAllStudentTaskInfo() {
		List<StudentTasks> st = sr.findAll();
		return st;
	}

	@Override
	public StudentTasks getOneStudentTaskInfo(int id) {
		StudentTasks st = sr.findById(id).orElseThrow(()-> new RuntimeException("Student Task not found for ID: "+id));
		return st;
	}

	@Override
	public void deleteStudentTask(int id) {
		sr.deleteById(id);
		
	}

}
