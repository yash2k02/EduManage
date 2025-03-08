package com.dao;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.models.Admin;
import com.repo.AdminRepo;
import com.services.AdminServices;

@Service
public class AdminDao implements AdminServices{

	@Autowired
	AdminRepo ar;
	@Override
	public String registerAdmin(Admin a1) {
		ar.save(a1);
		return "saved";
	}
	@Override
	public Admin logAdmin(String user) {
		Admin a = ar.findByUsername(user);
		return a;
	}
	

}
