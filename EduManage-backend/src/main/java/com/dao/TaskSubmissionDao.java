package com.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.models.TaskSubmission;
import com.repo.TaskSubmissionRepo;
import com.services.TaskSubmissionServices;

@Service
public class TaskSubmissionDao implements TaskSubmissionServices {

	@Autowired
	TaskSubmissionRepo tr;
	
	@Override
	public void registerTaskSubmission(TaskSubmission t1) {
		tr.save(t1);		
	}

	@Override
	public List<TaskSubmission> getAllTaskSubmissionInfo() {
		List<TaskSubmission> t = tr.findAll();
		return t;
	}

	@Override
	public TaskSubmission getOneTaskSubmissionInfo(int id) {
		TaskSubmission t = tr.findById(id).orElseThrow(()-> new RuntimeException("Task submission not found for ID :"+id));
		return t;
	}

	@Override
	public void deleteTaskSubmission(int id) {
		tr.deleteById(id);
	}

}
