package com.services;

import java.util.List;

import com.models.StudentTasks;

public interface StudentTasksServices {

	void registerStudentTask(StudentTasks t1);

	List<StudentTasks> getAllStudentTaskInfo();

	StudentTasks getOneStudentTaskInfo(int id);

	void deleteStudentTask(int id);

}
