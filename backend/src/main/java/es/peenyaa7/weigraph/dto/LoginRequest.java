package es.peenyaa7.weigraph.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LoginRequest {
    
    @NotNull(message = "'username' is required")
    private String username;

    @NotNull(message = "'password' is required")
    private String password;

}
