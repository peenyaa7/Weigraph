package es.peenyaa7.weigraph.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import es.peenyaa7.weigraph.model.WeightEntry;

@Repository
public interface WeightEntryRepository extends JpaRepository<WeightEntry, Long> {
    
}
