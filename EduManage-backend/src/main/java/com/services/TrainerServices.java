package com.services;

import java.util.List;

import com.models.Trainer;

public interface TrainerServices {

	public String registerTrainer(Trainer a1);
	public Trainer logTrainer(String user);
	public List<Trainer> getAllTrainerInfo();
	public Trainer getOneTrainerInfo(int id);
	public void deleteTrainer(int id);
	public long getCount();}
