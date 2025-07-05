package es.peenyaa7.weigraph.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import es.peenyaa7.weigraph.dto.ChangePasswordRequest;
import es.peenyaa7.weigraph.dto.LoginRequest;
import es.peenyaa7.weigraph.exception.DefaultPasswordException;
import es.peenyaa7.weigraph.exception.UserNotFoundException;
import es.peenyaa7.weigraph.model.User;
import es.peenyaa7.weigraph.service.UserService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class AuthenticationService {

    @Value("${admin-user.password}")
    private String defaultPassword;
    
    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    public User authenticate(LoginRequest loginRequest) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );
        return userService.getByUsername(loginRequest.getUsername()).orElseThrow(() -> new UserNotFoundException("User not found."));
    }

    public void changePassword(User user, ChangePasswordRequest changePasswordRequest) {

        String newPassword = changePasswordRequest.getNewPassword();

        if (defaultPassword.equals(newPassword)) {
            throw new DefaultPasswordException("Default password cannot be set");
        }

        String encodedNewPassword = passwordEncoder.encode(newPassword);
        user.setPassword(encodedNewPassword);

        if (user.getMustChangePassword()) {
            user.setMustChangePassword(false);
            log.info(user.getUsername() + " changed his default password!");
        }

        userService.create(user);

    }

}
