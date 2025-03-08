package com.dao;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.models.Trainer;
import com.repo.TrainerRepo;
import com.services.TrainerServices;

@Service
public class TrainerDao implements TrainerServices {

	@Autowired
	TrainerRepo tr;
	
	@Override
	public String registerTrainer(Trainer t1) {
		tr.save(t1);
		return "saved";
	}

	@Override
	public Trainer logTrainer(String user) {
		Trainer t = tr.findByUsername(user);
		return t;
	}

	@Override
	public List<Trainer> getAllTrainerInfo() {
		List<Trainer> t = tr.findAll();
		return t;
	}

	@Override
	public Trainer getOneTrainerInfo(int id) {
	    Trainer t = tr.findById(id).orElseThrow(() -> new RuntimeException("Trainer not found for ID: " + id));
	    
	    return t;
	}

	@Override
	public void deleteTrainer(int id) {
		tr.deleteById(id);		
	}

	@Override
	public long getCount() {
		return tr.count();
	}


}
