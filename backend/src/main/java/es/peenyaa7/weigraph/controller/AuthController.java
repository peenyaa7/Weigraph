package es.peenyaa7.weigraph.controller;

import org.springframework.web.bind.annotation.RestController;

import es.peenyaa7.weigraph.constants.ApiRoutes;
import es.peenyaa7.weigraph.dto.LoginRequest;
import es.peenyaa7.weigraph.dto.LoginResponse;
import es.peenyaa7.weigraph.dto.UserInfo;
import es.peenyaa7.weigraph.model.Role;
import es.peenyaa7.weigraph.model.User;
import es.peenyaa7.weigraph.security.AuthenticationService;
import es.peenyaa7.weigraph.security.JwtService;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class AuthController {
    
    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private JwtService jwtService;
    
    @PostMapping(ApiRoutes.LOGIN_URL)
    public ResponseEntity<LoginResponse> authenticate(@RequestBody @Valid LoginRequest loginRequest) {
        User authenticatedUser = authenticationService.authenticate(loginRequest);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        LoginResponse loginResponse = LoginResponse.builder()
            .token(jwtToken)
            .expiresIn(jwtService.getExpirationTime())
            .userInfo(
                UserInfo.builder()
                    .username(authenticatedUser.getUsername())
                    .isAdmin(Role.ADMIN.equals(authenticatedUser.getRole()))
                    .build()
                )
            .build();

        return ResponseEntity.ok(loginResponse);
    }
    
}
