package com.services;

import java.util.List;

import com.models.Batch;

public interface BatchServices {

	public String createBatch(Batch b1);

	public List<Batch> getAllBatchesInfo();

	public Batch getOneBatchInfo(int id);

	public void deleteBatch(int id);

	public int getTrainerBatches(int id);

}
