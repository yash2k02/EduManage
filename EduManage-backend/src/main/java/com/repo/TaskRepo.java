package com.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.models.Task;

public interface TaskRepo extends JpaRepository<Task, Integer>{

}
