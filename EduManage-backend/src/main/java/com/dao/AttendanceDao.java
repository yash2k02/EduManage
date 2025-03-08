package com.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.models.Attendance;
import com.repo.AttendanceRepo;
import com.services.AttendanceServices;

@Service
public class AttendanceDao implements AttendanceServices {

	@Autowired
	AttendanceRepo ar;

	@Override
	public void registerAttendance(Attendance t1) {
		ar.save(t1);
	}

	@Override
	public List<Attendance> getAllTaskSubmissionInfo() {
		List<Attendance> t= ar.findAll();
		return t;
	}

	@Override
	public Attendance getOneAttendanceInfo(int id) {
		Attendance t= ar.findById(id).orElseThrow(()-> new RuntimeException("Attendance not found for ID:"+id));
		return t;
	}

	@Override
	public void deleteAttendance(int id) {
		ar.deleteById(id);
	}
	
	
	
	
}
