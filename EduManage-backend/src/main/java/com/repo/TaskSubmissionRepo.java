package com.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.models.TaskSubmission;

public interface TaskSubmissionRepo extends JpaRepository<TaskSubmission, Integer> {

}
