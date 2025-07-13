package es.peenyaa7.weigraph.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.peenyaa7.weigraph.model.User;
import es.peenyaa7.weigraph.model.WeightEntry;
import es.peenyaa7.weigraph.repository.WeightEntryRepository;
import jakarta.transaction.Transactional;

@Service
public class WeightEntryService {
    
    @Autowired
    private WeightEntryRepository repository;

    @Autowired
    private UserService userService;

    public List<WeightEntry> getAll() {
        return repository.findAll();
    }

    public WeightEntry createOrUpdate(WeightEntry weightEntry) {
        weightEntry.setUser(userService.getCurrentAuthenticatedUser());
        // TODO: Modify if exists (currently dont work)
        return repository.save(weightEntry);
    }

    public List<WeightEntry> saveAll(List<WeightEntry> weightEntriesToSave) {
        User currentUser = userService.getCurrentAuthenticatedUser();
        weightEntriesToSave.forEach(w -> w.setUser(currentUser));
        return repository.saveAll(weightEntriesToSave);
    }

    @Transactional
    public void removeByDate(LocalDate date) {
        User currenUser = userService.getCurrentAuthenticatedUser();
        repository.deleteByDateAndUser(date, currenUser);
    }


}
