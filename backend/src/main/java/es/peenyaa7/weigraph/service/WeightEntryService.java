package es.peenyaa7.weigraph.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.peenyaa7.weigraph.model.WeightEntry;
import es.peenyaa7.weigraph.repository.WeightEntryRepository;

@Service
public class WeightEntryService {
    
    @Autowired
    private WeightEntryRepository repository;

    public List<WeightEntry> getAll() {
        return repository.findAll();
    }

    public void saveAll(List<WeightEntry> weightEntriesToSave) {
        repository.saveAll(weightEntriesToSave);
    }


}
