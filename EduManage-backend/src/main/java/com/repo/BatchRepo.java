package com.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.models.Batch;

public interface BatchRepo extends JpaRepository<Batch, Integer>{

    int countByTrainer_TrainerId(int id);
}
