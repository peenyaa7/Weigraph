package es.peenyaa7.weigraph.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import es.peenyaa7.weigraph.model.User;
import java.util.Optional;
import es.peenyaa7.weigraph.model.Role;



@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> getByUsername(String username);

    long countByRole(Role role);

    Optional<User> getByRole(Role admin);

}
