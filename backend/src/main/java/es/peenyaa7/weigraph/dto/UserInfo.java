package es.peenyaa7.weigraph.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserInfo {
    
    @NotNull
    private String username;

    @NotNull
    private boolean isAdmin;

    @NotNull
    private boolean mustChangePassword;

}
