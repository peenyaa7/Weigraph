package es.peenyaa7.weigraph.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.peenyaa7.weigraph.repository.UserRepository;

@Service
public class UserService {
    
    @Autowired
    private UserRepository repository;

    // Implement service methods...

}
