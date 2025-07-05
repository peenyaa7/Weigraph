package es.peenyaa7.weigraph;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import es.peenyaa7.weigraph.model.Role;
import es.peenyaa7.weigraph.model.User;
import es.peenyaa7.weigraph.service.UserService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class InitCommandLineRunner implements CommandLineRunner {

    @Value("${admin-user.username}")
    private String username;

    @Value("${admin-user.password}")
    private String password;

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) throws Exception {
        
        Optional<User> optUser = userService.getAdminUserIfPresent();

        if (optUser.isEmpty()) {
            
            User user = User.builder()
                .username(username)
                .password(passwordEncoder.encode(password))
                .mustChangePassword("changeme".equals(password))
                .role(Role.ADMIN)
                .build();
            
            user = userService.create(user);
            
            log.info("No admin user found. Created '" + user.getUsername() + "' admin user with default password.");

        } else {
            log.info("Using existing admin user: " + optUser.get().getUsername());
        }

    }

}
