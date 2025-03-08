package com.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.models.Admin;

public interface AdminRepo extends JpaRepository<Admin, Integer>{

	public Admin findByUsername(String username);
}
