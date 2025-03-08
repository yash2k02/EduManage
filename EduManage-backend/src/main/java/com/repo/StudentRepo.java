package com.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.models.Student;


public interface StudentRepo extends JpaRepository<Student, Integer>{

	public Student findByUsername(String username);
}
