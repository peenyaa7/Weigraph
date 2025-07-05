package es.peenyaa7.weigraph.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import es.peenyaa7.weigraph.exception.UserNotFoundException;
import es.peenyaa7.weigraph.model.Role;
import es.peenyaa7.weigraph.model.User;
import es.peenyaa7.weigraph.repository.UserRepository;
import jakarta.transaction.Transactional;

@Service
public class UserService implements UserDetailsService {
    
    @Autowired
    private UserRepository repository;

    @Transactional
    public User create(User user) {
        return repository.save(user);
    }

    public Optional<User> getAdminUserIfPresent() {
        return repository.getByRole(Role.ADMIN);
    }

    public Optional<User> getByUsername(String username) {
        return repository.getByUsername(username);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        return this.getByUsername(username).orElseThrow(() -> new UserNotFoundException("No username found."));
    }

}
