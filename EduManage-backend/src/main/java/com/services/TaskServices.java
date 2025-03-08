package com.services;

import java.util.List;

import com.models.Task;

public interface TaskServices {

	public String createTask(Task t1);

	public List<Task> getAllTasksInfo();

	public Task getOneTaskInfo(int id);

	public void deleteTask(int id);

}
