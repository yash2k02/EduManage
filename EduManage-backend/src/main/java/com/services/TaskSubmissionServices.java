package com.services;

import java.util.List;

import com.models.TaskSubmission;

public interface TaskSubmissionServices {

	void registerTaskSubmission(TaskSubmission t1);

	List<TaskSubmission> getAllTaskSubmissionInfo();

	TaskSubmission getOneTaskSubmissionInfo(int id);

	void deleteTaskSubmission(int id);

}
