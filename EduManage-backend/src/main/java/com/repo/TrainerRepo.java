package com.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.models.Trainer;


public interface TrainerRepo extends JpaRepository<Trainer,Integer> {

	public Trainer findByUsername(String user);
}
