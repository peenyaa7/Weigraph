package es.peenyaa7.weigraph.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import es.peenyaa7.weigraph.constants.ApiRoutes;
import es.peenyaa7.weigraph.dto.ProfileResponse;
import es.peenyaa7.weigraph.model.User;

@RestController
public class ProfileController {
    
    @GetMapping(ApiRoutes.PROFILE_URL)
    public ResponseEntity<ProfileResponse> getProfile(@AuthenticationPrincipal User user) {
        ProfileResponse profileResponse = ProfileResponse.builder()
            .id(user.getId())
            .username(user.getUsername())
            .build();

        return ResponseEntity.ok(profileResponse);
    }

}
