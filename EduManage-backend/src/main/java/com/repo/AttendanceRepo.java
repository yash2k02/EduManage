package com.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.models.Attendance;

public interface AttendanceRepo extends JpaRepository<Attendance, Integer> {

}
