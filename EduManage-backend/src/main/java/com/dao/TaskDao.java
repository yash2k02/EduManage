package com.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.models.Task;
import com.repo.TaskRepo;
import com.services.TaskServices;

@Service
public class TaskDao implements TaskServices {

	@Autowired
	TaskRepo tr;
	
	@Override
	public String createTask(Task t1) {
		tr.save(t1);
		return "done";
	}

	@Override
	public List<Task> getAllTasksInfo() {
		List<Task> t = tr.findAll();
		return t;
	}

	@Override
	public Task getOneTaskInfo(int id) {
		Task t = tr.findById(id).orElseThrow(() -> new RuntimeException("Task not found for ID: " + id));
		return t;
	}

	@Override
	public void deleteTask(int id) {
		tr.deleteById(id);		
		
	}


}
