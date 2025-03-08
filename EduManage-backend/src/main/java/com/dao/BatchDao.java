package com.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.models.Batch;
import com.repo.BatchRepo;
import com.services.BatchServices;

@Service
public class BatchDao implements BatchServices {

	@Autowired
	BatchRepo br;
	
	@Override
	public String createBatch(Batch b1) {
		br.save(b1);
		return "done";
	}

	@Override
	public List<Batch> getAllBatchesInfo() {
		List<Batch> b = br.findAll();
		return b;
	}

	@Override
	public Batch getOneBatchInfo(int id) {
		Batch b = br.findById(id).orElseThrow(() -> new RuntimeException("Batch not found for ID: " + id));
		return b;
	}

	@Override
	public void deleteBatch(int id) {
		br.deleteById(id);		
	}

	@Override
	public int getTrainerBatches(int id) {
		int count = br.countByTrainer_TrainerId(id);
		return count;
	}

}
