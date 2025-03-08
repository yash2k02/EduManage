package com.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.models.StudentTasks;

public interface StudentTasksRepo extends JpaRepository<StudentTasks, Integer> {

}
