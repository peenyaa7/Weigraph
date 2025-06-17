package es.peenyaa7.weigraph.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResponse {
    
    @NotNull
    private String token;

    @NotNull
    private long expiresIn;

}
