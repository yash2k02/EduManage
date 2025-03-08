package com.controllers;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.models.Batch;
import com.services.BatchServices;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
@RequestMapping("/batch")
public class BatchController {

	@Autowired
	BatchServices bs;

	// Create new batch
	@PostMapping("/createNewBatch")
	public ResponseEntity<String> reg(@RequestBody Batch b1) {
		String dt = b1.getEndDate();
		if (dt == null || dt.trim().isEmpty()) { 
		    b1.setEndDate("not alloted");
		}

		System.out.println(b1);
		bs.createBatch(b1);
		return ResponseEntity.ok("Batch Created Successfully");
	}

	// get all batch info
	@GetMapping("/getAllBatches")
	public List<Batch> getinfo() {
		List<Batch> t = bs.getAllBatchesInfo();
		return t;
	}

	// get single batch info
	@GetMapping("/getOneBatch/{id}")
	public Batch getSingleinfo(@PathVariable int id) {
		Batch t = bs.getOneBatchInfo(id);
		return t;
	}
	
	@GetMapping("/getBatchesByTid/{id}")
	public int getBatchesByTid(@PathVariable int id)
	{
		int batchCount = bs.getTrainerBatches(id);
		System.out.println(batchCount);
		return batchCount;
	}

	// update batch
	@PutMapping("/updateBatchInfo/{id}")
	public ResponseEntity<String> upd(@PathVariable int id, @RequestBody Batch t1) {
		Batch t = bs.getOneBatchInfo(id);
		if (t1.getBatchName() != null)
			t.setBatchName(t1.getBatchName());
		if (t1.getBatchTime() != null)
			t.setBatchTime(t1.getBatchTime());
		if (t1.getStartDate() != null)
			t.setStartDate(t1.getStartDate());
		if (t1.getEndDate() != null)
			t.setEndDate(t1.getEndDate());
		if (t1.getTrainer() != null)
			t.setTrainer(t1.getTrainer());

		bs.createBatch(t);
		return ResponseEntity.ok("Batch Updated Successfully");
	}

	// delete batch
	@DeleteMapping("/deleteBatch/{id}")
	public ResponseEntity<String> del(@PathVariable int id) {
		bs.deleteBatch(id);
		return ResponseEntity.ok("Batch deleted successfully");
	}

}
