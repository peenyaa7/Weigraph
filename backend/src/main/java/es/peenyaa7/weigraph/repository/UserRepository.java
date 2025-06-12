package es.peenyaa7.weigraph.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import es.peenyaa7.weigraph.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    
}
