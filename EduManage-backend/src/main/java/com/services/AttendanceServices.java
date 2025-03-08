package com.services;

import java.util.List;

import com.models.Attendance;

public interface AttendanceServices {

	void registerAttendance(Attendance t1);

	List<Attendance> getAllTaskSubmissionInfo();

	Attendance getOneAttendanceInfo(int id);

	void deleteAttendance(int id);

}
