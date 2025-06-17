package es.peenyaa7.weigraph.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import es.peenyaa7.weigraph.dto.LoginRequest;
import es.peenyaa7.weigraph.exception.UserNotFoundException;
import es.peenyaa7.weigraph.model.User;
import es.peenyaa7.weigraph.repository.UserRepository;

@Service
public class AuthenticationService {
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    public User authenticate(LoginRequest loginRequest) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );
        return userRepository.getByUsername(loginRequest.getUsername()).orElseThrow(() -> new UserNotFoundException("User not found."));
    }

}
